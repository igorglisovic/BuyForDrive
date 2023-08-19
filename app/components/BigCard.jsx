import Car from '@public/assets/car.jpg'
import Image from 'next/image'

const BigCard = ({ car }) => {
  return (
    <div className="flex rounded-[33px] overflow-hidden shadow-md min-h-[150px]">
      <div className="flex max-w-[35%] shadow-md">
        <Image className="object-cover" src={Car} alt="" />
      </div>
      <article className="flex flex-grow flex-col justify-between bg-white px-5 py-2.5 ">
        <h3 className="font-semibold text-xl md:text-2xl">
          {car.brand.label} {car.model.label}
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-xl">$2.000</span>
        </div>
        <div className="flex flex-col gap-[1px] font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex gap-1 items-center">
            <span>{car.reg_year.label}. Coupe</span>
            <span> | </span>
            <span>{car.mileage}km</span>
            <span> | </span>
            <span>Automatic</span>
          </div>
          <div className="flex gap-1 items-center">
            <span>Petrol, 4999cm3</span>
            <span> | </span>
            <span>310kW (421hp)</span>
            <span> | </span>
            <span>2/3 doors</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BigCard
