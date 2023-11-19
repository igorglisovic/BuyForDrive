import { createContext, useContext, useEffect, useState } from 'react'

const FiltersContext = createContext({
  filterBrand: {},
  filterModel: {},
  filterBodyType: {},
  filterFuelType: {},
  filterYearFrom: {},
  filterYearTo: {},
  filterMileageFrom: {},
  filterMileageTo: {},
  filterPriceFrom: {},
  filterPriceTo: {},
  filterPowerFrom: {},
  filterPowerTo: {},
  filtersArray: [],
  updateFilterBodyType: () => {},
  updateFilterBrand: () => {},
  updateFilterFuelType: () => {},
  updateFilterModel: () => {},
  updateFilterYearFrom: () => {},
  updateFilterYearTo: () => {},
  updateFilterMileageFrom: () => {},
  updateFilterMileageTo: () => {},
  updateFilterPriceFrom: () => {},
  updateFilterPriceTo: () => {},
  updateFilterPowerFrom: () => {},
  updateFilterPowerTo: () => {},
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
  const [filterYearFrom, setFilterYearFrom] = useState(null)
  const [filterYearTo, setFilterYearTo] = useState(null)
  const [filterMileageFrom, setFilterMileageFrom] = useState(null)
  const [filterMileageTo, setFilterMileageTo] = useState(null)
  const [filterPriceFrom, setFilterPriceFrom] = useState(null)
  const [filterPriceTo, setFilterPriceTo] = useState(null)
  const [filterPowerFrom, setFilterPowerFrom] = useState(null)
  const [filterPowerTo, setFilterPowerTo] = useState(null)

  // Create a Set to store unique filters.
  let uniqueFilters = new Set([...filtersArray])

  const addUniqueFilters = state => {
    if (state) {
      uniqueFilters.add(state)
    }
  }

  const addFromToFilter = (filterFrom, filterTo, text, type) => {
    if (filterFrom && filterTo) {
      uniqueFilters.add({
        from: filterFrom,
        to: filterTo,
        text,
        type,
      })
    }

    if (filterFrom && !filterTo) {
      uniqueFilters.add(filterFrom)
    }
    if (filterTo && !filterFrom) {
      uniqueFilters.add(filterTo)
    }
  }

  useEffect(() => {
    addUniqueFilters(filterBrand)
    addUniqueFilters(filterModel)
    addUniqueFilters(filterBodyType)
    addUniqueFilters(filterFuelType)

    addFromToFilter(filterYearFrom, filterYearTo, 'Registration year', 'year')
    addFromToFilter(filterMileageFrom, filterMileageTo, 'Mileage', 'mileage')
    addFromToFilter(filterPriceFrom, filterPriceTo, 'Price', 'price')
    addFromToFilter(filterPowerFrom, filterPowerTo, 'Power', 'power')

    // Convert the Set back to an array and update filtersArray.
    setFiltersArray(Array.from(uniqueFilters))
    console.log('farray ', filterModel)
  }, [
    filterBrand,
    filterModel,
    filterBodyType,
    filterFuelType,
    filterYearFrom,
    filterYearTo,
    filterMileageFrom,
    filterMileageTo,
    filterPriceFrom,
    filterPriceTo,
    filterPowerFrom,
    filterPowerTo,
  ])

  useEffect(() => {
    if (
      !filtersArray.length &&
      (filterBrand ||
        filterModel ||
        filterFuelType ||
        filterBodyType ||
        filterYearFrom ||
        filterYearTo ||
        filterMileageFrom ||
        filterMileageTo ||
        filterPriceFrom ||
        filterPriceTo ||
        filterPowerFrom ||
        filterPowerTo)
    ) {
      addUniqueFilters(filterBrand)
      addUniqueFilters(filterModel)
      addUniqueFilters(filterBodyType)
      addUniqueFilters(filterFuelType)

      addFromToFilter(filterYearFrom, filterYearTo, 'Registration year', 'year')
      addFromToFilter(filterMileageFrom, filterMileageTo, 'Mileage', 'mileage')
      addFromToFilter(filterPriceFrom, filterPriceTo, 'Price', 'price')
      addFromToFilter(filterPowerFrom, filterPowerTo, 'Power', 'power')

      // Convert the Set back to an array and update filtersArray.
      setFiltersArray(Array.from(uniqueFilters))
    }
    console.log('farray ', filtersArray)
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

  const updateFilterYearFrom = filterYearFrom => {
    setFilterYearFrom(filterYearFrom)
  }

  const updateFilterYearTo = filterYearTo => {
    setFilterYearTo(filterYearTo)
  }

  const updateFilterMileageFrom = filterMileageFrom => {
    setFilterMileageFrom(filterMileageFrom)
  }

  const updateFilterMileageTo = filterMileageTo => {
    setFilterMileageTo(filterMileageTo)
  }

  const updateFilterPriceFrom = filterPriceFrom => {
    setFilterPriceFrom(filterPriceFrom)
  }

  const updateFilterPriceTo = filterPriceTo => {
    setFilterPriceTo(filterPriceTo)
  }

  const updateFilterPowerFrom = filterPowerFrom => {
    setFilterPowerFrom(filterPowerFrom)
  }

  const updateFilterPowerTo = filterPowerTo => {
    setFilterPowerTo(filterPowerTo)
  }

  const clearFiltersArray = () => {
    setFiltersArray([])
  }

  const resetStates = () => {
    setFilterBrand(null)
    setFilterModel(null)
    setFilterBodyType(null)
    setFilterFuelType(null)
    setFilterYearFrom(null)
    setFilterYearTo(null)
  }

  const value = {
    filterBrand,
    filterModel,
    filterBodyType,
    filterFuelType,
    filtersArray,
    filterYearFrom,
    filterYearTo,
    filterMileageFrom,
    filterMileageTo,
    filterPriceFrom,
    filterPriceTo,
    filterPowerFrom,
    filterPowerTo,
    updateFilterBodyType,
    updateFilterBrand,
    updateFilterFuelType,
    updateFilterModel,
    updateFilterYearFrom,
    updateFilterYearTo,
    updateFilterMileageFrom,
    updateFilterMileageTo,
    updateFilterPriceFrom,
    updateFilterPriceTo,
    updateFilterPowerFrom,
    updateFilterPowerTo,
    clearFiltersArray,
    resetStates,
  }

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  )
}
