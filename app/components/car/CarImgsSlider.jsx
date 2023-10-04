import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'
import Car from '../../../public/assets/car.jpg'
import Image from 'next/image'
import { useState } from 'react'
import Arrow from '../ui/Arrow'

const CarSlider = ({ car }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  const [sliderRef, instanceRef] = useKeenSlider(
    {
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setLoaded(true)
      },
    },
    [
      // add plugins here
    ]
  )

  console.log(car)

  return (
    <section>
      <div className="flex justify-between items-end">
        <h1 className="text-3xl font-semibold mb-2">
          {car?.brand.label} {car?.model.label}
        </h1>
        <h3 className="text-2xl font-medium mb-2">€{car?.price}</h3>
      </div>
      <div className="flex justify-center relative rounded-[30px] bg-white shadow-xl">
        <div ref={sliderRef} className="keen-slider rounded-[30px]">
          {car?.images.map(image => (
            <div className="flex keen-slider__slide min-w-full">
              <Image
                className="m-auto w-auto h-auto"
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${image.version}/${image.public_id}`}
                width={500}
                height={300}
                alt=""
              />
            </div>
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={e => e.stopPropagation() || instanceRef.current?.prev()}
              isDisabled={currentSlide === 0}
            />
            <Arrow
              onClick={e => e.stopPropagation() || instanceRef.current?.next()}
              isDisabled={
                currentSlide ===
                instanceRef.current.track.details?.slides.length - 1
              }
            />
          </>
        )}
      </div>
    </section>
  )
}

export default CarSlider
