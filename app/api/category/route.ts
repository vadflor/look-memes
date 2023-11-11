import { addNewCategory, changeActiveStatus, getAllCategories, getCategoryByName } from "@/services/categoryServices";
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
  try {
    const categoryTitle = await req.json();
    
    const isNameExists = await getCategoryByName(categoryTitle)
    if (isNameExists){
      return NextResponse.json({ msg: 'Category name already exists, please choose another!'}, { status: 500 })
    }

    const result = await addNewCategory(categoryTitle)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ msg: 'Server Error: failed to create new category', err: e }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const result = await getAllCategories()
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ msg: 'Server Error: failed to get categories', err: e }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const {isActive, categoryId} = await req.json();
    const result = await changeActiveStatus(isActive, categoryId)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ msg: 'Server Error: failed to update status', err: e }, { status: 500 })
  }
}