import Container from './Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import 'swiper/swiper-bundle.min.css'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper'
import Link from 'next/link'
import Image from 'next/image'

import lambo from '../../public/assets/lamborghini.png'
import bmw from '../../public/assets/bmw.webp'
import porsche from '../../public/assets/porsche.webp'
import bentley from '../../public/assets/bentley.jpg'
import ferrari from '../../public/assets/ferrari.png'
import SmallCard from './cards/SmallCard'

const BRANDS = [
  {
    link: '',
    img: lambo,
  },
  {
    link: '',
    img: bmw,
  },
  {
    link: '',
    img: porsche,
  },
  {
    link: '',
    img: bentley,
  },
  {
    link: '',
    img: ferrari,
  },
  {
    link: '',
    img: ferrari,
  },
]

const PopularBrands = () => {
  return (
    <section className="py-10 mb-5 bg-white">
      <Container>
        <div className="min-w-full">
          <div className="keen-slider">
            <Swiper
              //   loop={true}
              spaceBetween={10}
              slidesPerView={5}
              modules={[Navigation, Thumbs, Autoplay]}
              className="product-images-slider-thumbs"
              //   navigation
              autoplay={{
                delay: 1000,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
            >
              {BRANDS?.map((car, index) => (
                <SwiperSlide key={index}>
                  <Image src={car.img} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PopularBrands
