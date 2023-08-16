import Car from '@public/assets/car.jpg'
import Image from 'next/image'

const SmallCard = ({ model, brand, regYear }) => {
  return (
    <div className="flex flex-col h-fit rounded-[33px] overflow-hidden mb-3">
      <div className="bg-car flex flex-grow bg-cover bg-center">
        <Image src={Car} alt="" />
      </div>
      <article className="flex flex-grow flex-col gap-1 bg-white px-5 py-2.5 ">
        <h3 className="font-medium text-sm">
          {brand} {model}
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-normal text-base">$2.000</span>
          <span className="text-xs">{regYear}.</span>
        </div>
      </article>
    </div>
  )
}

export default SmallCard
