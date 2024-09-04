import React, { ReactNode } from 'react'

const APILayout = (props: {
    children: ReactNode
}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default APILayout
