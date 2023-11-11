'use client'

import { useState } from 'react'

import LoadingOverlay from './LoadingOverlay'
import DeleteBtn from './DeleteBtn'
import ActionButtons from './ActionButtons'

import { GripVertical, Pencil } from 'lucide-react'
import { toast } from 'react-toastify'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities";
import { UseFormReturn } from 'react-hook-form'

interface ICategoryItemProps {
  fetchCategories: () => Promise<void>
  category: Category
  categoryForm: UseFormReturn<{ category: string }, any, undefined>
}

const CategoryItem = ({
  fetchCategories,
  category,
  categoryForm }: ICategoryItemProps) => {

  const [isFetchInProgress, setIsFetchInProgress] = useState(false)
  const isDefaultCategory = category.title === 'Other'
  const [isEditMode, setIsEditMode] = useState(false)
  const isActive = category.isVisible
  const [title, setTitle] = useState(category.title)
  const error = categoryForm.formState.errors.category

  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: category.id,
  });
  const style = {
    transform: (CSS as any).Transform?.toString(transform),
    transition,
  };

  const handleChangeStatus = async (isActive: boolean, categoryId: string) => {
    setIsFetchInProgress(true)
    try {
      const response = await fetch(`/api/category`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive, categoryId }),
      })

      if (response.ok) {
        toast.success('Category status has been updated successfully!');
        fetchCategories()
      }
      else {
        const errorData = await response.json();
        toast.error(errorData.msg);
      }
    } catch (error) {
      toast.error('Failed to create new category');
    } finally {
      setIsFetchInProgress(false);
    }
  }

  const handleEditCategory = () => {
    setIsEditMode(true)
    categoryForm.setValue('category', title)

  }

  return (
    <>
      {isFetchInProgress && <LoadingOverlay />}
      <div
        className={`flex text-sm justify-between items-center 
          w-full h-[50px] rounded-md text-white 
        bg-mem-light-gray/5 border-2 border-mem-medium-gray px-4
        ${error && isEditMode && 'border-red-600'}`}
        ref={setNodeRef}
        style={style}
        {...attributes}
      >

        {!isEditMode ? <span className={`${!isActive && 'text-mem-light-gray/50'}`}>{title}</span> :
          <input
            type="text"
            className='h-full outline-none bg-transparent w-full pr-2 placeholder:text-mem-light-gray/50'
            placeholder='Enter Category Name'
            {...categoryForm.register('category', {
              onChange: (e) => setTitle(e.target.value)
            })}
          />}


        <div className='flex items-center gap-x-4 text-mem-light-gray '>
          <div className="flex items-center gap-x-6">
            <label
              htmlFor={category.id}
              className={`
                  cursor-pointer relative w-12 h-7 rounded-full transition-all 
                  duration-300 ${isActive ? 'bg-mem-medium-gray' : 'bg-mem-medium-gray/40'}
                `}
            >
              <input
                type="checkbox"
                id={category.id}
                className="sr-only peer"
                checked={isActive}
                onChange={() => handleChangeStatus(!isActive, category.id)}
              />

              {isActive && <span className='absolute left-2 top-1.5 text-xs text-mem-green'>On</span>}
              <span className="w-3 h-3 bg-mem-light-gray/70 absolute rounded-full 
                  left-2 top-[7.5px] peer-checked:bg-mem-green
                  peer-checked:left-8 transition-all duration-300"/>
              {!isActive && <span className='absolute right-2 top-1.5 text-xs text-mem-light-gray/70'>Off</span>}
            </label>
          </div>

          <Pencil
            className={`w-4 h-4 cursor-pointer ${isDefaultCategory && 'invisible'}`}
            onClick={handleEditCategory}
          />

          <DeleteBtn
            isDefaultCategory={isDefaultCategory}
            fetchCategories={fetchCategories}
            categoryId={category.id}
          />

          <div
            {...listeners}
            ref={setActivatorNodeRef}
            className={`p-1 hover:bg-mem-light-gray/20 rounded ${isDefaultCategory && 'invisible'}`}
          >
            <GripVertical
              className="w-4 h-4 cursor-grab"
            />
          </div>

        </div>
      </div>
      {error && isEditMode && <span className='ml-4 text-red-600 text-xs'>{error?.message}</span>}

      {isEditMode &&
        <ActionButtons
          initTitle={category.title}
          setTitle={setTitle}
          categoryTitle={title}
          fetchCategories={fetchCategories}
          setIsEditMode={setIsEditMode}
          categoryId={category.id}
          categoryForm={categoryForm}
        />
      }
    </>
  );
}

export default CategoryItem;