'use client'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css' // Import the CSS

import Search from './components/Search'
import SmallCard from './components/SmallCard'
import Container from './components/Container'
import RandomCars from './components/RandomCars'

config.autoAddCss = false

const Home = () => {
  return (
    <>
      <Search />
      <RandomCars />
    </>
  )
}

export default Home
