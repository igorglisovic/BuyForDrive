import { createContext, useContext, useState } from 'react'

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
  updateBrand: () => {},
  updateModel: () => {},
  updateYearFrom: () => {},
  updateYearTo: () => {},
  updateBodyType: () => {},
})

export const useSearchContext = () => useContext(searchCarContext)

export const SearchContextProvider = ({ children }) => {
  const [brand, setBrand] = useState(null)
  const [model, setModel] = useState(null)
  const [yearFrom, setYearFrom] = useState(null)
  const [yearTo, setYearTo] = useState(null)
  const [bodyType, setBodyType] = useState(null)

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

  const value = {
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    updateBrand,
    updateModel,
    updateYearFrom,
    updateYearTo,
    updateBodyType,
  }

  return (
    <searchCarContext.Provider value={value}>
      {children}
    </searchCarContext.Provider>
  )
}
