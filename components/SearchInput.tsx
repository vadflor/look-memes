'use client'

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Search } from "lucide-react";

const SearchInput = () => {
  const search = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(()=>{
    setSearchQuery(search.get('q') || '')
  }, [pathname, search])

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const encodedSearchQuery = encodeURI(searchQuery || "");
    router.push(`/search?q=${encodedSearchQuery}`)
  }

  return (
    <form 
      className="flex items-center bg-mem-medium-gray h-[40px] max-w-[380px] w-full rounded-md px-4 py-2 "
      onSubmit={onSearch}
    >
      <input
        type="text"
        value={searchQuery || ""}
        onChange={(e) => {
          setSearchQuery(e.target.value)
        }}
        placeholder="Search"
        className="bg-transparent outline-none w-full font-light text-mem-light-gray text-sm"
      />
      <Search className="text-mem-light-gray w-5 h-5" />
    </form>
  );
}

export default SearchInput;