'use client'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SelectedFilter = ({ paramsArray, filter, url, children }) => {
  const [isHidden, setIsHidden] = useState(false)

  const router = useRouter()

  const handleClick = () => {
    paramsArray?.forEach(param => {
      if (param.value === filter._id) {
        const urlParts = url.split('&')

        // Create a new array with parameters that do not include 'model_id'
        const filteredUrlParts = urlParts.filter(
          part => !part.includes(`${param.name}=`)
        )

        // Join the filtered parts back into a single string
        const updatedUrl = filteredUrlParts.join('&')

        setIsHidden(true)
        router.push(`/cars/search${updatedUrl.slice(18)}`)
      }
    })
  }

  return (
    <>
      {!isHidden && (
        <div
          className={`flex h-fit items-center gap-2 capitalize bg-white shadow-sm max-w-fit py-1 px-4 rounded-full hover:text-gray-600`}
        >
          <span className="text-sm">{children}</span>
          <button className="text-gray-800 text-sm" onClick={handleClick}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      )}
    </>
  )
}

export default SelectedFilter
