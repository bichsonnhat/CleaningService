import React from 'react'

const LandingLayout = (props: {
    children: React.ReactNode
}) => {
  return (
    <div>
      {props.children}
    </div>
  )
}

export default LandingLayout