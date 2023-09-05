import Select from './Select'
import Button from './Button'
import { useSearchContext } from '@app/store/search-car'
import useFetch from '@app/hooks/useFetch'
import useCalcSearchedCars from '@app/hooks/useCalcSearchedCars'
import { useFiltersContext } from '@app/store/filters'
import { useEffect } from 'react'

const SearchForm = () => {
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

  const { countOffers, handleSubmit, handleKeyDown } = useCalcSearchedCars()

  return (
    <form
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      className="flex gap-4"
    >
      <div className="flex flex-col max-w-[320px] gap-7 ">
        <div className="relative">
          <Select
            placeholder="All brands"
            type="full"
            options={brands}
            updateFunction={updateBrand}
            lastValue={brand}
            tabIndex={1}
          />
        </div>
        <div className="flex gap-2">
          <Select
            placeholder="Year from"
            options={regYears}
            type="half"
            updateFunction={updateYearFrom}
            lastValue={yearFrom}
            tabIndex={5}
          />
          <Select
            placeholder="To"
            options={regYears}
            type="half"
            updateFunction={updateYearTo}
            lastValue={yearTo}
            tabIndex={6}
          />
        </div>
        <div className="flex gap-2">
          <Select
            placeholder="Km from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            tabIndex={9}
          />
          <Select
            placeholder="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            tabIndex={10}
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
          tabIndex={2}
        />
        <Select
          placeholder="Body types"
          options={bodyTypes}
          type="full"
          updateFunction={updateBodyType}
          lastValue={bodyType}
          tabIndex={7}
        />
        <div className="flex gap-2">
          <Select
            placeholder="Power from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            tabIndex={11}
          />
          <Select
            placeholder="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            tabIndex={12}
          />
        </div>
      </div>
      <div className="flex flex-col max-w-[320px] gap-7">
        <div className="flex gap-2">
          <Select
            placeholder="Price from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            tabIndex={3}
          />
          <Select
            placeholder="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            tabIndex={4}
          />
        </div>
        <Select
          placeholder="Fuel types"
          options={fuelTypes}
          type="full"
          updateFunction={updateFuelType}
          lastValue={fuelType}
          tabIndex={8}
        />
        <Button tabIndex={13}>{countOffers} offers</Button>
      </div>
    </form>
  )
}

export default SearchForm
