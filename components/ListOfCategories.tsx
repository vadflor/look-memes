'use client'

import CategoryItem from './CategoryItem'

import 'react-toastify/dist/ReactToastify.css'
import {
  DndContext,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { UseFormReturn } from 'react-hook-form';

type ListOfCategoriesProps = {
  categoryForm: UseFormReturn<{ category: string }, any, undefined>
  fetchCategories: () => Promise<void>
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

export default function ListOfCategories({
  categoryForm,
  fetchCategories,
  categories,
  setCategories }: ListOfCategoriesProps) {

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setCategories((prev) => {
        const activeIndex = prev.findIndex((item) => item.id === active?.id);
        const overIndex = prev.findIndex((item) => item.id === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={categories} strategy={verticalListSortingStrategy}>
        {categories?.map((category) => (
          <div key={category.id}>
            <CategoryItem
              fetchCategories={fetchCategories}
              category={category}
              categoryForm={categoryForm}
            />
          </div>
        ))}
      </SortableContext>
    </DndContext>
  )
}
