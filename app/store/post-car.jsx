import { createContext, useContext, useState } from 'react'

const PostCarContext = createContext({
  basicInfo: {
    brand: {},
    model: {},
    regYear: {},
    regMonth: {},
    mileage: '',
    updateBrand: () => {},
    updateModel: () => {},
    updateRegYear: () => {},
    updateRegMonth: () => {},
    updateMileage: () => {},
  },
  modelDetails: {
    doors: {},
    bodyType: {},
    transmissionType: {},
    fuelType: {},
    updateDoors: () => {},
    updateBodyType: () => {},
    updateTransmissionType: () => {},
    updateFuelType: () => {},
  },
  resetStates: () => {},
})

export const usePostCarContext = () => useContext(PostCarContext)

export const PostCarContextProvider = ({ children }) => {
  const [brand, setBrand] = useState(null)
  const [model, setModel] = useState(null)
  const [regYear, setRegYear] = useState(null)
  const [regMonth, setRegMonth] = useState(null)
  const [mileage, setMileage] = useState(null)
  const [doors, setDoors] = useState(null)
  const [bodyType, setBodyType] = useState(null)
  const [fuelType, setFuelType] = useState(null)
  const [transmissionType, setTransmissionType] = useState(null)

  const updateBrand = brand => {
    setBrand(brand)
  }

  const updateModel = model => {
    setModel(model)
  }

  const updateRegYear = regYear => {
    setRegYear(regYear)
  }

  const updateRegMonth = regMonth => {
    setRegMonth(regMonth)
  }

  const updateMileage = mileage => {
    setMileage(mileage)
  }

  const updateDoors = doors => {
    setDoors(doors)
  }

  const updateFuelType = fuelType => {
    setFuelType(fuelType)
  }

  const updateBodyType = bodyType => {
    setBodyType(bodyType)
  }

  const updateTransmissionType = transmissionType => {
    setTransmissionType(transmissionType)
  }

  const resetStates = () => {
    setBrand(null)
    setModel(null)
    setRegYear(null)
    setRegMonth(null)
    setMileage(null)
    setDoors(null)
    setFuelType(null)
    setBodyType(null)
    setTransmissionType(null)
  }

  const basicInfo = {
    brand,
    model,
    regYear,
    regMonth,
    mileage,
    updateBrand,
    updateModel,
    updateRegYear,
    updateRegMonth,
    updateMileage,
  }

  const modelDetails = {
    doors,
    bodyType,
    fuelType,
    transmissionType,
    updateDoors,
    updateBodyType,
    updateTransmissionType,
    updateFuelType,
  }

  return (
    <PostCarContext.Provider value={{ basicInfo, modelDetails, resetStates }}>
      {children}
    </PostCarContext.Provider>
  )
}
