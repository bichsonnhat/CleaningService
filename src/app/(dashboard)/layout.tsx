import React from 'react'

const DashboardLayout = (props: {
    children: React.ReactNode
}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default DashboardLayout