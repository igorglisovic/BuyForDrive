import useFetch from '@app/hooks/useFetch'
import Select from './Select'
import { useSearchContext } from '@app/store/search-car'
import Container from './Container'
import { useEffect } from 'react'

const SearchedCars = () => {
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

  useEffect(() => {}, [])

  console.log(brand)

  return (
    <section className="py-10">
      <Container>
        <aside className="flex min-w-[20%] max-w-[30%] py-10 px-9 bg-white rounded-[45px] shadow-md">
          <form className="flex flex-col gap-3">
            <Select
              defaultValue="All brands"
              type="full"
              options={brands}
              updateFunction={updateBrand}
              lastValue={brand}
            />
            <Select
              defaultValue="All models"
              options={models}
              type="full"
              updateFunction={updateModel}
              lastValue={model}
              disabled={brand ? false : true}
            />
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
            <Select
              defaultValue="Body types"
              options={['BMW', 'Audi', 'Mercedes']}
              type="full"
            />
            <Select
              defaultValue="Fuel types"
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
          </form>
        </aside>
      </Container>
    </section>
  )
}

export default SearchedCars
