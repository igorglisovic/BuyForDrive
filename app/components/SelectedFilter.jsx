'use client'

import { useFiltersContext } from '@app/store/filters'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SelectedFilter = ({ paramsArray, filter, url, children }) => {
  const [isHidden, setIsHidden] = useState(false)

  const router = useRouter()

  const { filtersArray } = useFiltersContext()

  const handleDelete = () => {
    if (filter?._id) {
      let modelId

      // Get model Id if brand_id is deleted
      filtersArray.forEach(item => {
        if (item.brand_id === filter._id) {
          modelId = item._id
        }
      })

      paramsArray?.forEach(param => {
        // Find param which is same as clicked filter
        if (param.value.includes('_')) {
          param = { ...param, value: param.value.split('_')[0] }
        }

        if (param.value === filter._id) {
          const urlParts = url.split('&')

          let filteredUrlParts

          // If brand_id is deleted
          if (modelId) {
            // Create a new array with params without deleted param
            filteredUrlParts = urlParts
              .filter(part => !part.includes(`${param.name}`))
              .filter(part => !part.includes(`model_id`))
          } else {
            // Create a new array with params without deleted param
            filteredUrlParts = urlParts.filter(
              part => !part.includes(`${param.name}`)
            )
          }

          // Join the filtered parts back into a single string
          const updatedUrl =
            '/cars/search?' + filteredUrlParts.join('&').split('?')[1]

          setIsHidden(true)
          router.push(updatedUrl)
        }
      })
    } else {
      let urlParts = url.split('&')
      let filteredUrlParts
      let indexFromPrevious

      paramsArray?.forEach((param, i) => {
        // Find param which is same as clicked filter
        if (param.name.includes(filter.type)) {
          if (indexFromPrevious && indexFromPrevious < i) {
            // Create a new array with params without deleted params
            filteredUrlParts = filteredUrlParts.filter(
              part => !part.includes(`${param.name}`)
            )
          } else {
            // Create a new array with params without deleted param
            filteredUrlParts = urlParts.filter(
              part => !part.includes(`${param.name}`)
            )
          }

          indexFromPrevious = i

          // Join the filtered parts back into a single string
        }
      })
      const updatedUrl =
        '/cars/search?' + filteredUrlParts.join('&').split('?')[1]

      setIsHidden(true)
      router.push(updatedUrl)
    }
  }

  return (
    <>
      {!isHidden && (
        <div
          className={`flex h-fit items-center whitespace-nowrap gap-2 capitalize md-plus:bg-white bg-stone-100 shadow-sm md-plus:max-w-fit py-1 px-4 rounded-full md-plus:hover:text-gray-600`}
        >
          <span className="text-sm">{children}</span>
          <button
            aria-label="Remove filter"
            className="text-gray-800 text-sm"
            onClick={handleDelete}
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        </div>
      )}
    </>
  )
}

export default SelectedFilter
