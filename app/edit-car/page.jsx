'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLoadingBarContext } from '@app/store/loading-bar'
import UploadImages from '@app/components/UploadImages'
import PostACarBasic from '@app/components/PostACarBasic'
import PostACarModel from '@app/components/PostACarModel'
import PostACarFinish from '@app/components/PostACarFinish'
import LoadingBar from '@app/components/LoadingBar'
import Container from '@app/components/Container'
import { usePostCarContext } from '@app/store/post-car'
import CarForm from '@app/components/CarForm'
import useFetch from '@app/hooks/useFetch'

const EditCar = () => {
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const searchParams = useSearchParams()
  const carId = searchParams.get('id')
  const { setLoadingBar, resetLoadingBar, loadingBar } = useLoadingBarContext()

  const { basicInfo, modelDetails, pricingDetails, headerInView, resetStates } =
    usePostCarContext()

  let { data: car } = useFetch(`api/car/${carId}`, [carId], carId)

  const router = useRouter()

  useEffect(() => {
    if (car) {
      //   basicInfo.updateBrand(car.brand)
    }

    console.log(car)
  }, [car])

  const updatePrompt = async e => {
    e.preventDefault()

    setSubmitting(true)

    if (!promptId) return alert('Prompt ID not found!')

    try {
      setLoading(true)
      const res = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
      setLoading(false)
    }
  }

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
