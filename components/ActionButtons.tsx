'use client'

import { useState } from "react";

import LoadingOverlay from "./LoadingOverlay";
import { cn } from "@/lib/utils";

import { CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { UseFormReturn } from "react-hook-form";

interface IActionButtonsProps {
  setAddNewCategory?: React.Dispatch<React.SetStateAction<boolean>>
  setCategoryTitle?: React.Dispatch<React.SetStateAction<string>>
  categoryTitle: string
  fetchCategories: () => Promise<void>
  setIsEditMode?: React.Dispatch<React.SetStateAction<boolean>>
  categoryId?: string
  categoryForm: UseFormReturn<{ category: string }, any, undefined>
  setTitle?: React.Dispatch<React.SetStateAction<string>>
  initTitle?: string
}

const ActionButtons = ({
  setAddNewCategory,
  setCategoryTitle,
  categoryTitle,
  fetchCategories,
  setIsEditMode,
  categoryId,
  categoryForm, setTitle, initTitle }: IActionButtonsProps) => {

  const [isFetchInProgress, setIsFetchInProgress] = useState(false)

  const handleCancel = () => {
    if (setAddNewCategory) {
      setAddNewCategory(false);
    }
    if (setIsEditMode) {
      setIsEditMode(false);
    }
    categoryForm.clearErrors();
    if (setCategoryTitle) {
      setCategoryTitle('');
    }
    if (setTitle) {
      setTitle(initTitle!);
    }
  }

  const handleSaveCategory = async (categoryTitle: string) => {
    setIsFetchInProgress(true)
    try {
      const response = await fetch(`${categoryId ? `/api/category/${categoryId}` : '/api/category'}`, {
        method: `${categoryId ? 'PATCH' : 'POST'}`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryTitle),
      })

      if (response.ok) {
        categoryId ?
          toast.success('Your category has been updated successfully') :
          toast.success('Your category has been created successfully');
        fetchCategories()
      }
      else {
        const errorData = await response.json();
        toast.error(errorData.msg);
      }
    } catch (error) {
      categoryId ?
        toast.error('Failed to update category') :
        toast.error('Failed to create new category');
    } finally {
      setIsFetchInProgress(false);
      if (setAddNewCategory) {
        setAddNewCategory(false);
      }
      if (setIsEditMode) {
        setIsEditMode(false);
      }
      if (setCategoryTitle) {
        setCategoryTitle('');
      }
    }
  }

  return (
    <>
      {isFetchInProgress && <LoadingOverlay />}

      <div className="
        flex flex-col md:flex-row justify-center items-center text-white gap-x-6 
        h-[104px] bg-mem-medium-gray w-full bottom-0 left-0 fixed px-4 py-2 gap-y-2 z-50
      ">
        <button
          className={cn(
            'flex h-16 items-center justify-center gap-x-2 bg-mem-green hover:bg-mem-green/90 rounded-md max-w-[638px] w-full',
            categoryTitle.length === 0 && 'bg-mem-light-gray/20 hover:bg-mem-light-gray/20 text-mem-light-gray')}
          disabled={categoryTitle.length === 0}
          onClick={() => handleSaveCategory(categoryTitle)}
        >
          <CheckCircle />
          Save Changes
        </button>
        <button
          className="h-16 rounded-md border-2 border-mem-light-gray/30 max-w-[638px] w-full hover:bg-mem-light-gray/10"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </>
  );
}

export default ActionButtons;