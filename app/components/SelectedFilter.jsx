'use client'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SelectedFilter = ({ paramsArray, filter, url, children }) => {
  const [isHidden, setIsHidden] = useState(false)

  const router = useRouter()

  const handleDelete = () => {
    paramsArray?.forEach(param => {
      // Find param which is same as clicked filter
      if (param.value === filter._id) {
        console.log('deleted param', param.value)
        const urlParts = url.split('&')

        // Create a new array with params without deleted param
        const filteredUrlParts = urlParts.filter(
          part => !part.includes(`${param.name}`)
        )

        // Join the filtered parts back into a single string
        const updatedUrl =
          '/cars/search?' + filteredUrlParts.join('&').split('?')[1]

        setIsHidden(true)
        router.push(updatedUrl)
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
          <button className="text-gray-800 text-sm" onClick={handleDelete}>
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      )}
    </>
  )
}

export default SelectedFilter
