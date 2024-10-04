import React from 'react'
import { SignUp } from '@clerk/nextjs'

const SignOutPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <SignUp/>
    </div>
  )
}

export function generateStaticParams() {
  return [ { slug: [""] } ]
}

export default SignOutPage
