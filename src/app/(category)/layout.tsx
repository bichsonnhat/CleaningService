import React, { ReactNode } from 'react'

const CategoryLayout = (props: {
    children: ReactNode
}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default CategoryLayout
