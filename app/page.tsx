'use client'

import React, { useEffect, useState } from 'react'

import InputForNewCategory from '@/components/InputForNewCategory'
import ActionButtons from '@/components/ActionButtons'
import LoadingOverlay from '@/components/LoadingOverlay'
import ListOfCategories from '@/components/ListOfCategories'
import useZodForm from '@/lib/hooks/useZodForm'

import { Plus } from 'lucide-react'
import { ToastContainer } from 'react-toastify'
import { z } from 'zod'

export default function Home() {
  const [addNewCategory, setAddNewCategory] = useState(false)
  const [categoryTitle, setCategoryTitle] = useState('')
  const [isFetchInProgress, setIsFetchInProgress] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

  const fetchCategories = async () => {
    await fetch('/api/category')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
  }

  useEffect(() => {
    const fetchCategoriesInEffect = async () => {
      setIsFetchInProgress(true)
      await fetchCategories()
      setIsFetchInProgress(false)
    }
    fetchCategoriesInEffect()
  }, [])

  const categoryForm = useZodForm({
    schema: z.object({
      category: z.string().min(1, { message: 'Category name cannot be empty' }),
    }),
    mode: 'all',
  });

  return (
    <>
      {isFetchInProgress && <LoadingOverlay />}

      <div className='max-w-6xl mx-auto flex justify-center'>
        <div className='max-w-[638px] w-full mt-10 space-y-3 px-4 md:px-0 pb-[110px]'>
          <button
            className='flex justify-center items-center w-full bg-mem-purple h-[50px] rounded-md text-white gap-x-2 font-medium'
            onClick={() => setAddNewCategory(true)}
          >
            <Plus className='w-4 h-4 stroke-[3px]' />
            <span>Create a Category</span>
          </button>

          {addNewCategory &&
            <InputForNewCategory
              categoryTitle={categoryTitle}
              setCategoryTitle={setCategoryTitle}
              categoryForm={categoryForm}
            />
          }

          <ListOfCategories
            categoryForm={categoryForm}
            fetchCategories={fetchCategories}
            categories={categories}
            setCategories={setCategories}
          />

          {addNewCategory &&
            <ActionButtons
              setAddNewCategory={setAddNewCategory}
              setCategoryTitle={setCategoryTitle}
              categoryTitle={categoryTitle}
              fetchCategories={fetchCategories}
              categoryForm={categoryForm}
            />
          }
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
      </div>
    </>
  )
}
