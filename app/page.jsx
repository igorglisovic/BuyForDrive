'use client'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'

import Search from './components/Search'
import RandomCars from './components/RandomCars'
import { useSearchContext } from './store/search-car'
import { usePostCarContext } from './store/post-car'
import { useFiltersContext } from './store/filters'
import { useEffect } from 'react'
import PopularBrands from './components/PopularBrands'
import FAQ from './components/FAQ'

// FontAwesome Icons
config.autoAddCss = false

const Home = () => {
  const { resetStates: resetSearchStates } = useSearchContext()
  const { resetStates: resetPostCarStates } = usePostCarContext()
  const { resetStates: resetFiltersStates } = useFiltersContext()

  useEffect(() => {
    resetSearchStates()
    resetPostCarStates()
    resetFiltersStates()
  }, [])

  return (
    <>
      <Search />
      <RandomCars />
      <PopularBrands />
      <FAQ />
    </>
  )
}

export default Home
