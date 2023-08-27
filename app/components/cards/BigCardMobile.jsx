import Car from '@public/assets/car.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const BigCardMobile = ({ car }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/car/${car._id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col rounded-[33px] cursor-pointer overflow-hidden shadow-md bg-white"
    >
      <div className="flex">
        <div className="flex max-w-[35%] max-h-[170px] xxs:max-h-[210px] min-h-[85px] min-w-full shadow-md">
          <Image className="object-cover" src={Car} alt="" />
        </div>
      </div>
      <article className="flex flex-col justify-between  px-5 py-2.5">
        <h3 className="font-semibold text-xl md:text-2xl">
          {car.brand.label} {car.model.label}
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-xl">
            €{car?.price}
          </span>
        </div>
      </article>
      <article className="px-5 py-3 pt-0">
        <div className="flex gap-6 font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex flex-col gap-2">
            <span>
              {car.reg_year.label}. {car.body_type.label}
            </span>
            <span>{car.mileage}km</span>
            <span>{car.transmission_type.label}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>
              {car.fuel_type.label}, {car.displacement}cm<sup>3</sup>
            </span>
            <span>
              {car.power?.hp}hp ({car.power?.kw}kW)
            </span>
            <span>{car.doors.label} doors</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BigCardMobile
