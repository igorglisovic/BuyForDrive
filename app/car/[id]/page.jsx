'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import CarAdditionalInfo from '@app/components/car/CarAdditionalInfo'
import CarDescription from '@app/components/car/CarDescription'
import CarDetails from '@app/components/car/CarDetails'
import CarInformation from '@app/components/car/CarInformation'
import CarSlider from '@app/components/car/CarImgsSlider'
import useFetch from '@app/hooks/useFetch'
import Image from 'next/image'
import CarsSlider from '@app/components/car/CarsSlider'

const CarPage = ({ params }) => {
  const { data } = useFetch(`/api/car/${params.id}`)
  const car = data && data[0]

  let { data: otherCars } = useFetch(`/api/cars/${car?.creator._id}`, [
    car?.creator._id,
  ])

  let { data: similarCars } = useFetch(
    `/api/searched_cars?sort=default_sorting&page=1&limit=10&body_type_id=${car?.body_type_id}`,
    [car?.body_type_id]
  )

  otherCars = otherCars?.filter(otherCar => otherCar._id !== car._id)
  similarCars = similarCars?.filter(similarCar => similarCar._id !== car._id)

  return (
    <div className="bg-hero-pattern pb-10">
      <Container className="sm:max-w-7xl mx-auto sm:px-16">
        <Breadcrumb
          items={[
            { label: 'Car' },
            {
              label: car?.brand.label,
              link: `/cars/search?sort=default_sorting&page=1&limit=10&brand_id=${car?.brand._id}`,
            },
          ]}
        />
        <div className="grid grid-cols-car gap-8">
          <div className="flex flex-col gap-8 mt-10 col-span-2 md-plus:col-span-1">
            <CarSlider car={car} />
            <CarDetails car={car} />
            <CarInformation car={car} />
            <CarAdditionalInfo car={car} />
            <CarDescription car={car} />
          </div>
          <aside className="w-full md:mt-10 md:block row-start-4 col-span-2 md-form:row-start-1 md-form:col-start-2">
            <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-[30px] shadow-xl">
              <Image
                className="w-[80px] h-[80px] rounded-full"
                width={80}
                height={80}
                alt="avatar"
                src={car?.creator.image}
              />
              <span className="text-lg">{car?.creator.username}</span>
              <button className="bg-btn-2 py-2 px-8 rounded-full font-semibold">
                Check profile
              </button>
            </div>
          </aside>
          <div className="flex flex-col col-span-2">
            <CarsSlider cars={otherCars} title="Other cars from this seller" />
          </div>
          <div className="flex flex-col col-span-2">
            <CarsSlider cars={similarCars} title="Similar cars" />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CarPage
