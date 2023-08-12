import { useRef, useState } from 'react'
import Select from './Select'
import Button from './Button'

const SearchForm = () => {
  const [selectValue, setSelectValue] = useState('All brands')
  const [selectOpened, setSelectOpened] = useState(false)

  const ref = useRef()
  const selectRef = useRef()

  const handleFocus = () => {
    console.log('Focus')
    setSelectOpened(true)
    ref.current.focus()
  }

  const handleBlur = () => {
    setSelectOpened(false)
  }

  const handleChange = () => {
    // setSelectOpened(false)
  }

  const handleInputFocus = () => {
    setSelectOpened(true)
  }

  return (
    <form className="flex gap-4">
      <div className="flex flex-col gap-7">
        <div className="relative">
          <Select
            defaultValue="All brands"
            options={['BMW', 'Audi', 'Mercedes']}
            type="full"
          />
        </div>
        <div className="flex gap-2">
          <Select
            defaultValue="Year from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
        <div className="flex gap-2">
          <Select
            defaultValue="Km from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <Select
          defaultValue="All models"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
          disabled={true}
        />
        <Select
          defaultValue="Body types"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
        />
        <div className="flex gap-2">
          <Select
            defaultValue="Power from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex gap-2">
          <Select
            defaultValue="Price from"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
          <Select
            defaultValue="To"
            options={['BMW', 'Audi', 'Mercedes']}
            type="half"
          />
        </div>
        <Select
          defaultValue="Fuel types"
          options={['BMW', 'Audi', 'Mercedes']}
          type="full"
        />
        <Button className="">4.751 offers</Button>
      </div>
    </form>
  )
}

export default SearchForm
