import { createContext, useContext, useState } from 'react'

const PostCarContext = createContext({
  data: {
    brand: {},
    model: {},
    regYear: {},
    updateBrand: () => {},
    updateModel: () => {},
    updateRegYear: () => {},
  },
})

export const usePostCarContext = () => useContext(PostCarContext)

export const PostCarContextProvider = ({ children }) => {
  const [brand, setBrand] = useState(null)
  const [model, setModel] = useState(null)
  const [regYear, setRegYear] = useState(null)

  const updateBrand = brand => {
    setBrand(brand)
  }

  const updateModel = model => {
    setModel(model)
  }

  const updateRegYear = regYear => {
    setRegYear(regYear)
  }

  const postCarValue = {
    brand,
    model,
    regYear,
    updateBrand,
    updateModel,
    updateRegYear,
  }

  return (
    <PostCarContext.Provider value={{ data: postCarValue }}>
      {children}
    </PostCarContext.Provider>
  )
}
