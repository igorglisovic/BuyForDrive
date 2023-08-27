import { usePostCarContext } from '@app/store/post-car'
import Select from './Select'
import useFetch from '@app/hooks/useFetch'

const PostACarFinish = () => {
  const { pricingDetails } = usePostCarContext()

  const { data: owners } = useFetch('/api/owners')

  const handleChange = e => {
    pricingDetails.updateFixedPrice(e.target.checked)
  }

  const handleChangeDesc = e => {
    pricingDetails.updateDescription(e.target.value)
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xl font-semibold mb-2">Pricing details</h2>
      <Select
        placeholder="Number of owners"
        options={owners}
        type="full"
        label="Number of owners"
        updateFunction={pricingDetails.updateOwners}
        lastValue={pricingDetails.owners}
      />
      <div className="flex items-center gap-5">
        <Select
          placeholder="Price"
          type="half"
          label="Price"
          disabled={pricingDetails.owners ? false : true}
          updateFunction={pricingDetails.updatePrice}
          lastValue={pricingDetails.price}
        />
        <div>
          <input
            onChange={handleChange}
            id="fixed-price"
            type="checkbox"
            checked={pricingDetails.fixedPrice}
          />
          <label className="ml-1" htmlFor="fixed-price">
            Fixed price
          </label>
        </div>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          cols="30"
          rows="10"
          className="select-full"
          disabled={pricingDetails.price ? false : true}
          onChange={handleChangeDesc}
        ></textarea>
      </div>
    </div>
  )
}

export default PostACarFinish
