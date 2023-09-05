'use client'

import Container from './Container'
import BigCard from './cards/BigCard'
import FilterCars from './FilterCars'
import { useEffect, useState } from 'react'
import BigCardMobile from './cards/BigCardMobile'
import Link from 'next/link'
import SelectedFilter from './SelectedFilter'
import { useFiltersContext } from '@app/store/filters'
import { useSearchContext } from '@app/store/search-car'
import useCalcSearchedCars from '@app/hooks/useCalcSearchedCars'

const SearchedCars = ({ searchedCars, paramsArray, url, loading }) => {
  const [mediaMatches, setMediaMatches] = useState(false)

  let media = window.matchMedia('(max-width: 520px)')

  const { filtersArray } = useFiltersContext()

  const { sorting, updateSorting } = useSearchContext()
  const { handleChange } = useCalcSearchedCars()

  useEffect(() => {
    handleChange()
  }, [sorting])

  const handleSortingChange = e => {
    updateSorting(e.target.value)
  }

  const getMediaMatches = () => {
    if (media.matches) {
      setMediaMatches(true)
    } else {
      setMediaMatches(false)
    }
  }

  useEffect(() => {
    getMediaMatches()
    window.addEventListener('resize', getMediaMatches)
  }, [])

  return (
    <section className="py-10">
      <Container>
        <div className="flex xl:gap-10 gap-5">
          <FilterCars url={url} paramsArray={paramsArray} />
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div className="flex gap-2 flex-wrap">
                {filtersArray?.map((filter, i) => (
                  <SelectedFilter
                    paramsArray={paramsArray}
                    filter={filter}
                    url={url}
                    key={i}
                  >
                    {filter.label}
                  </SelectedFilter>
                ))}
              </div>
              <div>
                <select
                  className="select-half select focus:border-[1px] focus:border-black focus:outline-none"
                  onChange={handleSortingChange}
                  value={sorting}
                >
                  <option className="text-sm" value="default_sorting">
                    Default Sorting
                  </option>
                  <option className="text-sm" value="price_asc">
                    Price (Low to High)
                  </option>
                  <option className="text-sm" value="price_desc">
                    Price (High to Low)
                  </option>
                  <option className="text-sm" value="reg_desc">
                    First Registration (Newest First)
                  </option>
                  <option className="text-sm" value="reg_asc">
                    First Registration (Oldest First)
                  </option>
                  <option className="text-sm" value="mileage_asc">
                    Mileage (Low to High)
                  </option>
                  <option className="text-sm" value="mileage_desc">
                    Mileage (High to Low)
                  </option>
                </select>
              </div>
            </div>
            {mediaMatches
              ? searchedCars?.map(car => (
                  <BigCardMobile key={car._id} car={car} />
                ))
              : searchedCars?.map(car => <BigCard key={car._id} car={car} />)}
            {!searchedCars?.length && loading !== true && (
              <div className="flex flex-col gap-3 items-center">
                <h3 className="text-lg font-medium">
                  There are currently no results matching your search criteria.
                  We advise you to advertise the purchase of the vehicle you are
                  looking for, and we will notify you when such a vehicle
                  appears on the site.
                </h3>
                <Link href="/sellacar">
                  <button className="self-end py-1.5 px-8 rounded-3xl bg-gray-300 font-semibold ">
                    Sell a car
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SearchedCars
