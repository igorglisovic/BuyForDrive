import useFetch from '@app/hooks/useFetch'
import Container from './Container'
import SmallCard from './cards/SmallCard'
import SmallCardLoad from './cards/SmallCardLoad'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const loadCars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

const RandomCars = () => {
  const [page, setPage] = useState(1)
  const [mediaMatches, setMediaMatches] = useState(false)
  const [media, setMedia] = useState(false)

  let { data: cars, loading } = useFetch(
    `/api/cars/random/${page}`,
    [page],
    true
  )

  useEffect(() => {
    setMedia(window.matchMedia('(max-width: 768px)'))
  }, [])

  const getMediaMatches = () => {
    if (media.matches) {
      setMediaMatches(true)
    } else {
      setMediaMatches(false)
    }
  }

  useEffect(() => {
    getMediaMatches()
    window.addEventListener('resize', getMediaMatches)
  }, [media])

  return (
    <section className="py-10">
      <Container>
        <h2 className="text-2xl font-bold mb-3.5 capitalize">Random cars</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          {mediaMatches
            ? cars
                ?.slice(0, 6)
                .map(car => <SmallCard key={car._id} car={car} />)
            : cars?.map(car => <SmallCard key={car._id} car={car} />)}
          {loading &&
            !cars &&
            loadCars.map((_, i) => <SmallCardLoad key={i} />)}
        </div>
        {cars && (
          <div className="flex justify-center pt-4 gap-7">
            <button
              aria-label="Slide left"
              onClick={() => {
                setPage(prev => (prev === 2 ? prev - 1 : prev + 1))
              }}
              className="hover:text-gray-700"
            >
              <FontAwesomeIcon className="text-4xl" icon={faAngleLeft} />
            </button>
            <button
              aria-label="Slide right"
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
