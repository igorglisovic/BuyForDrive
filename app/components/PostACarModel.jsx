import { usePostCarContext } from '@app/store/post-car'
import Radio from './Radio'
import useFetch from '@app/hooks/useFetch'
import { useEffect } from 'react'
import { useSearchContext } from '@app/store/search-car'

const PostACarModel = () => {
  const { modelDetails } = usePostCarContext()
  const { fuelType, updateFuelType } = useSearchContext()

  const { data: doors } = useFetch('/api/doors', [], true)
  const { data: bodyTypes } = useFetch('/api/body_type', [], true)
  const { data: fuelTypes } = useFetch('/api/fuel_types', [], true)
  const { data: transmissionTypes } = useFetch(
    '/api/transmission_types',
    [],
    true
  )

  useEffect(() => {
    console.log(modelDetails.doors)
  }, [modelDetails])

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">Model details</h2>
      <Radio
        name="doors"
        label="Number of doors"
        options={doors}
        updateFunction={modelDetails.updateDoors}
        lastCheckedValue={modelDetails.doors}
      />
      <Radio
        name="body-type"
        label="Body type"
        options={bodyTypes}
        updateFunction={modelDetails.updateBodyType}
        disabled={modelDetails.doors ? false : true}
        lastCheckedValue={modelDetails.bodyType}
      />
      <Radio
        name="fuel-type"
        label="Fuel type"
        options={fuelTypes}
        updateFunction={modelDetails.updateFuelType}
        disabled={modelDetails.bodyType ? false : true}
        lastCheckedValue={modelDetails.fuelType}
      />
      <Radio
        name="transmission-type"
        label="Transmission type"
        options={transmissionTypes}
        updateFunction={modelDetails.updateTransmissionType}
        disabled={modelDetails.fuelType ? false : true}
        lastCheckedValue={modelDetails.transmissionType}
      />
    </div>
  )
}

export default PostACarModel
