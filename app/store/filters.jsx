import { createContext, useContext, useEffect, useState } from 'react'

const FiltersContext = createContext({
  filterBrand: {},
  filterModel: {},
  filterBodyType: {},
  filterFuelType: {},
  filtersArray: [],
  updateFilterBodyType: () => {},
  updateFilterBrand: () => {},
  updateFilterFuelType: () => {},
  updateFilterModel: () => {},
  clearFiltersArray: () => {},
  resetStates: () => {},
})

export const useFiltersContext = () => useContext(FiltersContext)

export const FiltersContextProvider = ({ children }) => {
  const [filtersArray, setFiltersArray] = useState([])
  const [filterBrand, setFilterBrand] = useState(null)
  const [filterModel, setFilterModel] = useState(null)
  const [filterBodyType, setFilterBodyType] = useState(null)
  const [filterFuelType, setFilterFuelType] = useState(null)

  useEffect(() => {
    // Create a Set to store unique filters.
    const uniqueFilters = new Set([...filtersArray])

    if (filterBrand) {
      uniqueFilters.add(filterBrand)
    }
    if (filterModel) {
      uniqueFilters.add(filterModel)
    }
    if (filterBodyType) {
      uniqueFilters.add(filterBodyType)
    }
    if (filterFuelType) {
      uniqueFilters.add(filterFuelType)
    }

    console.log('filterBrand>> ', filterBrand)

    // Convert the Set back to an array and update filtersArray.
    setFiltersArray(Array.from(uniqueFilters))
  }, [filterBrand, filterModel, filterBodyType, filterFuelType])

  useEffect(() => {
    // console.log('farray>> ', filtersArray)
  }, [filtersArray])

  const updateFilterBrand = filterBrand => {
    setFilterBrand(filterBrand)
  }

  const updateFilterModel = filterModel => {
    setFilterModel(filterModel)
  }

  const updateFilterBodyType = filterBodyType => {
    setFilterBodyType(filterBodyType)
  }

  const updateFilterFuelType = filterFuelType => {
    setFilterFuelType(filterFuelType)
  }

  const clearFiltersArray = () => {
    setFiltersArray([])
  }

  const resetStates = () => {
    setFilterBrand(null)
    setFilterModel(null)
    setFilterBodyType(null)
    setFilterFuelType(null)
  }

  const value = {
    filterBrand,
    filterModel,
    filterBodyType,
    filterFuelType,
    filtersArray,
    updateFilterBodyType,
    updateFilterBrand,
    updateFilterFuelType,
    updateFilterModel,
    clearFiltersArray,
    resetStates,
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}
