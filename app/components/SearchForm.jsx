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
  const [searchedCars, setSearchedCars] = useState([])

  const router = useRouter()

  const {
    brand,
    model,
    yearFrom,
    yearTo,
    updateBrand,
    updateModel,
    updateYearFrom,
    updateYearTo,
  } = useSearchContext()

  const { data: brands } = useFetch('/api/brands', [], true)
  const { data: models } = useFetch(`/api/models/${brand?._id}`, [brand], brand)
  const { data: regYears } = useFetch('/api/reg_years', [], true)

  const handleSubmit = async e => {
    e.preventDefault()

    const { url } = useMakeUrl('/cars/search?', [
      { name: 'brand_id', value: brand?._id },
      { name: 'model_id', value: model?._id },
      { name: 'year_from', value: yearFrom?.label },
      { name: 'year_to', value: yearTo?.label },
    ])

    router.push(url)
  }

  useEffect(() => {
    const fetchSearchedCarsData = async () => {
      const { url } = useMakeUrl('/api/searched_cars?', [
        { name: 'brand_id', value: brand?._id },
        { name: 'model_id', value: model?._id },
        { name: 'year_from', value: yearFrom?.label },
        { name: 'year_to', value: yearTo?.label },
      ])

      const data = await fetchSearchedCars(url)

      setSearchedCars(data)
      setCountOffers(data?.length)
    }
    fetchSearchedCarsData()
  }, [brand, model, yearFrom, yearTo])

  useEffect(() => {
    const countNumOfAllOffers = async () => {
      const allCars = await fetchSearchedCars('/api/cars', [])
      setCountOffers(allCars?.length)
      setSearchedCars(allCars)
    }
    countNumOfAllOffers()
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <div className="flex flex-col gap-7">
        <div className="relative">
          <Select
            defaultValue="All brands"
            type="full"
            options={brands}
            updateFunction={updateBrand}
            lastValue={brand}
          />
        </div>
        <div className="flex gap-2">
          <Select
            defaultValue="Year from"
            options={regYears}
            type="half"
            updateFunction={updateYearFrom}
            lastValue={yearFrom}
          />
          <Select
            defaultValue="To"
            options={regYears}
            type="half"
            updateFunction={updateYearTo}
            lastValue={yearTo}
          />
        </div>
        <div className="flex gap-2">
          <Select
            defaultValue="Km from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <Select
          defaultValue="All models"
          options={models}
          type="full"
          updateFunction={updateModel}
          lastValue={model}
          disabled={brand ? false : true}
        />
        <Select
          defaultValue="Body types"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
        />
        <div className="flex gap-2">
          <Select
            defaultValue="Power from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-2">
          <Select
            defaultValue="Price from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
        <Select
          defaultValue="Fuel types"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
        />
        <Button>{countOffers} offers</Button>
      </div>
    </form>
  )
}

export default SearchForm
