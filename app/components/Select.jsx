import { useEffect, useRef, useState } from 'react'

const Select = ({
  defaultValue,
  options,
  type,
  disabled = false,
  label,
  updateFunction,
  lastValue,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [value, setValue] = useState('')

  const selectRef = useRef(null)

  // console.log(lastValue)

  useEffect(() => {
    const handleDocumentClick = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpened(false)
        if (lastValue) {
          setValue(lastValue.label)
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [lastValue])

  // Track if current input value exists in fetched options
  useEffect(() => {
    const optionLabels = options.map(option => option.label)

    if (!optionLabels.includes(value)) {
      setValue('')
      if (updateFunction) updateFunction(null)
    }
  }, [options])

  // If select is disabled, restart value to ''
  useEffect(() => {
    if (disabled) {
      setValue('')
    }
  }, [disabled])

  const handleFocus = e => {
    setIsOpened(true)
    setValue('')
  }

  const handleClick = option => {
    updateFunction(option)
    setIsOpened(false)
    setValue(option.label)
    console.log(option.label)
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  return (
    <div className="flex flex-col relative" ref={selectRef}>
      {label && <label className="text-sm">{label}</label>}
      <input
        className={`option-a select-${type} bg-white cursor-context-menu}`}
        type="text"
        placeholder={defaultValue}
        onFocus={handleFocus}
        disabled={disabled}
        value={value}
        onChange={handleChange}
      />
      <ul
        className={`option-a option absolute z-50 w-full flex-col bg-white ${
          isOpened ? 'flex' : 'hidden'
        }`}
      >
        {options.map((option, i) => (
          <li
            className={`option-a py-2 px-2 hover:bg-gray-200 cursor-pointer ${
              i !== options.length - 1 && 'border-b-1'
            }`}
            key={option._id}
            onClick={() => handleClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
