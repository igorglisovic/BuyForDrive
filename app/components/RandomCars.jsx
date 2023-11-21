import useFetch from '@app/hooks/useFetch'
import Container from './Container'
import SmallCard from './cards/SmallCard'
import SmallCardLoad from './cards/SmallCardLoad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const loadCars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const RandomCars = () => {
  const [page, setPage] = useState(1)

  let { data: cars, loading } = useFetch(
    `/api/cars/random/${page}`,
    [page],
    true
  )

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-bold mb-3.5">Random cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          {cars?.map(car => (
            <SmallCard key={car._id} car={car} />
          ))}
          {loading &&
            !cars &&
            loadCars.map((item, i) => <SmallCardLoad key={i} />)}
        </div>
        {cars && (
          <div className="flex justify-center pt-4 gap-7">
            <button
              onClick={() => {
                setPage(prev => (prev === 2 ? prev - 1 : prev + 1))
              }}
              className="hover:text-gray-700"
            >
              <FontAwesomeIcon className="text-4xl" icon={faAngleLeft} />
            </button>
            <button
              onClick={() => {
                setPage(prev => (prev === 2 ? prev - 1 : prev + 1))
              }}
              className="hover:text-gray-700"
            >
              <FontAwesomeIcon className="text-4xl" icon={faAngleRight} />
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}

export default RandomCars
