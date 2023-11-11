'use client'

import { useState } from "react"

import LoadingOverlay from "./LoadingOverlay"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Trash2 } from 'lucide-react'
import { toast } from "react-toastify"


interface IDeleteBtnProps {
  isDefaultCategory: boolean
  fetchCategories: () => Promise<void>
  categoryId: string
}

const DeleteBtn = ({ isDefaultCategory, fetchCategories, categoryId }: IDeleteBtnProps) => {
  const [isFetchInProgress, setIsFetchInProgress] = useState(false)

  const handleDeleteCategory = async (categoryId: string) => {
    setIsFetchInProgress(true)
    try {
      const response = await fetch(`/api/category/${categoryId}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Category was deleted successfully!');
        fetchCategories()
      }
      else {
        const errorData = await response.json();
        toast.error(errorData.msg);
      }
    } catch (error) {
      toast.error('Failed to delete category');
    } finally {
      setIsFetchInProgress(false);
    }
  }

  return (
    <>
      {isFetchInProgress && <LoadingOverlay />}
      <Dialog>
        <DialogTrigger asChild>
          <Trash2
            className={`w-4 h-4 cursor-pointer ${isDefaultCategory && 'invisible'}`}
          />
        </DialogTrigger>
        <DialogContent className='bg-mem-medium-gray p-6'>
          <DialogHeader className='space-y-4'>
            <DialogTitle className='text-white font-normal text-2xl'>Delete the Category?</DialogTitle>
            <DialogDescription className='text-white/50 font-light text-center text-lg'>
              All templates in the category will be moved to the category &quot;Other&quot;
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col gap-y-6'>
            <DialogClose asChild>
              <button 
                className='flex items-center justify-center gap-x-2 custom-gradient text-white h-[58px] rounded-md'
                onClick={() => handleDeleteCategory(categoryId)}
              >
                <Trash2 className='w-4 h-4' />
                Delete
              </button>
            </DialogClose>
            <DialogClose asChild>
              <button className='text-red-500 font-light'>Cancel</button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DeleteBtn;