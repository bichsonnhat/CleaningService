import React from 'react'

const BookingLayout = (props : {
    children: React.ReactNode
}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default BookingLayout
