import useFetch from '@app/hooks/useFetch'
import Select from './Select'
import { useSearchContext } from '@app/store/search-car'
import Button from './Button'
import { useEffect, useRef, useState } from 'react'
import useCalcSearchedCars from '@app/hooks/useCalcSearchedCars'
import { useFiltersContext } from '@app/store/filters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'

const filterArrayById = (array, id) => array?.find(item => item._id === id)

const FilterCars = ({ paramsArray, url, subHeaderInView }) => {
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
    sorting,
    isFilterMenuOpen,
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
    updateSorting,
    updateIsFilterMenuOpen,
  } = useSearchContext()

  const { data: brands } = useFetch('/api/brands', [], true)
  const { data: models } = useFetch(`/api/models/${brand?._id}`, [brand], brand)
  const { data: regYears } = useFetch('/api/reg_years', [], true)
  const { data: bodyTypes } = useFetch('/api/body_type', [], true)
  const { data: fuelTypes } = useFetch('/api/fuel_types', [], true)
  const { data: pricesData } = useFetch('/api/prices', [], true)
  const { data: mileagesData } = useFetch('/api/mileages', [], true)
  const { data: powersData } = useFetch('/api/powers', [], true)

  const [asideWidth, setAsideWidth] = useState('')

  const asideRef = useRef(null)

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
  const {
    filterBrand,
    filterModel,
    filterBodyType,
    filterFuelType,
    updateFilterBrand,
    updateFilterModel,
    updateFilterBodyType,
    updateFilterFuelType,
    clearFiltersArray,
  } = useFiltersContext()

  useEffect(() => {
    const urlHasBrand = paramsArray?.find(param => param.name === 'brand_id')
      ? true
      : false

    if (!urlHasBrand) {
      updateFilterBrand(null)
      updateFilterModel(null)
      updateBrand(null)
      updateModel(null)
    }

    const urlHasModel = paramsArray?.find(param => param.name === 'model_id')
      ? true
      : false

    if (!urlHasModel) {
      updateFilterModel(null)
      updateModel(null)
    }

    const urlHasBodyType = paramsArray?.find(
      param => param.name === 'body_type_id'
    )
      ? true
      : false

    if (!urlHasBodyType) {
      updateFilterBodyType(null)
      updateBodyType(null)
    }

    const urlHasFuelType = paramsArray?.find(
      param => param.name === 'fuel_type_id'
    )
      ? true
      : false

    if (!urlHasFuelType) {
      updateFilterFuelType(null)
      updateFuelType(null)
    }
  }, [paramsArray])

  useEffect(() => {
    paramsArray?.forEach(param => {
      switch (param.name) {
        case 'brand_id':
          const filterBrand2 = filterArrayById(brands, param.value)
          if (filterBrand?._id !== filterBrand2?._id) {
            updateFilterBrand(filterBrand2)
          }
          break
        case 'model_id':
          const filterModel2 = filterArrayById(models, param.value)
          if (filterModel?._id !== filterModel2?._id) {
            updateFilterModel(filterModel2)
          }
          break
        case 'body_type_id':
          const filterBodyType2 = filterArrayById(bodyTypes, param.value)
          if (filterBodyType?._id !== filterBodyType2?._id) {
            updateFilterBodyType(filterBodyType2)
          }
          break
        case 'fuel_type_id':
          const filterFuelType2 = filterArrayById(fuelTypes, param.value)
          if (filterFuelType?._id !== filterFuelType2?._id) {
            updateFilterFuelType(filterFuelType2)
          }
          break
      }
    })
  }, [
    paramsArray,
    url,
    brands,
    models,
    bodyTypes,
    fuelTypes,
    filterModel,
    filterBodyType,
    filterFuelType,
    filterBrand,
  ])

  useEffect(() => {
    paramsArray?.forEach(param => {
      if (param.name === 'sort') {
        if (sorting !== param.name) {
          updateSorting(param.value)
        }
      }
    })
  }, [paramsArray])

  useEffect(() => {
    clearFiltersArray()
  }, [paramsArray])

  useEffect(() => {
    setAsideWidth(asideRef?.current?.getBoundingClientRect().width)
  }, [])

  return (
    <aside
      aria-expanded={isFilterMenuOpen}
      className={`open-close fixed md-plus:relative base-plus:min-w-[20%] self-baseline flex-1 flex-grow-[1.1] ${
        !subHeaderInView && 'bg-transparent !p-0'
      } ${isFilterMenuOpen && 'bg-white'}`}
      ref={asideRef}
    >
      <div
        className={`absolute top-0 left-0 w-full ${
          !isFilterMenuOpen && 'rounded-[45px] shadow-md'
        }   ${
          !subHeaderInView
            ? ''
            : 'bg-white base-plus:py-9 base-plus:px-9 px-6 py-6'
        }`}
      >
        <div
          className={`${
            !subHeaderInView &&
            '!fixed self-baseline top-10 base-plus:py-9 base-plus:px-9 px-6 py-6 bg-white rounded-[45px] shadow-md  base-plus:mr-9 mr-6'
          } ${isFilterMenuOpen && 'overflow-y-auto px-1'}`}
          style={{ width: !subHeaderInView && asideWidth }}
        >
          <div className="flex justify-between md-plus:mb-4 mb-5">
            <h2 className="md-plus:text-xl text-[1.4rem] font-semibold">
              Filter cars
            </h2>
            <button
              onClick={() => updateIsFilterMenuOpen(false)}
              className="md-plus:hidden md-plus:invisible flex visible mt-1 text-xl"
            >
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            onKeyDown={handleKeyDown}
            className="flex flex-col md-plus:gap-3 gap-5"
          >
            <Select
              placeholder="All brands"
              type="full"
              options={brands}
              updateFunction={updateBrand}
              lastValue={brand}
              label="Brand"
              defaultValue={filterBrand}
            />
            <Select
              placeholder="All models"
              options={models}
              type="full"
              updateFunction={updateModel}
              lastValue={model}
              disabled={brand ? false : true}
              label="Model"
              defaultValue={filterModel}
            />
            <div className="flex items-end md-plus:flex-col md-plus:items-baseline base-plus:flex-row base-plus:items-end gap-2">
              <Select
                placeholder="Price from"
                type="half"
                label="Price"
                options={prices}
                updateFunction={updatePriceFrom}
                lastValue={priceFrom}
              />
              <Select
                placeholder="To"
                type="half"
                options={prices}
                updateFunction={updatePriceTo}
                lastValue={priceTo}
              />
            </div>
            <div className="flex items-end md-plus:flex-col md-plus:items-baseline base-plus:flex-row base-plus:items-end gap-2">
              <Select
                placeholder="Year from"
                options={regYears}
                type="half"
                updateFunction={updateYearFrom}
                lastValue={yearFrom}
                label="First registration"
              />
              <Select
                placeholder="To"
                options={regYears}
                type="half"
                updateFunction={updateYearTo}
                lastValue={yearTo}
              />
            </div>
            <div className="flex items-end md-plus:flex-col md-plus:items-baseline base-plus:flex-row  base-plus:items-end gap-2">
              <Select
                placeholder="Km from"
                type="half"
                label="Mileage"
                options={mileages}
                updateFunction={updateMileageFrom}
                lastValue={mileageFrom}
              />
              <Select
                placeholder="To"
                type="half"
                options={mileages}
                updateFunction={updateMileageTo}
                lastValue={mileageTo}
              />
            </div>
            <Select
              label="Body type"
              placeholder="Body types"
              options={bodyTypes}
              type="full"
              updateFunction={updateBodyType}
              lastValue={bodyType}
              defaultValue={filterBodyType}
            />
            <Select
              label="Fuel type"
              placeholder="Fuel types"
              options={fuelTypes}
              type="full"
              updateFunction={updateFuelType}
              lastValue={fuelType}
              defaultValue={filterFuelType}
            />
            <div className="flex items-end md-plus:flex-col md-plus:items-baseline base-plus:flex-row  base-plus:items-end gap-2">
              <Select
                placeholder="Power from"
                type="half"
                label="Power"
                options={powers}
                updateFunction={updatePowerFrom}
                lastValue={powerFrom}
              />
              <Select
                placeholder="To"
                type="half"
                options={powers}
                updateFunction={updatePowerTo}
                lastValue={powerTo}
              />
            </div>
            <Button className="md-plus:!self-start md-plus:mt-2 !self-center">
              {countOffers} offers
            </Button>
          </form>
        </div>
      </div>
    </aside>
  )
}

export default FilterCars
