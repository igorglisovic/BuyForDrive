const BigCardLoad = () => {
  return (
    <div className="xs:flex xs:visible invisible hidden loading  rounded-[33px] overflow-hidden cursor-normal shadow-md h-[220px]">
      <div className="flex-1 overflow-hidden shadow-md bg-gray-300"></div>
      <article className="flex flex-1 flex-grow-[1.6] flex-col justify-between bg-white px-6 py-5 ">
        <h3 className="font-semibold text-xl md:text-[1.7rem] bg-gray-200 text-gray-200 w-fit">
          Loadin......
        </h3>
        <div className="flex justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-[1.4rem] bg-gray-200 text-gray-200">
            loadin...
          </span>
        </div>
        <div className="flex flex-col gap-[3px] font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex gap-1 items-center bg-gray-200 text-gray-200 w-fit">
            <span>loading loa</span>
            <span> | </span>
            <span>loading loa</span>
            <span> | </span>
            <span>loading loa</span>
          </div>
          <div className="flex gap-1 items-center bg-gray-200 text-gray-200 w-fit">
            <span>loading load</span>
            <span> | </span>
            <span>loading load</span>
            <span> | </span>
            <span>loading load</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BigCardLoad
