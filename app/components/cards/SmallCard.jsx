'use client'

import Car from '@public/assets/car.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const SmallCard = ({ car }) => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/car/${car._id}`)
  }

  return (
    <div
      onClick={handleClick}
      className="flex flex-col h-fit rounded-[33px] cursor-pointer overflow-hidden shadow-md mb-3"
    >
      <div className="flex flex-grow shadow-md w-full relative pb-[56.25%] overflow-hidden">
        {car?.images?.length ? (
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${car?.images[0]?.version}/${car?.images[0]?.public_id}`}
            width={220}
            height={150}
            alt=""
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            src={Car}
            className="absolute top-0 left-0 w-full h-full object-cover"
            alt=""
          />
        )}
      </div>
      <article className="flex flex-grow flex-col gap-1 bg-white px-5 py-2.5 ">
        <h3 className="font-medium text-sm">
          {car?.brand_id.label || car?.brand.label}{' '}
          {car?.model_id.label || car?.model.label}
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-normal text-base">€{car?.price}</span>
          <span className="text-xs">
            {car?.reg_year_id.label || car?.reg_year.label}.
          </span>
        </div>
      </article>
    </div>
  )
}

export default SmallCard
