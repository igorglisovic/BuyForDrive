'use client'

import Container from './Container'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import 'swiper/swiper-bundle.min.css'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper'
import Link from 'next/link'
import Image from 'next/image'

import lambo from '../../public/assets/lamborghini.webp'
import bmw from '../../public/assets/bmw.webp'
import porsche from '../../public/assets/porsche.webp'
import bentley from '../../public/assets/bentley.webp'
import ferrari from '../../public/assets/ferrari.webp'
import mercedes from '../../public/assets/mercedes.webp'
import audi from '../../public/assets/audi.webp'
import alfa from '../../public/assets/alfa.webp'
import volkswagen from '../../public/assets/volkswagen.webp'
import peugeot from '../../public/assets/peugeot.webp'
import { useEffect, useState } from 'react'

const BRANDS = [
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e3',
    img: lambo,
    label: 'Lamborghini',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e7',
    img: bmw,
    label: 'BMW',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e5',
    img: porsche,
    label: 'Porsche',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64f9a08e1001e9ff03de189d',
    img: bentley,
    label: 'Bentley',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e4',
    img: ferrari,
    label: 'Ferrari',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e8',
    img: audi,
    label: 'Audi',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64f9a1ee1001e9ff03de18b0',
    img: mercedes,
    label: 'Mercedes',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64f9a0ae1001e9ff03de18a2',
    img: alfa,
    label: 'Alfa Romeo',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1de',
    img: volkswagen,
    label: 'Volkswagen',
  },
  {
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e0',
    img: peugeot,
    label: 'Peugeot',
  },
]

const PopularBrands = () => {
  const [mediaMatches, setMediaMatches] = useState(false)
  const [media, setMedia] = useState(false)

  useEffect(() => {
    setMedia(window.matchMedia('(max-width: 520px)'))
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
    <section className="py-8 bg-white">
      <Container>
        <h2 className="text-2xl font-bold mb-6 capitalize">Popular brands</h2>
        <div className="min-w-full">
          <div className="keen-slider">
            <Swiper
              loop={true}
              spaceBetween={mediaMatches ? 40 : 90}
              slidesPerView={mediaMatches ? 3 : 5}
              modules={[Navigation, Thumbs, Autoplay]}
              className="product-images-slider-thumbs"
              autoplay={{
                delay: 1500,
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
              }}
            >
              {BRANDS?.map((brand, index) => (
                <SwiperSlide key={index}>
                  <Link
                    aria-label={brand.label}
                    href={brand.link}
                    className="hover:saturate-200"
                  >
                    <Image width={198} src={brand.img} alt={brand.label} />
                  </Link>
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
