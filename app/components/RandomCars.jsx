import useFetch from '@app/hooks/useFetch'
import Container from './Container'
import SmallCard from './cards/SmallCard'

const RandomCars = () => {
  const { data: cars } = useFetch('/api/cars', [], true)

  return (
    <section className="py-7">
      <Container>
        <h2 className="text-xl font-bold mb-3.5">Random cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          {cars?.map(car => (
            <SmallCard key={car._id} car={car} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default RandomCars
