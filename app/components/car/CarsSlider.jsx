import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import SmallCard from '../cards/SmallCard'
import { useEffect, useState } from 'react'
import Arrow from '../ui/Arrow'

const CarsSlider = ({ title, cars }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  console.log(cars)

  const sliderOptions = {
    slides: {
      perView: 4,
      spacing: 15,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  }

  const [sliderRef, instanceRef] = useKeenSlider(sliderOptions)

  useEffect(() => {
    instanceRef.current?.update({
      ...sliderOptions,
    })
  }, [instanceRef, sliderOptions])

  return (
    <section className="w-full p-6 bg-white shadow-xl rounded-[30px]">
      <h2 className="mb-4 text-2xl font-semibold">{title}</h2>
      <div className="min-w-full">
        <div ref={sliderRef} className="keen-slider">
          {cars?.map((car, i) => (
            <div key={i} className="keen-slider__slide ">
              <SmallCard car={car} />
            </div>
          ))}
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={e =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                isDisabled={currentSlide === 0}
              />
              <Arrow
                onClick={e =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                isDisabled={
                  currentSlide ===
                  instanceRef.current?.track.details?.slides.length % 4
                }
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default CarsSlider
