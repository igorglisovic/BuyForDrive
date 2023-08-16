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
    updateDoors: () => {},
    updateBodyType: () => {},
  },
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

  const updateBodyType = bodyType => {
    setBodyType(bodyType)
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
    updateDoors,
    updateBodyType,
  }

  return (
    <PostCarContext.Provider value={{ basicInfo, modelDetails }}>
      {children}
    </PostCarContext.Provider>
  )
}
