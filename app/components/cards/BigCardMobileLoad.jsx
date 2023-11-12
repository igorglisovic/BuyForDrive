const BigCardMobileLoad = () => {
  return (
    <div className="xs:hidden xs:invisible loading flex visible flex-col rounded-[33px] cursor-normal overflow-hidden shadow-md bg-white">
      <div className="flex">
        <div className="flex relative pb-[56.25%] overflow-hidden max-h-[170px] xxs:max-h-[210px] min-h-[85px] min-w-full shadow-md bg-gray-300"></div>
      </div>
      <article className="flex flex-col justify-between px-5 py-2.5">
        <h3 className="font-semibold text-xl md:text-2xl bg-gray-200 w-fit text-gray-200">
          loading loading load..
        </h3>
        <div className="flex mt-1 justify-between items-center">
          <span className="mr-5 font-medium text-base md:text-xl bg-gray-200 text-gray-200">
            loading lo
          </span>
        </div>
      </article>
      <article className="px-5 py-3 pt-0">
        <div className="flex gap-6 font-normal text-[10px] text-xs xl:text-sm">
          <div className="flex flex-col gap-1.5">
            <span className="bg-gray-200 text-gray-200 w-fit">loading loa</span>
            <span className="bg-gray-200 text-gray-200 w-fit">
              loading......
            </span>
            <span className="bg-gray-200 text-gray-200 w-fit">loading....</span>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="bg-gray-200 text-gray-200 w-fit">
              loading load
            </span>
            <span className="bg-gray-200 text-gray-200 w-fit">
              loading.......
            </span>
            <span className="bg-gray-200 text-gray-200 w-fit">loading....</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default BigCardMobileLoad
