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
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import moment from 'moment/moment'
import { useRouter } from 'next/navigation'
import LoadingSpinner from '@app/components/ui/LoadingSpinner'

const CarPage = ({ params }) => {
  const { data, loading } = useFetch(`/api/car/${params.id}`)
  const car = data && data[0]

  const router = useRouter()

  const { data: session } = useSession()

  const date = car?.createdAt ? moment(car?.createdAt) : ''
  const relativeTime = car?.createdAt && date.fromNow()

  let { data: otherCars } = useFetch(
    `/api/cars/${car?.creator._id}`,
    [car?.creator._id],
    car?.creator._id
  )

  let { data: similarCars } = useFetch(
    `/api/searched_cars?sort=default_sorting&page=1&limit=10&body_type_id=${car?.body_type_id}`,
    [car?.body_type_id],
    car?.body_type_id
  )

  otherCars = otherCars?.filter(otherCar => otherCar._id !== car._id)
  similarCars = similarCars?.filter(similarCar => similarCar._id !== car._id)

  const handleDelete = async () => {
    const hasConfirmed = confirm('Are you sure you want to delete this car?')

    if (hasConfirmed) {
      console.log(car)
      try {
        const res = await fetch(`/api/car/${car._id.toString()}`, {
          method: 'DELETE',
        })

        if (res.ok) {
          router.push('/profile')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="bg-hero-pattern pb-10">
      <Container className="sm:max-w-7xl mx-auto sm:px-16">
        <div className="flex items-center justify-between xs:mx-0 mx-3">
          <Breadcrumb
            items={[
              { label: 'Car' },
              {
                label: car?.brand.label,
                link: `/cars/search?sort=default_sorting&page=1&limit=10&brand_id=${car?.brand._id}`,
              },
            ]}
          />
          <span className="text-sm mt-2">Posted: {relativeTime}</span>
        </div>
        {!loading ? (
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
                {car?.creator.image && (
                  <Image
                    className="w-[80px] h-[80px] rounded-full"
                    width={80}
                    height={80}
                    alt="avatar"
                    src={car.creator.image}
                  />
                )}
                <span className="text-lg capitalize">
                  {car?.creator.username}
                </span>
                {session?.user.id === car?.creator._id && (
                  <>
                    <div className="flex flex-col gap-0 items-center">
                      <Link
                        className="underline hover:text-gray-500"
                        href={`/edit-car?id=${car?._id}`}
                      >
                        Edit Car
                      </Link>
                      <button
                        className="underline text-red-500 hover:text-red-400"
                        onClick={handleDelete}
                      >
                        Remove Car
                      </button>
                    </div>
                    <button className="bg-btn-2 hover:bg-gray-200 py-2 px-8 rounded-full font-semibold">
                      <Link href="/profile">Check dealer</Link>
                    </button>
                  </>
                )}
                {session?.user.id !== car?.creator._id && (
                  <button className="bg-btn-2 hover:bg-gray-200 py-2 px-8 rounded-full font-semibold">
                    <Link
                      href={`/profile/${car?.creator._id}?name=${car?.creator.username}`}
                    >
                      Check profile
                    </Link>
                  </button>
                )}
              </div>
            </aside>
            <div className="flex flex-col col-span-2">
              {otherCars && (
                <CarsSlider
                  cars={otherCars}
                  title="Other cars from this seller"
                />
              )}
            </div>
            <div className="flex flex-col col-span-2">
              <CarsSlider cars={similarCars} title="Similar cars" />
            </div>
          </div>
        ) : (
          <div className="h-[700px] mt-10 flex justify-center">
            <LoadingSpinner />
          </div>
        )}
      </Container>
    </div>
  )
}

export default CarPage
