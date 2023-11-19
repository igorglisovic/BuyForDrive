'use client'

import { usePostCarContext } from '@app/store/post-car'
import Select from './Select'
import useFetch from '@app/hooks/useFetch'
import { useEffect, useState } from 'react'
import { useLoadingBarContext } from '@app/store/loading-bar'

const PostACarFinish = ({ car }) => {
  const [isLoadingBarIncreased, setIsLoadingBarIncreased] = useState(false)
  const [isLoadingBarDecreased, setIsLoadingBarDecreased] = useState(false)
  const [initialRender, setInitialRender] = useState(true)

  const { pricingDetails } = usePostCarContext()
  const { increaseLoadingBar, decreaseLoadingBar } = useLoadingBarContext()

  const { data: owners } = useFetch('/api/owners')

  const handleChange = e => {
    pricingDetails.updateFixedPrice(e.target.checked)
  }

  useEffect(() => {
    if (car) {
      pricingDetails.updateFixedPrice(car.fixed_price)
      pricingDetails.updateDescription(car.description)
    }
  }, [car])

  const handleChangeDesc = e => {
    pricingDetails.updateDescription(e.target.value)
  }

  useEffect(() => {
    if (initialRender) {
      // Skip the code block on the first render
      setInitialRender(false)
      return
    }

    if (pricingDetails.description && !isLoadingBarIncreased) {
      increaseLoadingBar(5)
      setIsLoadingBarIncreased(true)
      setIsLoadingBarDecreased(false)
    }

    if (!pricingDetails.description && !isLoadingBarDecreased) {
      decreaseLoadingBar(5)
      setIsLoadingBarDecreased(true)
      setIsLoadingBarIncreased(false)
    }
  }, [pricingDetails.description, isLoadingBarDecreased, isLoadingBarIncreased])

  return (
    <div className="flex flex-col gap-3 border-t-[1px] pt-4 border-gray-400">
      <h2 className="text-xl font-semibold mb-2">Pricing details</h2>
      <Select
        placeholder="Number of owners"
        options={owners}
        type="full"
        label="Number of owners"
        updateFunction={pricingDetails.updateOwners}
        lastValue={pricingDetails.owners}
        defaultValue={car && car.owners}
      />
      <div className="flex items-center gap-5">
        <Select
          placeholder="Price"
          type="half"
          label="Price"
          disabled={pricingDetails.owners ? false : true}
          updateFunction={pricingDetails.updatePrice}
          lastValue={pricingDetails.price}
          defaultValue={car && car.price}
        />
        <div className="w-[50%]">
          <input
            onChange={handleChange}
            id="fixed-price"
            type="checkbox"
            checked={pricingDetails.fixedPrice}
          />
          <label className="ml-1" htmlFor="fixed-price">
            Fixed price
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          className="select-full"
          disabled={
            pricingDetails.price && pricingDetails.owners ? false : true
          }
          onChange={handleChangeDesc}
          value={pricingDetails.description || ''}
        ></textarea>
      </div>
    </div>
  )
}

export default PostACarFinish
