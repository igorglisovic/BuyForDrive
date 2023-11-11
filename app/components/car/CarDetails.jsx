import {
  FirstRegIcon,
  FuelTypeIcon,
  MileageIcon,
  OwnerIcon,
  PerformanceIcon,
  TransmissionIcon,
} from '../icons/Icons'

const CarDetails = ({ car }) => {
  return (
    <section className="w-full grid grid-cols-2 md:grid-cols-3 gap-4 p-6 sm:p-10 bg-white shadow-xl rounded-[30px]">
      <div className="flex items-center gap-3">
        <MileageIcon />
        <div>
          <p className="text-xs text-gray-500">mileage</p>
          <span className="text-lg font-semibold">{car?.mileage}km</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FirstRegIcon />
        <div>
          <p className="text-xs text-gray-500">first registration</p>
          <span className="text-lg font-semibold">
            {car?.reg_year.label}/{car?.reg_month.ordinal}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <PerformanceIcon />
        <div>
          <p className="text-xs text-gray-500">power</p>
          <span className="text-lg font-semibold">
            {car?.power.hp}hp ({car?.power.kw}kW)
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <TransmissionIcon />
        <div>
          <p className="text-xs text-gray-500">transmission</p>
          <span className="text-lg font-semibold">
            {car?.transmission_type.label}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <OwnerIcon />
        <div>
          <p className="text-xs text-gray-500">owner</p>
          <span className="text-lg font-semibold">{car?.owners.label}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <FuelTypeIcon />
        <div>
          <p className="text-xs text-gray-500">fuel type</p>
          <span className="text-lg font-semibold">{car?.fuel_type.label}</span>
        </div>
      </div>
    </section>
  )
}

export default CarDetails
