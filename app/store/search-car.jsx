import { createContext, useContext, useEffect, useState } from 'react'

const searchCarContext = createContext({
  brand: {},
  model: {},
  yearFrom: {},
  yearTo: {},
  priceFrom: '',
  priceTo: '',
  bodyType: {},
  fuelType: {},
  mileageFrom: {},
  mileageTo: {},
  powerFrom: {},
  powerTo: {},
  sorting: '',
  defaultSortValue: '',
  page: '',
  limit: '',
  isFilterMenuOpen: false,
  updateBrand: () => {},
  updateModel: () => {},
  updateYearFrom: () => {},
  updateYearTo: () => {},
  updateBodyType: () => {},
  updateFuelType: () => {},
  updateSorting: () => {},
  updateDefaultSortValue: () => {},
  resetStates: () => {},
  updatePage: () => {},
  updateLimit: () => {},
  updatePriceFrom: () => {},
  updatePriceTo: () => {},
  updateMileageFrom: () => {},
  updateMileageTo: () => {},
  updatePowerFrom: () => {},
  updatePowerTo: () => {},
  updateIsFilterMenuOpen: () => {},
})

export const useSearchContext = () => useContext(searchCarContext)

export const SearchContextProvider = ({ children }) => {
  const [brand, setBrand] = useState(null)
  const [model, setModel] = useState(null)
  const [yearFrom, setYearFrom] = useState(null)
  const [yearTo, setYearTo] = useState(null)
  const [priceFrom, setPriceFrom] = useState(null)
  const [priceTo, setPriceTo] = useState(null)
  const [mileageFrom, setMileageFrom] = useState(null)
  const [mileageTo, setMileageTo] = useState(null)
  const [powerFrom, setPowerFrom] = useState(null)
  const [powerTo, setPowerTo] = useState(null)
  const [bodyType, setBodyType] = useState(null)
  const [fuelType, setFuelType] = useState(null)
  const [sorting, setSorting] = useState('')
  const [defaultSortValue, setDefaultSortValue] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false)

  const updateBrand = brand => {
    setBrand(brand)
  }

  const updateModel = model => {
    setModel(model)
  }

  const updateYearFrom = yearFrom => {
    setYearFrom(yearFrom)
  }

  const updateYearTo = yearTo => {
    setYearTo(yearTo)
  }

  const updateBodyType = bodyType => {
    setBodyType(bodyType)
  }

  const updateFuelType = fuelType => {
    setFuelType(fuelType)
  }

  const updateSorting = sorting => {
    setSorting(sorting)
  }

  const updateDefaultSortValue = value => {
    setDefaultSortValue(value)
  }

  const updatePage = value => {
    setPage(value)
  }

  const updateLimit = value => {
    setLimit(value)
  }

  const updatePriceFrom = value => {
    setPriceFrom(value)
  }

  const updatePriceTo = value => {
    setPriceTo(value)
  }

  const updateMileageFrom = value => {
    setMileageFrom(value)
  }

  const updateMileageTo = value => {
    setMileageTo(value)
  }

  const updatePowerFrom = value => {
    setPowerFrom(value)
  }

  const updatePowerTo = value => {
    setPowerTo(value)
  }

  const updateIsFilterMenuOpen = value => {
    setIsFilterMenuOpen(value)
  }

  const resetStates = () => {
    setBrand(null)
    setModel(null)
    setYearFrom(null)
    setYearTo(null)
    setBodyType(null)
    setFuelType(null)
    setPriceFrom(null)
    setPriceTo(null)
    setMileageFrom(null)
    setMileageTo(null)
    setPowerFrom(null)
    setPowerTo(null)
    setSorting('default_sorting')
  }

  const value = {
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    sorting,
    defaultSortValue,
    page,
    limit,
    priceFrom,
    priceTo,
    mileageFrom,
    mileageTo,
    powerFrom,
    powerTo,
    isFilterMenuOpen,
    updateBrand,
    updateModel,
    updateYearFrom,
    updateYearTo,
    updateBodyType,
    updateFuelType,
    resetStates,
    updateSorting,
    updateDefaultSortValue,
    updatePage,
    updateLimit,
    updatePriceFrom,
    updatePriceTo,
    updateMileageFrom,
    updateMileageTo,
    updatePowerFrom,
    updatePowerTo,
    updateIsFilterMenuOpen,
  }

  return (
    <searchCarContext.Provider value={value}>
      {children}
    </searchCarContext.Provider>
  )
}
