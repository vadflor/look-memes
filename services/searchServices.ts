import prisma from "@/prisma/client";

export async function getSearchResult(q: string) {

  return await prisma.memesCategory.findMany({
    where: {
      title: {
        contains: q
      }
    }
  })
}

