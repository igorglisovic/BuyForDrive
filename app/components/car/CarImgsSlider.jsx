import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Thumbs } from 'swiper'

import 'swiper/swiper-bundle.min.css'
import 'swiper/css'

const CarSlider = ({ car }) => {
  const [activeThumb, setActiveThumb] = useState()

  return (
    <section>
      <div className="flex justify-between items-end px-6">
        <h1 className="text-3xl font-semibold ">
          {car?.brand.label} {car?.model.label}
        </h1>
        <h3 className="text-2xl font-medium mb-2">€{car?.price}</h3>
      </div>
      <div className="grid lg:grid-rows-slider md:lg:grid-rows-slider2 grid-rows-slider3 gap-[10px] rounded-[30px] bg-gray-50 shadow-xl overflow-hidden">
        <div
          onClick={e => {
            e.stopPropagation()
          }}
          className="min-w-full"
        >
          <Swiper
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Thumbs]}
            grabCursor={true}
            thumbs={{ swiper: activeThumb }}
            className="product-images-slider"
            initialSlide={0}
          >
            {car?.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${image.version}/${image.public_id})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div
          onClick={e => {
            e.stopPropagation()
          }}
          className="min-w-full"
        >
          <Swiper
            onSwiper={setActiveThumb}
            loop={true}
            spaceBetween={10}
            slidesPerView={3}
            modules={[Navigation, Thumbs]}
            className="product-images-slider-thumbs"
            navigation
          >
            {car?.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  style={{
                    backgroundImage: `url(https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${image.version}/${image.public_id})`,
                    backgroundSize: 'cover',
                    backgroundPositionY: 'center',
                    backgroundPositionX: 'center',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={e => {
                    e.stopPropagation()
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default CarSlider
