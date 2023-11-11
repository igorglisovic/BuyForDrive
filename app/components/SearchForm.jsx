import Select from './Select'
import Button from './Button'
import { useSearchContext } from '@app/store/search-car'
import useFetch from '@app/hooks/useFetch'
import useCalcSearchedCars from '@app/hooks/useCalcSearchedCars'

const SearchForm = () => {
  const {
    brand,
    model,
    yearFrom,
    yearTo,
    bodyType,
    fuelType,
    priceFrom,
    priceTo,
    mileageTo,
    mileageFrom,
    powerFrom,
    powerTo,
    updateBrand,
    updateModel,
    updateYearFrom,
    updateYearTo,
    updateBodyType,
    updateFuelType,
    updatePriceFrom,
    updatePriceTo,
    updateMileageFrom,
    updateMileageTo,
    updatePowerFrom,
    updatePowerTo,
  } = useSearchContext()

  const { data: brands } = useFetch('/api/brands', [], true)
  const { data: models } = useFetch(`/api/models/${brand?._id}`, [brand], brand)
  const { data: regYears } = useFetch('/api/reg_years', [], true)
  const { data: bodyTypes } = useFetch('/api/body_type', [], true)
  const { data: fuelTypes } = useFetch('/api/fuel_types', [], true)
  const { data: pricesData } = useFetch('/api/prices', [], true)
  const { data: mileagesData } = useFetch('/api/mileages', [], true)
  const { data: powersData } = useFetch('/api/powers', [], true)

  // Convert price to numeric and add €
  const prices = pricesData?.map(price => ({
    ...price,
    label: new Intl.NumberFormat('en-US').format(price.label) + ' €',
  }))

  // Convert mileages to numeric and add km
  const mileages = mileagesData?.map(mileage => ({
    ...mileage,
    label: new Intl.NumberFormat('en-US').format(mileage.label) + ' km',
  }))

  // Convert price to numeric and add €
  const powers = powersData?.map(power => ({
    ...power,
    label: `${Math.trunc(+power.label * 0.745699872)}kW (${power.label} hp)`,
  }))

  const { countOffers, handleSubmit, handleKeyDown } = useCalcSearchedCars()

  return (
    <form
      onKeyDown={handleKeyDown}
      onSubmit={handleSubmit}
      className="md-form:flex md-form:gap-4 gap-y-4 sm:gap-x-2 gap-x-2 grid grid-cols-2 "
    >
      <div className="flex flex-col md-form:gap-7 gap-4 sm:flex-1">
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
        <div className="flex sm:gap-2 gap-1">
          <Select
            placeholder="Year from"
            options={regYears}
            type="half"
            updateFunction={updateYearFrom}
            lastValue={yearFrom}
            tabIndex={5}
            style={{
              fontSize: '0.7rem',
            }}
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
        <div className="hidden invisible sm:flex sm:visible sm:gap-2">
          <Select
            placeholder="Km from"
            options={mileages}
            type="half"
            tabIndex={9}
            updateFunction={updateMileageFrom}
            lastValue={mileageFrom}
          />
          <Select
            placeholder="To"
            options={mileages}
            type="half"
            tabIndex={10}
            updateFunction={updateMileageTo}
            lastValue={mileageTo}
          />
        </div>
      </div>
      <div className="flex flex-col md-form:gap-7 gap-4 col-start-2 col-end-3 sm:flex-1">
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
        <div className="hidden invisible sm:flex sm:visible sm:gap-2">
          <Select
            placeholder="Power from"
            options={powers}
            type="half"
            updateFunction={updatePowerFrom}
            lastValue={powerFrom}
            tabIndex={11}
          />
          <Select
            placeholder="To"
            options={powers}
            type="half"
            updateFunction={updatePowerTo}
            lastValue={powerTo}
            tabIndex={12}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-2 sm:hidden sm:invisible">
        <div className="flex gap-2">
          <Select
            placeholder="Km from"
            options={mileages}
            type="half"
            tabIndex={9}
            updateFunction={updateMileageFrom}
            lastValue={mileageFrom}
          />
          <Select
            placeholder="To"
            options={mileages}
            type="half"
            tabIndex={10}
            updateFunction={updateMileageTo}
            lastValue={mileageTo}
          />
        </div>
        <div className="flex gap-2">
          <Select
            placeholder="Power from"
            options={powers}
            type="half"
            updateFunction={updatePowerFrom}
            lastValue={powerFrom}
            tabIndex={11}
          />
          <Select
            placeholder="To"
            options={powers}
            type="half"
            updateFunction={updatePowerTo}
            lastValue={powerTo}
            tabIndex={12}
          />
        </div>
      </div>
      <div className="flex md-form:flex-col sm:flex-row flex-col col-start-1 col-end-3 md-form:gap-7 sm:gap-2 gap-4 md-form:flex-1">
        <div className="flex gap-2 sm:flex-1">
          <Select
            placeholder="Price from"
            options={prices}
            type="half"
            tabIndex={3}
            updateFunction={updatePriceFrom}
            lastValue={priceFrom}
          />
          <Select
            placeholder="To"
            options={prices}
            type="half"
            tabIndex={4}
            updateFunction={updatePriceTo}
            lastValue={priceTo}
          />
        </div>
        <Select
          placeholder="Fuel types"
          options={fuelTypes}
          type="full"
          updateFunction={updateFuelType}
          lastValue={fuelType}
          tabIndex={8}
          className="sm:flex-1"
        />
        <Button
          className="hidden invisible md-form:visible md-form:inline-block"
          tabIndex={13}
        >
          {countOffers} offers
        </Button>
      </div>
      <Button
        className="md-form:hidden md-form:invisible col-span-2 justify-self-center"
        tabIndex={13}
      >
        {countOffers} offers
      </Button>
    </form>
  )
}

export default SearchForm
