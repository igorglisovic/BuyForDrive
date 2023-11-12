'use client'

const SmallCardLoad = () => {
  return (
    <div className="loading flex flex-col h-fit rounded-[33px] cursor-normal overflow-hidden shadow-md mb-3">
      <div className="flex flex-grow shadow-md w-full relative pb-[56.25%] overflow-hidden bg-gray-300"></div>
      <article className="flex flex-grow flex-col gap-1 bg-white px-5 py-2.5 ">
        <h3 className="font-medium text-sm bg-gray-200 text-gray-200 w-fit">
          loading loading
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-normal text-base bg-gray-200 text-gray-200">
            loading
          </span>
          <span className="text-xs bg-gray-200 text-gray-200">load.</span>
        </div>
      </article>
    </div>
  )
}

export default SmallCardLoad
