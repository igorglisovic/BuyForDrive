import React from 'react'

const Button = React.forwardRef(
  ({ onClick, children, tabIndex, style, className }, ref) => {
    return (
      <button
        type="submit"
        className={`button self-end py-1.5 pr-5 pl-14 bg-btn font-semibold bg-no-repeat bg-contain hover:bg-gray-100 ${className}`}
        onClick={onClick}
        tabIndex={tabIndex}
        style={style}
        ref={ref}
      >
        {children}
      </button>
    )
  }
)

export default Button
