import React from 'react'

const LoadingSpinner = ({ nav }) => {
  return (
    <>
      {
        <div className="spinner-container">
          <div className={nav ? 'loading-spinner2' : 'loading-spinner'}></div>
        </div>
      }
    </>
  )
}

export default LoadingSpinner
