import { getSignature, saveToDatabase } from '@app/_actions'
import PostACarBasic from '@app/components/PostACarBasic'
import PostACarFinish from '@app/components/PostACarFinish'
import PostACarModel from '@app/components/PostACarModel'
import UploadImages from '@app/components/UploadImages'
import { useLoadingBarContext } from '@app/store/loading-bar'
import { usePostCarContext } from '@app/store/post-car'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const CarForm = ({ type, car }) => {
  const [goToBasic, setGoToBasic] = useState(false)
  const [goFurther, setGoFurther] = useState(false)
  const [goToFinish, setGoToFinish] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [files, setFiles] = useState([])

  const { basicInfo, modelDetails, pricingDetails, headerInView, resetStates } =
    usePostCarContext()
  const { setLoadingBar, resetLoadingBar, loadingBar, updateLoadingBar } =
    useLoadingBarContext()

  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (car) {
      setFiles(car.images)
    }
  }, [car])

  // Redirect user if not logged in
  useEffect(() => {
    if (!session?.user && status === 'unauthenticated') {
      // router.replace('/signin')
    }
  }, [session])

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

      // If somehow user havent uploaded image and submitted form
      if (!file) return

      console.log('file ', file)

      if (file.preview) {
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

        if (file.lastModifiedDate) {
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
      } else {
        imagesArray.push(file)
      }
    }

    console.log('imagesArray ', imagesArray)

    try {
      const res = await fetch(
        type === 'edit' ? `/api/car/${car?._id}` : '/api/cars/new',
        {
          method: type === 'edit' ? 'PATCH' : 'POST',
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
        }
      )
      if (res.ok) {
        if (type === 'edit') {
          router.push('/profile')
        }

        if (type === 'post') {
          router.push('/')
        }

        resetStates()
      }
    } catch (error) {
      console.log(error)
    } finally {
      updateLoadingBar(0)
      setSubmitting(false)
    }
  }

  return (
    <form
      action={action}
      onKeyDown={handleKeyDown}
      className="flex flex-col gap-8"
    >
      {type === 'post' && (
        <>
          {type === 'post' && (
            <h1 className="text-2xl font-bold text-center uppercase">
              Post a car
            </h1>
          )}
          {type === 'edit' && (
            <h1 className="text-2xl font-bold text-center uppercase">
              Edit your car
            </h1>
          )}
          <UploadImages setFiles={setFiles} files={files} />
          {goToBasic && (
            <PostACarBasic setGoFurther={setGoFurther} type={type} />
          )}
          {goFurther && (
            <PostACarModel setGoToFinish={setGoToFinish} type={type} />
          )}
          {goToFinish && <PostACarFinish type={type} />}
          {goFurther && goToFinish && goToBasic && (
            <button
              //   disabled={submitting || loadingBar !== 100}
              type="submit"
              className="py-1 px-8 hover:bg-gray-200 disabled:hover:bg-gray-100 rounded-full self-center font-semibold bg-btn-2"
            >
              Post a car
            </button>
          )}
        </>
      )}
      {type === 'edit' && (
        <>
          <UploadImages
            setFiles={setFiles}
            files={files}
            carImages={car && car.images}
          />
          <PostACarBasic car={car} setGoFurther={setGoFurther} type={type} />
          <PostACarModel car={car} setGoToFinish={setGoToFinish} type={type} />
          <PostACarFinish car={car} type={type} />
          <button
            disabled={submitting || loadingBar !== 100}
            type="submit"
            className="py-1 px-8 hover:bg-gray-200 disabled:hover:bg-gray-100 rounded-full self-center font-semibold bg-btn-2"
          >
            Edit Car
          </button>
        </>
      )}
    </form>
  )
}

export default CarForm
