'use client'

import Container from './Container'
import BigCard from './BigCard'
import FilterCars from './FilterCars'
import { useEffect, useState } from 'react'
import BigCardMobile from './BigCardMobile'

const SearchedCars = ({ searchedCars, paramsArray }) => {
  const [mediaMatches, setMediaMatches] = useState(false)

  // let media = window.matchMedia('(max-width: 520px)')

  // const getMediaMatches = () => {
  //   if (media.matches) {
  //     setMediaMatches(true)
  //   } else {
  //     setMediaMatches(false)
  //   }
  // }

  // useEffect(() => {
  //   getMediaMatches()
  //   window.addEventListener('resize', getMediaMatches)
  // }, [])

  useEffect(() => {
    // console.log(mediaMatches)
  }, [mediaMatches])

  return (
    <section className="py-10">
      <Container>
        <div className="flex xl:gap-10 gap-5">
          <FilterCars paramsArray={paramsArray} />
          <div className="flex flex-col gap-6">
            {mediaMatches
              ? searchedCars?.map(car => (
                  <BigCardMobile key={car._id} car={car} />
                ))
              : searchedCars?.map(car => <BigCard key={car._id} car={car} />)}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SearchedCars
