const CarAdditionalInfo = ({ car }) => {
  return (
    <section className="w-full p-6 bg-white shadow-xl rounded-[30px]">
      <h2 className="mb-4 text-2xl font-semibold">Additional information</h2>
      <div className="flex flex-col md:flex-row gap-2 md:gap-10">
        <div className="flex flex-col gap-2 grow">
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Drivetrain:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.drivetrain.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Number of doors:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.doors.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Number of seats:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.seats.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Steering wheel side:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium capitalize">
              {car?.steering_side}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 grow">
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Color:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.color.label}
            </span>
          </div>
          <div className="flex w-full items-end border-b-[1px] border-b-gray-400">
            <span className="max-w-[48%] min-w-fit grow text-gray-500">
              Air conditioning:
            </span>
            <span className="max-w-[52%] min-w-fit grow font-medium">
              {car?.air_conditioning.label}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CarAdditionalInfo
