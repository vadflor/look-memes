import { deleteCategory, updateCategory } from "@/services/categoryServices"
import { NextRequest, NextResponse } from "next/server"

interface Params {
  params: {
    categoryId: string
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const result = await deleteCategory(params.categoryId)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ msg: 'Server Error: failed to delete category', err: e }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const categoryTitle = await req.json();
    const result = await updateCategory(categoryTitle, params.categoryId)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ msg: 'Server Error: failed to update category name', err: e }, { status: 500 })
  }
}