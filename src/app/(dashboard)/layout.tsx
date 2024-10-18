import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

const DashboardLayout = (props: {
    children: React.ReactNode
}) => {
  return (
    <div className="flex overflow-hidden flex-col bg-slate-100">
      <Header />
      <div className="flex gap-5 max-md:flex-col">
        <Sidebar />
        <main className="flex flex-col ml-5 w-[84%] max-md:ml-0 max-md:w-full">
          <div className="flex overflow-hidden flex-col grow items-center px-8 pt-5 pb-40 w-full bg-slate-100 min-h-[970px] max-md:px-5 max-md:pb-24 max-md:max-w-full">
            <div className="flex flex-col w-full max-w-[1141px] max-md:max-w-full">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 

export default DashboardLayout