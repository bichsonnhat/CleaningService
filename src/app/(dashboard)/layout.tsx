import Header from '@/components/dashboard/Header'
import Sidebar from '@/components/dashboard/Sidebar'
import SidebarCustomer from '@/components/dashboard/SidebarCusomter'
import SidebarEmployee from '@/components/dashboard/SidebarEmployee'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

const DashboardLayout = async (props: {
    children: React.ReactNode
}) => {
  const role = (await auth()).sessionClaims?.metadata?.role;
  return (
    <div className="flex overflow-hidden flex-col bg-slate-100">
      <Header />
      <div className="flex max-md:flex-col">
        {role === "admin" ? <Sidebar /> : role === "helper" ? <SidebarEmployee /> : <SidebarCustomer />}
        <main className="flex flex-col p-8 w-full max-md:ml-0 max-md:w-full">
          {props.children}
        </main>
      </div>
    </div>
  )
} 

export default DashboardLayout