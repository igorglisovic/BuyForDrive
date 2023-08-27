import { useLoadingBarContext } from '@app/store/loading-bar'
import { usePostCarContext } from '@app/store/post-car'
import { useEffect, useState } from 'react'

const Radio = ({
  options,
  disabled,
  name,
  updateFunction,
  label,
  lastCheckedValue,
}) => {
  const [isSelected, setIsSelected] = useState(0)

  const { modelDetails } = usePostCarContext()

  const { setLoadingBar } = useLoadingBarContext()

  const handleChange = option => {
    setIsSelected(prev => prev + 1)
    updateFunction(option)
  }

  useEffect(() => {
    if (isSelected === 1) {
      setLoadingBar(prev => prev + 10)
    }
  }, [isSelected])

  return (
    <div>
      {label && <label className="text-sm">{label}</label>}
      <div className={`flex flex-wrap`}>
        {options?.map((option, i) => (
          <div
            key={option._id}
            className={`flex border-[1px] border-gray-300 justify-center items-center cursor-pointer overflow-hidden w-[33%] min-w-fit ${
              i === options.length - 1 && 'rounded-r-[20px]'
            } ${i === 0 && 'rounded-l-[20px]'} ${
              options.length === 3 && i === 1 && 'border-x-0'
            } ${options.length === 6 && 'mb-1'} ${
              ((options.length === 6 && i === 1) || i === 4) && 'border-x-0'
            } ${options.length === 6 && i === 2 && 'rounded-r-[20px]'} ${
              options.length === 6 && i === 3 && 'rounded-l-[20px]'
            }`}
          >
            <label
              className={`focus-label py-2 text-center w-full cursor-pointer hover:bg-gray-200 ${
                lastCheckedValue?.label === option.label && 'bg-gray-200'
              } ${disabled && 'bg-gray-100'}`}
              htmlFor={option._id}
            >
              {option.label}
            </label>
            <input
              className="opacity-0 absolute z-[-1]"
              name={name}
              id={option._id}
              type="radio"
              value={option.label}
              onChange={() => handleChange(option)}
              disabled={disabled}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Radio
