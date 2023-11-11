import { getSearchResult } from "@/services/searchServices"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')
  
  if (!q || typeof q !== 'string') return new Response('Invalid query', { status: 400 })

  try {
    const result = await getSearchResult(q)
    return NextResponse.json(result)
  } catch (e) {
    return NextResponse.json({ msg: 'Server Error: failed to get categories', err: e }, { status: 500 })
  }
}