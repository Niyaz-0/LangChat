import { LoaderIcon } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Loader() {

  const theme = useSelector( state => state.theme )

  return (
    <div className='min-h-screen flex items-center justify-center' data-theme={theme}>
        <LoaderIcon className='animate-spin text-primary size-10' />
    </div>
  )
}
