import Car from '@public/assets/car.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const BigCard = ({ car, handleEdit, handleDelete }) => {
  const router = useRouter()

  const buttonRef = useRef(null)
  const buttonRef2 = useRef(null)

  const handleClick = e => {
    if (buttonRef.current !== e.target && buttonRef2.current !== e.target) {
      router.push(`/car/${car._id}`)
    }
  }
  return (
    <div
      onClick={handleClick}
      className="relative z-20 flex rounded-[33px] overflow-hidden cursor-pointer shadow-md h-[220px]"
    >
      {handleDelete && handleEdit && (
        <div className="absolute right-4 top-4 flex flex-col gap-2 z-30">
          <button
            onClick={handleEdit}
            ref={buttonRef}
            className="bg-blue-500 hover:bg-blue-300"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            ref={buttonRef2}
            className="bg-blue-500 hover:bg-blue-300"
          >
            Delete
          </button>
        </div>
      )}
      <div className="flex-1 overflow-hidden shadow-md">
        {car?.images?.length ? (
          <Image
            src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${car?.images[0]?.version}/${car?.images[0]?.public_id}`}
            width={220}
            height={150}
            alt=""
            className="object-cover w-full h-full"
          />
        ) : (
          <Image src={Car} className="w-full h-full object-cover" alt="" />
        )}
      </div>
      <article className="flex flex-1 flex-grow-[1.6] flex-col justify-between bg-white px-6 py-5 ">
        <h3 className="font-semibold text-xl md:text-[1.7rem]">
          {car?.brand?.label || car?.brand_id?.label}{' '}
          {car?.model?.label || car?.model_id?.label}
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-[1.4rem]">
            €{car?.price}
          </span>
        </div>
        <div className="flex flex-col gap-[1px] font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex gap-1 items-center">
            <span>
              {car?.reg_year?.label || car?.reg_year_id?.label}.{' '}
              {car?.body_type?.label || car?.body_type_id?.label}
            </span>
            <span> | </span>
            <span>{car?.mileage}km</span>
            <span> | </span>
            <span>{car?.transmission_type?.label}</span>
          </div>
          <div className="flex gap-1 items-center">
            <span>
              {car?.fuel_type?.label}, {car?.displacement}cm<sup>3</sup>
            </span>
            <span> | </span>
            <span>
              {car?.power?.hp}hp ({car?.power?.kw}kW)
            </span>
            <span> | </span>
            <span>{car?.doors?.label} doors</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BigCard
