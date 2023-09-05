import { createContext, useContext, useEffect, useState } from 'react'

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
    power: {},
    displacement: '',
    seats: {},
    steeringSide: '',
    drivetrain: {},
    color: {},
    airConditioning: {},
    updateDoors: () => {},
    updateBodyType: () => {},
    updateTransmissionType: () => {},
    updateFuelType: () => {},
    updatePower: () => {},
    updateDisplacement: () => {},
    updateSeats: () => {},
    updateSteeringSide: () => {},
    updateDrivetrain: () => {},
    updateColor: () => {},
    updateAirConditioning: () => {},
  },
  pricingDetails: {
    price: '',
    fixedPrice: true,
    owners: {},
    description: '',
    updatePrice: () => {},
    updateFixedPrice: () => {},
    updateOwners: () => {},
    updateDescription: () => {},
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
  const [power, setPower] = useState(null)
  const [displacement, setDisplacement] = useState(null)
  const [seats, setSeats] = useState(null)
  const [steeringSide, setSteeringSide] = useState(null)
  const [drivetrain, setDrivetrain] = useState(null)
  const [color, setColor] = useState(null)
  const [airConditioning, setAirConditioning] = useState(null)
  const [price, setPrice] = useState(null)
  const [fixedPrice, setFixedPrice] = useState(true)
  const [owners, setOwners] = useState(true)
  const [description, setDescription] = useState(null)

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

  const updateSeats = seats => {
    setSeats(seats)
  }

  const updateSteeringSide = steeringSide => {
    setSteeringSide(steeringSide)
  }

  const updateDrivetrain = drivetrain => {
    setDrivetrain(drivetrain)
  }

  const updateColor = color => {
    setColor(color)
  }

  const updateAirConditioning = airConditioning => {
    setAirConditioning(airConditioning)
  }

  const updatePrice = price => {
    setPrice(price)
  }

  const updateFixedPrice = fixedPrice => {
    setFixedPrice(fixedPrice)
  }

  const updateOwners = owners => {
    setOwners(owners)
  }

  const updateDescription = description => {
    setDescription(description)
  }

  const updatePower = power => {
    const calculatedPower = {
      hp: power,
      kw: Math.trunc(power * 0.745699872),
    }

    setPower(calculatedPower)
  }

  const updateDisplacement = displacement => {
    setDisplacement(displacement)
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
    setPower(null)
    setDisplacement(null)
    setSeats(null)
    setSteeringSide(null)
    setDrivetrain(null)
    setColor(null)
    setAirConditioning(null)
    setPrice(null)
    setFixedPrice(true)
    setDescription(null)
    setOwners(null)
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
    power,
    displacement,
    seats,
    steeringSide,
    drivetrain,
    color,
    airConditioning,
    updateDoors,
    updateBodyType,
    updateTransmissionType,
    updateFuelType,
    updatePower,
    updateDisplacement,
    updateSeats,
    updateSteeringSide,
    updateDrivetrain,
    updateColor,
    updateAirConditioning,
  }

  const pricingDetails = {
    price,
    fixedPrice,
    owners,
    description,
    updatePrice,
    updateFixedPrice,
    updateOwners,
    updateDescription,
  }

  return (
    <PostCarContext.Provider
      value={{ basicInfo, modelDetails, pricingDetails, resetStates }}
    >
      {children}
    </PostCarContext.Provider>
  )
}
