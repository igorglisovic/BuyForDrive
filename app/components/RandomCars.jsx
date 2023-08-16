import useFetch from '@app/hooks/useFetch'
import Container from './Container'
import SmallCard from './SmallCard'
import { useEffect } from 'react'

const RandomCars = () => {
  const { data: cars } = useFetch('/api/cars', [], true)

  return (
    <section className="py-7">
      <Container>
        <h2 className="text-xl font-bold mb-3.5">Random cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          {cars?.map(car => (
            <SmallCard
              key={car._id}
              brand={car.brand_id.label}
              model={car.model_id.label}
              regYear={car.reg_year_id.label}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default RandomCars
