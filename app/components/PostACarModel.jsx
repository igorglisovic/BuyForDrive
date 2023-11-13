import { usePostCarContext } from '@app/store/post-car'
import Radio from './Radio'
import useFetch from '@app/hooks/useFetch'
import { useEffect, useState } from 'react'
import { useSearchContext } from '@app/store/search-car'
import Select from './Select'
import Image from 'next/image'
import steeringLeft from '../../public/assets/steering-left.jpg'
import steeringRight from '../../public/assets/steering-right.jpg'
import { useLoadingBarContext } from '@app/store/loading-bar'

const PostACarModel = ({ setGoToFinish }) => {
  const [isSelected, setIsSelected] = useState(false)
  const { modelDetails } = usePostCarContext()
  const { increaseLoadingBar, loadingBar } = useLoadingBarContext()

  const { data: doors } = useFetch('/api/doors', [], true)
  const { data: bodyTypes } = useFetch('/api/body_type', [], true)
  const { data: fuelTypes } = useFetch('/api/fuel_types', [], true)
  const { data: transmissionTypes } = useFetch(
    '/api/transmission_types',
    [],
    true
  )
  const { data: seats } = useFetch('/api/seats')
  const { data: drivetrain } = useFetch('/api/drivetrain')
  const { data: colors } = useFetch('/api/colors')
  const { data: airConditioning } = useFetch('/api/air_conditioning')

  const handleChange = e => {
    setIsSelected(true)
    modelDetails.updateSteeringSide(e.target.value)
  }

  useEffect(() => {
    if (isSelected) {
      increaseLoadingBar(5)
    }
  }, [isSelected])

  const handleGoToFinish = () => {
    setGoToFinish(true)
  }

  return (
    <div className="flex flex-col gap-3 border-t-[1px] pt-4 border-gray-400">
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
      <div className="flex gap-5">
        <Select
          placeholder="Power (hp)"
          type="half"
          label="Power"
          updateFunction={modelDetails.updatePower}
          disabled={modelDetails.transmissionType ? false : true}
          lastValue={modelDetails.power}
        />
        <Select
          placeholder="Displacement (cc)"
          type="half"
          label="Displacement"
          updateFunction={modelDetails.updateDisplacement}
          disabled={modelDetails.power ? false : true}
          lastValue={modelDetails.displacement}
        />
      </div>
      <Select
        placeholder="Number of seats"
        type="full"
        label="Number of seats"
        options={seats}
        updateFunction={modelDetails.updateSeats}
        disabled={modelDetails.displacement ? false : true}
        lastValue={modelDetails.seats}
      />
      <div>
        <label>Steering wheel side</label>
        <div className="flex">
          <label
            className={`radio-img text-center w-full cursor-pointer border-white border-r-[1px] rounded-l-[20px] overflow-hidden ${
              modelDetails.steeringSide === 'left' && 'brightness-200'
            } ${modelDetails.seats && 'hover:brightness-200'}`}
            htmlFor="steering-left"
          >
            <Image alt="car interior" src={steeringLeft} />
          </label>
          <input
            className="opacity-0 absolute z-[-1]"
            name="steering-side"
            id="steering-left"
            type="radio"
            value="left"
            onChange={handleChange}
            disabled={modelDetails.seats ? false : true}
          />
          <label
            className={`focus:brightness-200 text-center w-full cursor-pointer border-white rounded-r-[20px] overflow-hidden ${
              modelDetails.steeringSide === 'right' && 'brightness-200'
            } ${modelDetails.seats && 'hover:brightness-200'}`}
            htmlFor="steering-right"
          >
            <Image alt="car interior" src={steeringRight} />
          </label>
          <input
            className="opacity-0 absolute z-[-1]"
            name="steering-side"
            id="steering-right"
            type="radio"
            value="right"
            onChange={handleChange}
            disabled={modelDetails.seats ? false : true}
          />
        </div>
      </div>
      <Radio
        name="drivetrain"
        label="Drivetrain"
        options={drivetrain}
        updateFunction={modelDetails.updateDrivetrain}
        disabled={modelDetails.steeringSide ? false : true}
        lastCheckedValue={modelDetails.drivetrain}
      />
      <Select
        placeholder="Exterior color"
        type="full"
        label="Exterior color"
        options={colors}
        updateFunction={modelDetails.updateColor}
        disabled={modelDetails.drivetrain ? false : true}
        lastValue={modelDetails.color}
      />
      <Radio
        name="air-conditioning"
        label="Air conditioning"
        options={airConditioning}
        updateFunction={modelDetails.updateAirConditioning}
        disabled={modelDetails.color ? false : true}
        lastCheckedValue={modelDetails.airConditioning}
      />
      <button
        type="button"
        disabled={
          modelDetails.airConditioning &&
          modelDetails.color &&
          loadingBar === 85
            ? false
            : true
        }
        className="bg-gray-300 mt-4 py-1 rounded-full self-center px-5 font-semibold"
        onClick={handleGoToFinish}
      >
        Go further
      </button>
    </div>
  )
}

export default PostACarModel
