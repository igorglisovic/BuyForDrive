'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import LoadingBar from '@app/components/LoadingBar'
import Container from '@app/components/Container'
import { usePostCarContext } from '@app/store/post-car'
import CarForm from '@app/components/CarForm'
import useFetch from '@app/hooks/useFetch'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

const EditCar = () => {
  const searchParams = useSearchParams()
  const carId = searchParams.get('id')

  const { headerInView } = usePostCarContext()

  let { data: car, loading } = useFetch(`api/car/${carId}`, [carId], carId)

  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect user if not logged in
  useEffect(() => {
    if (!session?.user && status === 'unauthenticated') {
      router.replace('/signin')
    }
  }, [session])

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
              <CarForm type="edit" car={car && car[0]} loading={loading} />
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default EditCar
