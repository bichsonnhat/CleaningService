import React from 'react'

const TestLayout = (props: {
    children: React.ReactNode
}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default TestLayout
