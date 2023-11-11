'use client'

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import ListOfCategories from "@/components/ListOfCategories";
import LoadingOverlay from "@/components/LoadingOverlay";
import useZodForm from "@/lib/hooks/useZodForm";

import { ToastContainer } from "react-toastify";
import { z } from "zod";

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const encodedSearchQuery = encodeURI(searchQuery || '');
  const [isFetchInProgress, setIsFetchInProgress] = useState(false)
  const [searchResult, setSearchResult] = useState<Category[]>([])

  const categoryForm = useZodForm({
    schema: z.object({
      category: z.string().min(1, { message: 'Category name cannot be empty' }),
    }),
    mode: 'all',
  });

  const fetchCategories = useCallback(async () => {
    setIsFetchInProgress(true)
    await fetch(`/api/search?q=${encodedSearchQuery}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchResult(data)
      }).finally(() => {
        setIsFetchInProgress(false)
      })
  }, [encodedSearchQuery])

  useEffect(() => {
    fetchCategories()
  }, [encodedSearchQuery, fetchCategories])

  if (!searchResult) {
    return (
      <div className="max-w-6xl mx-auto flex justify-center">
        Nothing to show
      </div>
    )

  }

  return (<>
    {isFetchInProgress && <LoadingOverlay />}
    <div className="max-w-6xl mx-auto flex justify-center">
      <div className='max-w-[638px] w-full mt-10 space-y-3 px-4 md:px-0 pb-[110px]'>
        <ListOfCategories
          categoryForm={categoryForm}
          fetchCategories={fetchCategories}
          categories={searchResult}
          setCategories={setSearchResult}
        />
      </div>
    </div>

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
  );
}

export default SearchPage;