import { useEffect, useState } from 'react'
import Select from './Select'
import { usePostCarContext } from '@app/store/post-car'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const PostACarBasic = () => {
  const [brands, setBrands] = useState([])
  const [models, setModels] = useState([])
  const [regYears, setRegYears] = useState([])

  const [submitting, setSubmitting] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  const { data: carValues } = usePostCarContext()

  const handleSubmit = async e => {
    e.preventDefault()
    console.log('submitting')

    try {
      setSubmitting(true)

      const res = await fetch('/api/cars/new', {
        method: 'POST',
        body: JSON.stringify({
          userId: session?.user.id,
          brandId: carValues.brand._id,
          modelId: carValues.model._id,
          regYearId: carValues.regYear._id,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('/api/brands')
        const data = await res.json()

        setBrands(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBrands()
  }, [])

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const res = await fetch(`/api/models/${carValues.brand._id}`)
        const data = await res.json()

        setModels(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (carValues.brand) {
      fetchModels()
    }
  }, [carValues.brand])

  useEffect(() => {
    const fetchRegYears = async () => {
      try {
        const res = await fetch(`/api/reg_years`)
        const data = await res.json()

        setRegYears(data)
      } catch (error) {
        console.log(error)
      }
    }
    if (carValues.model) {
      fetchRegYears()
    }
  }, [carValues.model])

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">Basic infomation</h2>
      <Select
        defaultValue="All brands"
        options={brands}
        type="full"
        label="Brand"
        updateFunction={carValues.updateBrand}
        lastValue={carValues.brand}
      />
      <Select
        defaultValue="All models"
        options={models}
        type="full"
        label="Model"
        disabled={carValues.brand ? false : true}
        updateFunction={carValues.updateModel}
        lastValue={carValues.model}
      />
      <Select
        defaultValue="Year"
        options={regYears}
        type="full"
        label="First registration"
        disabled={carValues.model ? false : true}
        updateFunction={carValues.updateRegYear}
        lastValue={carValues.regYear}
      />
      {/* <Select
        defaultValue="Mileage"
        options={['BMW', 'Audi', 'Mercedes']}
        type="full"
        label="Mileage"
      /> */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-gray-200 rounded-full"
      >
        Post
      </button>
    </form>
  )
}

export default PostACarBasic
