import { usePostCarContext } from '@app/store/post-car'
import Radio from './Radio'
import Select from './Select'
import useFetch from '@app/hooks/useFetch'
import { useEffect } from 'react'

const PostACarModel = () => {
  const { modelDetails } = usePostCarContext()

  const { data: doors } = useFetch('/api/doors', [], true)

  const { data: bodyTypes } = useFetch('/api/body_type', [], true)

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
    </div>
  )
}

export default PostACarModel
