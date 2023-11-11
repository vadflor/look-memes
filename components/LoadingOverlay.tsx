'use client'

import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
  return (
    <div className='absolute inset-0 flex items-center justify-center bg-black/30 z-50'>
      <Loader2 className='h-10 w-10 animate-spin text-white/50'/>
    </div>
  )
}
