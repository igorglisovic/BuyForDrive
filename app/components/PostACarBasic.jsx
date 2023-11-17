import { usePostCarContext } from '@app/store/post-car'
import useFetch from '@app/hooks/useFetch'
import Select from './Select'
import { useLoadingBarContext } from '@app/store/loading-bar'
import { useEffect } from 'react'

const PostACarBasic = ({ setGoFurther, car, type }) => {
  const { basicInfo, modelDetails } = usePostCarContext()
  const { loadingBar } = useLoadingBarContext()

  const { data: brands } = useFetch('/api/brands')
  const { data: models } = useFetch(
    `/api/models/${basicInfo?.brand?._id}`,
    [basicInfo.brand],
    basicInfo.brand
  )
  const { data: regYears } = useFetch('/api/reg_years')
  const { data: regMonths } = useFetch('/api/reg_months')

  const handleGoFurther = () => {
    setGoFurther(true)
  }

  useEffect(() => {
    console.log(
      'model: ',
      basicInfo.model,
      modelDetails.color,
      modelDetails.seats
    )
  }, [basicInfo])

  return (
    <div className="flex flex-col gap-3 border-t-[1px] pt-4 border-gray-400">
      <h2 className="text-xl font-semibold ">Basic infomation</h2>
      <Select
        placeholder="All brands"
        options={brands}
        type="full"
        label="Brand"
        updateFunction={basicInfo.updateBrand}
        lastValue={basicInfo.brand}
        defaultValue={car && car.brand}
      />
      <Select
        placeholder="All models"
        options={models}
        type="full"
        label="Model"
        disabled={basicInfo.brand ? false : true}
        updateFunction={basicInfo.updateModel}
        lastValue={basicInfo.model}
        defaultValue={car && car.model}
      />
      <div className="flex items-end gap-4">
        <Select
          placeholder="Year"
          options={regYears}
          type="half"
          label="First registration"
          disabled={basicInfo.brand && basicInfo.model ? false : true}
          updateFunction={basicInfo.updateRegYear}
          lastValue={basicInfo.regYear}
          defaultValue={car && car.reg_year}
        />
        <Select
          placeholder="Month"
          options={regMonths}
          type="half"
          label=""
          disabled={
            basicInfo.brand && basicInfo.model && basicInfo.regYear
              ? false
              : true
          }
          updateFunction={basicInfo.updateRegMonth}
          lastValue={basicInfo.regMonth}
          defaultValue={car && car.reg_month}
        />
      </div>
      <Select
        placeholder="Mileage"
        type="half"
        label="Mileage"
        disabled={
          basicInfo.brand &&
          basicInfo.model &&
          basicInfo.regYear &&
          basicInfo.regMonth
            ? false
            : true
        }
        updateFunction={basicInfo.updateMileage}
        lastValue={basicInfo.mileage}
        defaultValue={car && car.mileage}
      />
      {type !== 'edit' && (
        <button
          type="button"
          disabled={
            basicInfo.brand &&
            basicInfo.model &&
            basicInfo.regYear &&
            basicInfo.regMonth &&
            basicInfo.mileage &&
            loadingBar === 30
              ? false
              : true
          }
          className="bg-gray-300 mt-4 py-1 px-5 rounded-full self-center font-semibold"
          onClick={handleGoFurther}
        >
          Go further
        </button>
      )}
    </div>
  )
}

export default PostACarBasic
