import Car from '@public/assets/car.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import Button from '../Button'

const BigCardMobile = ({ car, handleEdit, handleDelete }) => {
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
      className="relative file:flex flex-col rounded-[33px] cursor-pointer overflow-hidden shadow-md bg-white"
    >
      {handleDelete && handleEdit && (
        <div className="absolute right-4 bottom-20 flex flex-col gap-1 z-30">
          <Button
            aria-label="Edit car"
            onClick={handleEdit}
            ref={buttonRef}
            className="!bg-btn-edit !py-1 !pr-3 !pl-10 !text-sm "
          >
            Edit
          </Button>
          <Button
            aria-label="Remove car"
            onClick={handleDelete}
            ref={buttonRef2}
            className="!bg-btn-delete !pr-3 !py-1 !pl-11  !text-sm"
          >
            Remove
          </Button>
        </div>
      )}
      <div className="flex">
        <div className="flex relative pb-[56.25%] overflow-hidden max-h-[170px] xxs:max-h-[210px] min-h-[85px] min-w-full shadow-md">
          {car?.images?.length ? (
            <Image
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload/v${car?.images[0]?.version}/${car?.images[0]?.public_id}`}
              width={220}
              height={150}
              alt={
                (car?.brand_id.label || car?.brand.label) +
                ' ' +
                (car?.model_id.label || car?.model.label)
              }
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={Car}
              className="absolute top-0 left-0 w-full h-full object-cover"
              alt={
                (car?.brand_id.label || car?.brand.label) +
                ' ' +
                (car?.model_id.label || car?.model.label)
              }
            />
          )}
        </div>
      </div>
      <article className="flex flex-col justify-between px-5 py-2.5">
        <h3 className="font-semibold text-xl md:text-2xl">
          {car.brand.label} {car.model.label}
        </h3>
        <div className="flex mt-1 justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-xl">
            €{car?.price}
          </span>
        </div>
      </article>
      <article className="px-5 py-3 pt-0">
        <div className="flex gap-6 font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex flex-col gap-1.5">
            <span>
              {car.reg_year.label}. {car.body_type.label}
            </span>
            <span>{car.mileage}km</span>
            <span>{car.transmission_type.label}</span>
          </div>
          <div className="flex flex-col gap-1.5">
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
