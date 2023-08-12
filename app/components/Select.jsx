import { useState } from 'react'

const Select = ({ defaultValue, options, type, disabled = false }) => {
  const [isOpened, setIsOpened] = useState(false)

  const handleFocus = e => {
    setIsOpened(true)
    e.target.placeholder = ''
  }

  const handleBlur = e => {
    setIsOpened(false)
    e.target.placeholder = defaultValue
  }

  return (
    <div className="flex flex-col relative">
      <input
        className={`select-${type} bg-white cursor-context-menu}`}
        type="text"
        placeholder={defaultValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
      />
      <ul
        className={`option absolute z-50 w-full flex-col bg-white ${
          isOpened ? 'flex' : 'hidden'
        }`}
      >
        {options.map((option, i) => (
          <li
            className={`py-2 px-2 hover:bg-gray-200 cursor-pointer ${
              i !== options.length - 1 && 'border-b-1'
            }`}
            key={option}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Select
