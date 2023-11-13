import useFetch from '@app/hooks/useFetch'
import Container from './Container'
import SmallCard from './cards/SmallCard'
import SmallCardLoad from './cards/SmallCardLoad'

const loadCars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const RandomCars = () => {
  let { data: cars, loading } = useFetch('/api/cars', [], true)

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-bold mb-3.5">Random cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          {cars?.map(car => (
            <SmallCard key={car._id} car={car} />
          ))}
          {loading && loadCars.map((item, i) => <SmallCardLoad key={i} />)}
        </div>
      </Container>
    </section>
  )
}

export default RandomCars
