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
  kmFrom: {},
  kmTo: {},
  powerFrom: {},
  powerTo: {},
  sorting: '',
  defaultSortValue: '',
  page: '',
  limit: '',
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
})

export const useSearchContext = () => useContext(searchCarContext)

export const SearchContextProvider = ({ children }) => {
  const [brand, setBrand] = useState(null)
  const [model, setModel] = useState(null)
  const [yearFrom, setYearFrom] = useState(null)
  const [yearTo, setYearTo] = useState(null)
  const [bodyType, setBodyType] = useState(null)
  const [fuelType, setFuelType] = useState(null)
  const [sorting, setSorting] = useState('')
  const [defaultSortValue, setDefaultSortValue] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)

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

  const resetStates = () => {
    setBrand(null)
    setModel(null)
    setYearFrom(null)
    setYearTo(null)
    setBodyType(null)
    setFuelType(null)
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
  }

  return (
    <searchCarContext.Provider value={value}>
      {children}
    </searchCarContext.Provider>
  )
}
