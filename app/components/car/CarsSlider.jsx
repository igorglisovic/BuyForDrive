import SmallCard from '../cards/SmallCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import 'swiper/swiper-bundle.min.css'
import 'swiper/css'
import { useEffect, useState } from 'react'

const CarsSlider = ({ title, cars }) => {
  const [mediaMatches, setMediaMatches] = useState(false)
  const [media, setMedia] = useState(false)

  useEffect(() => {
    setMedia(window.matchMedia('(max-width: 520px)'))
  }, [])

  const getMediaMatches = () => {
    if (media.matches) {
      setMediaMatches(true)
    } else {
      // setMediaMatches(true)
      setMediaMatches(false)
    }
  }
  useEffect(() => {
    getMediaMatches()
    window.addEventListener('resize', getMediaMatches)
  }, [media])

  return (
    <section className="w-full p-6 bg-white shadow-xl rounded-[30px]">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="min-w-full">
        <div className="keen-slider">
          <Swiper
            // loop={true}
            spaceBetween={10}
            slidesPerView={mediaMatches ? 2 : 4}
            modules={[Navigation, Thumbs]}
            className="product-images-slider-thumbs"
            navigation
          >
            {cars?.map((car, index) => (
              <SwiperSlide key={index}>
                <SmallCard car={car} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default CarsSlider
