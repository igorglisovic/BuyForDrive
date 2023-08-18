import useFetch from '@app/hooks/useFetch'
import Select from './Select'
import { useSearchContext } from '@app/store/search-car'

const FilterCars = () => {
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

  return (
    <aside className="base-plus:min-w-[20%] hidden md-plus:block min-w-[25%] max-w-[30%] base-plus:py-9 base-plus:px-9 px-6 py-6 bg-white rounded-[45px] shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Filter cars</h2>
      <form className="flex flex-col gap-3">
        <Select
          defaultValue="All brands"
          type="full"
          options={brands}
          updateFunction={updateBrand}
          lastValue={brand}
          label="Brand"
        />
        <Select
          defaultValue="All models"
          options={models}
          type="full"
          updateFunction={updateModel}
          lastValue={model}
          disabled={brand ? false : true}
          label="Model"
        />
        <div className="flex flex-col items-baseline base-plus:flex-row  base-plus:items-end gap-2">
          <Select
            defaultValue="Price from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            label="Price"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
        <div className="flex flex-col items-baseline base-plus:flex-row  base-plus:items-end gap-2">
          <Select
            defaultValue="Year from"
            options={regYears}
            type="half"
            updateFunction={updateYearFrom}
            lastValue={yearFrom}
            label="First registration"
          />
          <Select
            defaultValue="To"
            options={regYears}
            type="half"
            updateFunction={updateYearTo}
            lastValue={yearTo}
          />
        </div>
        <div className="flex flex-col items-baseline base-plus:flex-row  base-plus:items-end gap-2">
          <Select
            defaultValue="Km from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            label="Mileage"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
        <Select
          defaultValue="Body types"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
          label="Body type"
        />
        <Select
          defaultValue="Fuel types"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
          label="Fuel type"
        />
        <div className="flex flex-col items-baseline base-plus:flex-row  base-plus:items-end gap-2">
          <Select
            defaultValue="Power from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
            label="Power"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </form>
    </aside>
  )
}

export default FilterCars
