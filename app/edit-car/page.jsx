'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLoadingBarContext } from '@app/store/loading-bar'
import LoadingBar from '@app/components/LoadingBar'
import Container from '@app/components/Container'
import { usePostCarContext } from '@app/store/post-car'
import CarForm from '@app/components/CarForm'
import useFetch from '@app/hooks/useFetch'

const EditCar = () => {
  const searchParams = useSearchParams()
  const carId = searchParams.get('id')

  const { headerInView } = usePostCarContext()

  let { data: car } = useFetch(`api/car/${carId}`, [carId], carId)

  return (
    <div>
      <LoadingBar />
      <section>
        <Container>
          <div className="flex justify-center">
            <div
              className={`py-8 px-10 bg-white mb-16 rounded-[30px] w-full md:w-[60%] shadow-lg ${
                !headerInView ? 'mt-28' : 'mt-8'
              }`}
            >
              <CarForm type="edit" car={car && car[0]} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default EditCar
