import React from 'react'

const Button = ({ onClick, children }) => {
  return (
    <button
      className="button self-end py-1.5 pr-5 pl-14 bg-btn font-semibold bg-no-repeat bg-contain"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
