import Container from './Container'
import SmallCard from './SmallCard'

const RandomCars = () => {
  return (
    <section className="py-7">
      <Container>
        <h2 className="text-xl font-bold mb-3.5">Random cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
          <SmallCard />
        </div>
      </Container>
    </section>
  )
}

export default RandomCars
