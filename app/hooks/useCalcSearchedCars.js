import { useEffect, useState } from 'react'
import useMakeUrl from './useMakeUrl'
import { useRouter } from 'next/navigation'
import { useSearchContext } from '@app/store/search-car'

const fetchSearchedCars = async url => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const useCalcSearchedCars = () => {
  const { brand, model, yearFrom, yearTo, bodyType, fuelType, sorting } =
    useSearchContext()

  const [countOffers, setCountOffers] = useState()

  const router = useRouter()

  const queriesArray = [
    { name: 'sort', value: sorting },
    { name: 'brand_id', value: brand?._id },
    { name: 'model_id', value: model?._id },
    { name: 'year_from', value: yearFrom?.label },
    { name: 'year_to', value: yearTo?.label },
    { name: 'body_type_id', value: bodyType?._id },
    { name: 'fuel_type_id', value: fuelType?._id },
  ]

  const handleSubmit = e => {
    e.preventDefault()

    const { url } = useMakeUrl('/cars/search?', queriesArray)
    router.push(url)
  }

  const handleChange = () => {
    const { url } = useMakeUrl('/cars/search?', queriesArray)
    router.push(url)
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13 && document.activeElement.tagName !== 'BUTTON') {
      e.preventDefault()
    }
  }

  useEffect(() => {
    const countNumOfAllOffers = async () => {
      const allCars = await fetchSearchedCars('/api/cars', [])
      setCountOffers(allCars?.length)
    }
    if (!brand && !model && !yearFrom && !yearTo && !bodyType && !fuelType)
      countNumOfAllOffers()
  }, [brand, model, yearFrom, yearTo, bodyType, fuelType])

  useEffect(() => {
    const fetchSearchedCarsData = async () => {
      const { url } = useMakeUrl('/api/searched_cars?', queriesArray)
      const data = await fetchSearchedCars(url)

      setCountOffers(data?.length)
    }
    if (brand || model || yearFrom || yearTo || bodyType || fuelType)
      fetchSearchedCarsData()
  }, [brand, model, yearFrom, yearTo, bodyType, fuelType])

  return { countOffers, handleSubmit, handleKeyDown, handleChange }
}

export default useCalcSearchedCars
