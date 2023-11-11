'use client'

import { useEffect } from 'react';

import { GripVertical, Pencil, Trash2 } from 'lucide-react'
import { UseFormReturn } from 'react-hook-form';

interface ICategoryItemProps {
  setCategoryTitle: React.Dispatch<React.SetStateAction<string>>
  categoryForm: UseFormReturn<{ category: string }, any, undefined>
  categoryTitle: string
}

const InputForNewCategory = ({ setCategoryTitle, categoryForm, categoryTitle }: ICategoryItemProps) => {
  const error = categoryForm.formState.errors.category

  useEffect(() => {
    categoryForm.setFocus("category")
    categoryForm.setValue("category", '')
  }, [categoryForm])

  return (
    <>
      <div className={`flex text-sm justify-between items-center 
      w-full h-[50px] rounded-md text-white 
      bg-mem-light-gray/5 border-2 border-mem-medium-gray px-4
      ${error && 'border-red-600'}`}>

        <input
          type="text"
          value={categoryTitle}
          className='h-full outline-none bg-transparent w-full pr-2 placeholder:text-mem-light-gray/50 '
          placeholder='Enter Category Name'
          {...categoryForm.register('category', {
            onChange: (e) => setCategoryTitle(e.target.value)
          })}
        />

        <div className='flex items-center gap-x-4 text-mem-light-gray'>
          <div className="flex items-center gap-x-6">
            <label
              className={`
                  relative w-12 h-7 rounded-full transition-all 
                  duration-300 bg-mem-medium-gray/40
                `}
            >
              <input
                type="checkbox"
                className="sr-only peer"
                checked={false}
                onChange={() => null}
              />


              <span
                className="w-3 h-3 bg-mem-light-gray/30 absolute rounded-full 
                  left-2 top-[7.5px] peer-checked:bg-mem-green
                  peer-checked:left-8 transition-all duration-300"></span>
              <span className='absolute right-2 top-1.5 text-xs text-mem-light-gray/30'>Off</span>
            </label>
          </div>

          <Pencil className='w-4 h-4 text-mem-light-gray/30' />
          <Trash2 className='w-4 h-4 text-mem-light-gray/30' />
          <div className='p-1 text-mem-light-gray/30'>
            <GripVertical className="w-4 h-4" />
          </div>
        </div>
      </div>
      {error && <span className='ml-4 text-red-600 text-xs'>{error?.message}</span>}
    </>
  );
}

export default InputForNewCategory;