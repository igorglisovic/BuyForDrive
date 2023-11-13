'use client'

import { getSignature, saveToDatabase } from '@app/_actions'
import Container from '@app/components/Container'
import LoadingBar from '@app/components/LoadingBar'
import PostACarBasic from '@app/components/PostACarBasic'
import PostACarFinish from '@app/components/PostACarFinish'
import PostACarModel from '@app/components/PostACarModel'
import UploadImages from '@app/components/UploadImages'
import { useLoadingBarContext } from '@app/store/loading-bar'
import { usePostCarContext } from '@app/store/post-car'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const SellACar = () => {
  const [goToBasic, setGoToBasic] = useState(false)
  const [goFurther, setGoFurther] = useState(false)
  const [goToFinish, setGoToFinish] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState([])

  const { basicInfo, modelDetails, pricingDetails, headerInView, resetStates } =
    usePostCarContext()
  const { setLoadingBar, resetLoadingBar, loadingBar } = useLoadingBarContext()

  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect user if not logged in
  useEffect(() => {
    if (!session?.user && status === 'unauthenticated') {
      // router.replace('/signin')
    }
  }, [session])

  useEffect(() => {
    if (
      !basicInfo.brand ||
      !basicInfo.model ||
      !basicInfo.regMonth ||
      !basicInfo.regYear ||
      !basicInfo.mileage
    ) {
      // setGoFurther(false)
      // setGoToFinish(false)
    }
  }, [
    basicInfo.brand,
    basicInfo.model,
    basicInfo.regMonth,
    basicInfo.regYear,
    basicInfo.mileage,
  ])

  useEffect(() => {
    if (files.length) {
      setGoToBasic(true)
    }
  }, [files])

  console.log(loadingBar)

  useEffect(() => {
    resetLoadingBar()
  }, [])

  // Remove form submitting on clicking 'Enter' hotkey
  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      e.preventDefault()
    }
  }

  async function action() {
    setSubmitting(true)

    let imagesArray = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!file) return

      // get a signature using server action
      const { timestamp, signature } = await getSignature()

      // upload to cloudinary using the signature
      const formData = new FormData()

      formData.append('file', file)
      formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)

      const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL
      const data = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      }).then(res => res.json())

      imagesArray.push({
        public_id: data.public_id,
        version: data.version.toString(),
      })

      // write to database using server actions
      await saveToDatabase({
        version: data?.version,
        signature: data?.signature,
        public_id: data?.public_id,
      })
    }

    try {
      const res = await fetch('/api/cars/new', {
        method: 'POST',
        body: JSON.stringify({
          images: imagesArray,
          userId: session?.user.id,
          brandId: basicInfo.brand._id,
          modelId: basicInfo.model._id,
          regYearId: basicInfo.regYear._id,
          regMonthId: basicInfo.regMonth._id,
          mileage: basicInfo.mileage,
          doorsId: modelDetails.doors._id,
          bodyTypeId: modelDetails.bodyType._id,
          fuelTypeId: modelDetails.fuelType._id,
          transmissionTypeId: modelDetails.transmissionType._id,
          power: modelDetails.power,
          displacement: modelDetails.displacement,
          seatsId: modelDetails.seats._id,
          steeringSide: modelDetails.steeringSide,
          drivetrainId: modelDetails.drivetrain._id,
          colorId: modelDetails.color._id,
          airConditioningId: modelDetails.airConditioning._id,
          price: pricingDetails.price,
          fixedPrice: pricingDetails.fixedPrice,
          ownersId: pricingDetails.owners._id,
          description: pricingDetails.description,
        }),
      })
      if (res.ok) {
        router.push('/')
        resetStates()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingBar(60)
      setSubmitting(false)
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
              <form
                action={action}
                onKeyDown={handleKeyDown}
                className="flex flex-col gap-8"
              >
                <UploadImages setFiles={setFiles} files={files} />
                {goToBasic && <PostACarBasic setGoFurther={setGoFurther} />}
                {goFurther && <PostACarModel setGoToFinish={setGoToFinish} />}
                {goToFinish && <PostACarFinish />}
                {goFurther && goToFinish && goToBasic && (
                  <button
                    disabled={submitting || loadingBar !== 100}
                    type="submit"
                    className="py-1 px-8 rounded-full self-center font-semibold bg-btn-2"
                  >
                    Post a car
                  </button>
                )}
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default SellACar
