'use client'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS

import Search from './components/Search'
import RandomCars from './components/RandomCars'
import { useSearchContext } from './store/search-car'
import { usePostCarContext } from './store/post-car'
import { useFiltersContext } from './store/filters'
import { useEffect } from 'react'

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
    </>
  )
}

export default Home
