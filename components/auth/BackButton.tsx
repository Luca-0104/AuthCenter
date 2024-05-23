import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

interface Props {
  label: string,
  href: string,
}

export const BackButton = ({label, href}: Props) => {
  return (
    <Button variant={"link"} className='flex items-center w-full font-normal' size={"sm"} asChild>
      <Link href={href}>
        {label}
      </Link>
    </Button>
  )
}
