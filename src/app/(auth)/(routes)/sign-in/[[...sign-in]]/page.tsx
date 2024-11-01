import { SignIn } from '@clerk/nextjs'
import React from 'react'

// export function generateStaticParams() {
//   return [{ 'sign-in': [] }]
// }

const SignInPage = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <SignIn />
    </div>
  )
}

export default SignInPage