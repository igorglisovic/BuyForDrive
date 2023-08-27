const CarInformation = ({ car }) => {
  return (
    <section className="w-full p-6 bg-white shadow-xl rounded-[30px]">
      <h2 className="mb-4 text-2xl font-semibold">Car information</h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-10">
        <div className="flex flex-col gap-2 grow">
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Brand:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.brand.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Model:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.model.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              First registration:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.reg_year.label}/{car?.reg_month.ordinal}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Mileage:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.mileage}km
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] grow text-gray-500">Body type:</span>
            <span className="max-w-[52%] grow font-medium">
              {car?.body_type.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] grow text-gray-500">Fuel type:</span>
            <span className="max-w-[52%] grow font-medium">
              {car?.fuel_type.label}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 grow">
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] grow text-gray-500">
              Displacement:
            </span>
            <span className="max-w-[52%] grow font-medium">
              {car?.displacement}cm<sup>3</sup>
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] grow text-gray-500">Power:</span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.power.hp}hp ({car?.power.kw}kW)
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Transmission:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.transmission_type.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Fixed price:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.fixed_price ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarInformation
