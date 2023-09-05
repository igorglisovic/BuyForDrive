'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import CarAdditionalInfo from '@app/components/car/CarAdditionalInfo'
import CarDescription from '@app/components/car/CarDescription'
import CarDetails from '@app/components/car/CarDetails'
import CarInformation from '@app/components/car/CarInformation'
import CarSlider from '@app/components/car/CarSlider'
import useFetch from '@app/hooks/useFetch'
import { useSession } from 'next-auth/react'
import Image from 'next/image'

const CarPage = ({ params }) => {
  const { data } = useFetch(`/api/car/${params.id}`)
  const car = data && data[0]

  const { data: session } = useSession()

  console.log(session?.user)

  return (
    <div className="bg-hero-pattern">
      <Container>
        <Breadcrumb />
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="flex flex-col max-w-full md:max-w-[70%] gap-8 mt-10 mb-10">
            <CarSlider car={car} />
            <CarDetails car={car} />
            <CarInformation car={car} />
            <CarAdditionalInfo car={car} />
            <CarDescription car={car} />
          </div>
          <aside className="w-full md:mt-10 md:block">
            <div className="flex flex-col items-center gap-3 bg-white p-6 rounded-[30px] shadow-xl">
              <Image
                className="avatar w-[80px] h-[80px] rounded-full"
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
        </div>
      </Container>
    </div>
  )
}

export default CarPage
