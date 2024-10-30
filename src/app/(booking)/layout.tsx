import React from 'react'
import ProgressBar from '@/components/progressbar/ProgressBar'
const BookingLayout = (props: {
  children: React.ReactNode
}) => {
  return (
    <div>
      <ProgressBar />
      {props.children}
    </div>
  )
}

export default BookingLayout
