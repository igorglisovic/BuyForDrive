import React from 'react'

const Button = ({ onClick, children, tabIndex, style, className }) => {
  return (
    <button
      type="submit"
      className={`button self-end py-1.5 pr-5 pl-14 bg-btn font-semibold bg-no-repeat bg-contain ${className}`}
      onClick={onClick}
      tabIndex={tabIndex}
      style={style}
    >
      {children}
    </button>
  )
}

export default Button
