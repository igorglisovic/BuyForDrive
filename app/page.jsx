'use client'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS

import Search from './components/Search'
import RandomCars from './components/RandomCars'
import { useSearchContext } from './store/search-car'
import { usePostCarContext } from './store/post-car'
import { useFiltersContext } from './store/filters'
import { useEffect } from 'react'
import PopularBrands from './components/PopularBrands'
import FAQ from './components/FAQ'
import CookieConsent from './components/CookieConsent'
import { useCookies } from 'react-cookie'

// FontAwesome Icons
config.autoAddCss = false

const Home = () => {
  // const [cookies] = useCookies(['cookieConsent'])

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
      {/* {!cookies.cookieConsent && <CookieConsent />} */}
    </>
  )
}

export default Home
