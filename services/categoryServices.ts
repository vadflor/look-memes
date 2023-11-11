import prisma from "@/prisma/client";


export async function addNewCategory(categoryTitle: string){
  return await prisma.memesCategory.create({
    data: {
      title: categoryTitle
    }
  })
}


export async function getCategoryByName(categoryName: string) {
  return await prisma.memesCategory.findUnique({
    where: {
      title: categoryName
    }
  })
}

export async function getAllCategories() {
  return await prisma.memesCategory.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function changeActiveStatus(isActive: boolean, categoryId: string) {
  return await prisma.memesCategory.update({
    where: {
      id: categoryId
    },
    data: {
      isVisible: isActive
    }
  })
}

export async function deleteCategory(categoryId: string) {
  return await prisma.memesCategory.delete({
    where: {
      id: categoryId
    }
  })
}

export async function updateCategory(categoryTitle: string, categoryId: string) {
  return await prisma.memesCategory.update({
    where: {
      id: categoryId
    },
    data: {
      title: categoryTitle
    }
  })
}