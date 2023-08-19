import Select from './Select'
import Button from './Button'
import { useSearchContext } from '@app/store/search-car'
import useFetch from '@app/hooks/useFetch'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useMakeUrl from '@app/hooks/useMakeUrl'

const fetchSearchedCars = async url => {
  try {
    const res = await fetch(url)
    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

const SearchForm = () => {
  const [countOffers, setCountOffers] = useState()

  const router = useRouter()

  const {
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    updateBrand,
    updateModel,
    updateYearFrom,
    updateYearTo,
    updateBodyType,
    updateFuelType,
  } = useSearchContext()

  const { data: brands } = useFetch('/api/brands', [], true)
  const { data: models } = useFetch(`/api/models/${brand?._id}`, [brand], brand)
  const { data: regYears } = useFetch('/api/reg_years', [], true)
  const { data: bodyTypes } = useFetch('/api/body_type', [], true)
  const { data: fuelTypes } = useFetch('/api/fuel_types', [], true)

  const makeUrlQueriesArray = [
    { name: 'brand_id', value: brand?._id },
    { name: 'model_id', value: model?._id },
    { name: 'year_from', value: yearFrom?.label },
    { name: 'year_to', value: yearTo?.label },
    { name: 'body_type_id', value: bodyType?._id },
    { name: 'fuel_type_id', value: fuelType?._id },
  ]

  const handleSubmit = async e => {
    e.preventDefault()

    const { url } = useMakeUrl('/cars/search?', makeUrlQueriesArray)

    router.push(url)
  }

  useEffect(() => {
    const fetchSearchedCarsData = async () => {
      const { url } = useMakeUrl('/api/searched_cars?', makeUrlQueriesArray)

      const data = await fetchSearchedCars(url)

      setCountOffers(data?.length)

      console.log(url)
    }
    fetchSearchedCarsData()
  }, [brand, model, yearFrom, yearTo, bodyType, fuelType])

  useEffect(() => {
    const countNumOfAllOffers = async () => {
      const allCars = await fetchSearchedCars('/api/cars', [])
      setCountOffers(allCars?.length)
    }
    countNumOfAllOffers()
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex  gap-4">
      <div className="flex flex-col max-w-[320px] gap-7 ">
        <div className="relative">
          <Select
            placeholder="All brands"
            type="full"
            options={brands}
            updateFunction={updateBrand}
            lastValue={brand}
          />
        </div>
        <div className="flex gap-2">
          <Select
            placeholder="Year from"
            options={regYears}
            type="half"
            updateFunction={updateYearFrom}
            lastValue={yearFrom}
          />
          <Select
            placeholder="To"
            options={regYears}
            type="half"
            updateFunction={updateYearTo}
            lastValue={yearTo}
          />
        </div>
        <div className="flex gap-2">
          <Select
            placeholder="Km from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            placeholder="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </div>
      <div className="flex flex-col max-w-[320px] gap-7">
        <Select
          placeholder="All models"
          options={models}
          type="full"
          updateFunction={updateModel}
          lastValue={model}
          disabled={brand ? false : true}
        />
        <Select
          placeholder="Body types"
          options={bodyTypes}
          type="full"
          updateFunction={updateBodyType}
          lastValue={bodyType}
        />
        <div className="flex gap-2">
          <Select
            placeholder="Power from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            placeholder="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </div>
      <div className="flex flex-col max-w-[320px] gap-7">
        <div className="flex gap-2">
          <Select
            placeholder="Price from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            placeholder="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
        <Select
          placeholder="Fuel types"
          options={fuelTypes}
          type="full"
          updateFunction={updateFuelType}
          lastValue={fuelType}
        />
        <Button>{countOffers} offers</Button>
      </div>
    </form>
  )
}

export default SearchForm
