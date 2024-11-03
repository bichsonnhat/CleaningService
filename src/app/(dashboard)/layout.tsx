import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'

const DashboardLayout = (props: {
    children: React.ReactNode
}) => {
  return (
    <div className="flex overflow-hidden flex-col bg-slate-100">
      <Header />
      <div className="flex max-md:flex-col">
        <Sidebar />
        <main className="flex flex-col p-8 w-full max-md:ml-0 max-md:w-full">
          {props.children}
        </main>
      </div>
    </div>
  )
} 

export default DashboardLayout