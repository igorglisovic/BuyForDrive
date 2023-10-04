import { useLoadingBarContext } from '@app/store/loading-bar'
import { useEffect, useRef, useState } from 'react'

const Select = ({
  defaultValue = null,
  placeholder,
  options,
  type,
  disabled = false,
  label,
  updateFunction,
  lastValue,
  tabIndex,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [value, setValue] = useState('')
  const [filteredOptions, setFilteredOptions] = useState([])
  const [highlightedOption, setHighlightedOption] = useState()
  const [initialRender, setInitialRender] = useState(true)
  const [isLoadingBarIncreased, setIsLoadingBarIncreased] = useState(false)
  const [isLoadingBarDecreased, setIsLoadingBarDecreased] = useState(false)

  const selectRef = useRef(null)
  const containerRef = useRef(null)

  const { increaseLoadingBar, decreaseLoadingBar } = useLoadingBarContext()

  const filterSelectOptions = searchText => {
    const regex = new RegExp(searchText, 'i')
    return options.filter(
      item => regex.test(item.label) || regex.test(item._id)
    )
  }

  useEffect(() => {
    const handler = e => {
      switch (e.code) {
        case 'ArrowUp':
        case 'ArrowDown':
          let newValue
          if (filteredOptions.length > 0) {
            newValue =
              e.code === 'ArrowDown'
                ? highlightedOption + 1
                : highlightedOption - 1
            if (newValue >= 0 && newValue < filteredOptions.length) {
              setHighlightedOption(newValue)
              return
            }
          } else {
            newValue =
              e.code === 'ArrowDown'
                ? highlightedOption + 1
                : highlightedOption - 1
            if (newValue >= 0 && newValue < options?.length) {
              setHighlightedOption(newValue)
            }
          }
          break
        case 'Enter':
          if (highlightedOption !== -1) {
            if (filteredOptions.length) {
              setValue(filteredOptions[highlightedOption].label)
              updateFunction(filteredOptions[highlightedOption])
              setIsOpened(false)
              return
            }
            setValue(options[highlightedOption]?.label)
            updateFunction(options[highlightedOption])
            setIsOpened(false)
            return
          }
          break
        case 'Escape':
          setIsOpened(false)
          break
        case 'Tab':
          setIsOpened(false)
          break
      }
    }
    containerRef.current?.addEventListener('keydown', handler)

    return () => {
      containerRef.current?.removeEventListener('keydown', handler)
    }
  }, [highlightedOption, options, filteredOptions])

  useEffect(() => {
    if (isOpened) setHighlightedOption(-1)
  }, [isOpened])

  useEffect(() => {
    const handleDocumentClick = event => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpened(false)
        if (lastValue && options) {
          setValue(lastValue.label)
        }
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [lastValue])

  useEffect(() => {
    if (!lastValue) {
      setValue('')
    }
  }, [lastValue])

  useEffect(() => {
    if (defaultValue) {
      // console.log('default value>>> ', defaultValue)
      setValue(defaultValue?.label)
      updateFunction(defaultValue)
    }
  }, [defaultValue])

  // Track if current input value exists in fetched options
  useEffect(() => {
    const optionLabels = options?.map(option => option.label) || []

    // If input value is included in an options
    if (!optionLabels.includes(value) && value) {
      setValue('')

      if (updateFunction) {
        updateFunction(null)
      }
    }
  }, [options])

  useEffect(() => {
    setHighlightedOption(0)
  }, [filteredOptions])

  // If select is disabled, restart value to ''
  useEffect(() => {
    if (disabled) {
      setValue('')
      setFilteredOptions([])
    }
  }, [disabled])

  // update loading bar
  useEffect(() => {
    if (initialRender) {
      // Skip the code block on the first render
      setInitialRender(false)
      return
    }

    // if input has a value and has an options
    if (lastValue && options) {
      increaseLoadingBar(5)
    }

    // If input value is empty
    if (!lastValue && !disabled) {
      decreaseLoadingBar(5)
    }

    if (!options) {
      console.log('lvalue ', lastValue)
    }

    if (lastValue && !options && !isLoadingBarIncreased) {
      increaseLoadingBar(5)
      setIsLoadingBarIncreased(true)
      setIsLoadingBarDecreased(false)
    }

    if (!lastValue && !options && !isLoadingBarDecreased) {
      decreaseLoadingBar(5)
      setIsLoadingBarDecreased(true)
      setIsLoadingBarIncreased(false)
    }
  }, [lastValue, isLoadingBarDecreased, isLoadingBarIncreased])

  const handleFocus = e => {
    setIsOpened(true)
    if (options) {
      setValue('')
    }
  }

  const handleClick = option => {
    // If input has options
    if (options) {
      updateFunction(option)
      setIsOpened(false)
      setValue(option.label)
    }
  }

  const handleChange = e => {
    setValue(e.target.value)
    if (
      label === 'Mileage' ||
      label === 'Power' ||
      label === 'Displacement' ||
      label === 'Price'
    ) {
      // Remove any non-digit characters
      let numericValue = e.target.value.replace(/\D/g, '')

      // Convert the numeric value to a formatted string using Intl.NumberFormat
      let formattedValue = `${new Intl.NumberFormat('en-US').format(
        numericValue
      )}`

      setValue(formattedValue)
    }

    options?.map(option => {
      if (option.label.toLowerCase() === e.target.value) {
        updateFunction(option)
        setValue(option.label)
      }
    })
  }

  useEffect(() => {
    // If input has no options
    if (!options && value) {
      updateFunction(value)
    }
    // Filter options by value in the input
    if (options) {
      const filteredOptions =
        value || (!value && !isOpened) ? filterSelectOptions(value) : []
      setFilteredOptions(filteredOptions)
    }
  }, [value])

  const handleClearInput = () => {
    setValue('')
    setIsOpened(false)
    updateFunction(null)
  }

  return (
    <div className="flex flex-col relative" ref={selectRef}>
      {label && <label className="text-sm">{label}</label>}
      <input
        className={`select-${type} ${
          options && 'select'
        } bg-white cursor-context-menu}`}
        type="text"
        placeholder={placeholder}
        onFocus={handleFocus}
        disabled={disabled}
        value={value}
        ref={containerRef}
        onChange={handleChange}
        tabIndex={tabIndex}
      />
      {options && (
        <ul
          className={`option absolute overflow-y-scroll max-h-[40vh] z-50 w-full flex-col bg-white ${
            isOpened ? 'flex' : 'hidden'
          }`}
        >
          {options && !value && (
            <li
              className="py-2 px-2 hover:bg-gray-200 cursor-pointer border-b-[1px] border-gray-300"
              onClick={handleClearInput}
              key={label}
            >
              Clear input
            </li>
          )}
          {options &&
            !filteredOptions.length &&
            !value &&
            options.map((option, i) => (
              <li
                key={i}
                className={`py-2 px-2 hover:bg-gray-200 cursor-pointer ${
                  i !== options.length - 1 && 'border-b-[1px] border-gray-300'
                } ${i === highlightedOption && 'bg-gray-200'}`}
                onClick={() => handleClick(option)}
              >
                {option.label}
              </li>
            ))}
          {filteredOptions &&
            filteredOptions.map((option, i) => (
              <li
                key={i}
                className={`py-2 px-2 hover:bg-gray-200 cursor-pointer ${
                  i !== options?.length - 1 && 'border-b-[1px] border-gray-300'
                } ${i === highlightedOption && 'bg-gray-200'}`}
                onClick={() => handleClick(option)}
              >
                {option.label}
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default Select
