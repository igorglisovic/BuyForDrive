import { useEffect, useState } from 'react'
import { usePostCarContext } from '@app/store/post-car'
import useFetch from '@app/hooks/useFetch'
import Select from './Select'

const PostACarBasic = ({ setGoFurther }) => {
  const [modelHasSelected, setModelHasSelected] = useState(false)

  const { basicInfo } = usePostCarContext()

  const { data: brands } = useFetch('/api/brands')
  const { data: models } = useFetch(
    `/api/models/${basicInfo?.brand?._id}`,
    [basicInfo.brand],
    basicInfo.brand
  )
  const { data: regYears } = useFetch('/api/reg_years')
  const { data: regMonths } = useFetch('/api/reg_months')

  useEffect(() => {
    if (basicInfo.model) {
      setModelHasSelected(true)
    }
  }, [basicInfo.model])

  const handleGoFurther = () => {
    setGoFurther(true)
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">Basic infomation</h2>
      <Select
        placeholder="All brands"
        options={brands}
        type="full"
        label="Brand"
        updateFunction={basicInfo.updateBrand}
        lastValue={basicInfo.brand}
      />
      <Select
        placeholder="All models"
        options={models}
        type="full"
        label="Model"
        disabled={basicInfo.brand ? false : true}
        updateFunction={basicInfo.updateModel}
        lastValue={basicInfo.model}
      />
      <div className="flex items-end gap-4">
        <Select
          placeholder="Year"
          options={regYears}
          type="half"
          label="First registration"
          disabled={modelHasSelected && basicInfo.brand ? false : true}
          updateFunction={basicInfo.updateRegYear}
          lastValue={basicInfo.regYear}
        />
        <Select
          placeholder="Month"
          options={regMonths}
          type="half"
          label=""
          disabled={basicInfo.regYear && basicInfo.brand ? false : true}
          updateFunction={basicInfo.updateRegMonth}
          lastValue={basicInfo.regMonth}
        />
      </div>
      <Select
        placeholder="Mileage"
        type="half"
        label="Mileage"
        disabled={basicInfo.regMonth && basicInfo.brand ? false : true}
        updateFunction={basicInfo.updateMileage}
        lastValue={basicInfo.mileage}
      />
      <button
        type="button"
        disabled={basicInfo.mileage && basicInfo.brand ? false : true}
        className="bg-gray-300 mt-4 py-1 rounded-full"
        onClick={handleGoFurther}
      >
        Go further
      </button>
    </div>
  )
}

export default PostACarBasic
