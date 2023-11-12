'use client'

import Container from './Container'
import BigCard from './cards/BigCard'
import FilterCars from './FilterCars'
import { useEffect, useState } from 'react'
import BigCardMobile from './cards/BigCardMobile'
import Link from 'next/link'
import SelectedFilter from './SelectedFilter'
import { useFiltersContext } from '@app/store/filters'
import { useSearchContext } from '@app/store/search-car'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'

const changePageInUrl = (url, newPage) => {
  const urlSearchParams = new URLSearchParams(url)
  urlSearchParams.set('page', newPage)
  return `/cars/search?${urlSearchParams.toString()}`
}

const SearchedCars = ({
  searchedCars,
  searchParams,
  paramsArray,
  url,
  loading,
  countCars,
  subHeaderInView,
}) => {
  const [mediaMatches, setMediaMatches] = useState(false)
  const [media, setMedia] = useState(false)
  const [pagesArray, setPagesArray] = useState([])
  const [currentPage, setCurrentPage] = useState(searchParams?.page)

  useEffect(() => {
    setMedia(window.matchMedia('(max-width: 520px)'))
  }, [])
  // let media = ''
  const router = useRouter()

  let { filtersArray } = useFiltersContext()
  const { sorting, isFilterMenuOpen, updateSorting, updateIsFilterMenuOpen } =
    useSearchContext()

  const handleSortingChange = e => {
    const newSorting = e.target.value
    updateSorting(newSorting)

    const newUrl = `/cars/search?sort=${newSorting}&page=1&${url
      .split('&')
      .slice(2)
      .join('&')}`

    console.log(url.split('&').slice(2))

    router.push(newUrl)
  }

  useEffect(() => {
    updateIsFilterMenuOpen(false)
  }, [paramsArray])

  useEffect(() => {
    setCurrentPage(searchParams?.page)
  }, [searchParams])

  useEffect(() => {
    if (countCars?.length) {
      if (countCars.length <= 10) {
        setPagesArray([])
        return
      }

      const numOfPages =
        countCars.length % 10 === 0
          ? Math.trunc(countCars.length / 10)
          : Math.trunc(countCars.length / 10 + 1)
      let pagesArr = []

      for (let i = 0; i < numOfPages; i++) {
        pagesArr.push({
          number: i + 1,
          title: `${i + 1}`,
          active: +currentPage === i + 1,
        })
      }

      setPagesArray(pagesArr)
    } else {
      setPagesArray([])
    }
  }, [countCars, currentPage])

  const getMediaMatches = () => {
    if (media.matches) {
      setMediaMatches(true)
    } else {
      // setMediaMatches(true)
      setMediaMatches(false)
    }
  }

  useEffect(() => {
    getMediaMatches()
    window.addEventListener('resize', getMediaMatches)
  }, [media])

  const handlePageChange = page => {
    const newPage = changePageInUrl(url.slice(18), page.number)

    router.push(newPage)
  }

  const handleNextPage = () => {
    const newPage = changePageInUrl(url.slice(18), +currentPage + 1)

    router.push(newPage)
  }

  const handlePrevPage = () => {
    const newPage = changePageInUrl(url.slice(18), +currentPage - 1)

    router.push(newPage)
  }

  return (
    <section
      className={`pt-10 pb-16 ${isFilterMenuOpen && 'overflow-hidden fixed'}`}
    >
      <div className="w-full md-plus:hidden md-plus:invisible block visible">
        <Container>
          <div className="flex gap-4 justify-between items-center py-2 px-2 bg-white rounded-xl">
            <button
              onClick={() => {
                updateIsFilterMenuOpen(true)
              }}
              className="flex items-center gap-0.5"
            >
              <span>Filters</span>
              <FontAwesomeIcon style={{ fontSize: '0.7rem' }} icon={faPlus} />
            </button>
            <div className="flex gap-2 p-1 items-center md-plus:hidden md-plus:invisible overflow-x-auto">
              {filtersArray?.map((filter, i) => {
                if (filter._id) {
                  return (
                    <SelectedFilter
                      paramsArray={paramsArray}
                      filter={filter}
                      url={url}
                      key={i}
                    >
                      {filter.label}
                    </SelectedFilter>
                  )
                } else {
                  return (
                    <SelectedFilter
                      paramsArray={paramsArray}
                      filter={filter}
                      url={url}
                      key={i}
                    >
                      {`${filter.text} ${filter.from.label}-${filter.to.label}`}
                    </SelectedFilter>
                  )
                }
              })}
              {!filtersArray?.length && (
                <span className="self-end text-xs text-gray-400">
                  No filters yet.
                </span>
              )}
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex flex-col md-plus:flex-row xl:gap-10 gap-5">
          <FilterCars
            searchParams={searchParams}
            url={url}
            paramsArray={paramsArray}
            subHeaderInView={subHeaderInView}
          />
          <div className="flex flex-1 flex-grow-[3] flex-col gap-6">
            <div className="flex justify-between mt-6">
              <div className="md-plus:flex md-plus:visible hidden invisible gap-2 flex-wrap">
                {filtersArray?.map((filter, i) => {
                  if (filter._id) {
                    return (
                      <SelectedFilter
                        paramsArray={paramsArray}
                        filter={filter}
                        url={url}
                        key={i}
                      >
                        {filter.label}
                      </SelectedFilter>
                    )
                  } else {
                    return (
                      <SelectedFilter
                        paramsArray={paramsArray}
                        filter={filter}
                        url={url}
                        key={i}
                      >
                        {`${filter.text} ${filter.from.label}-${filter.to.label}`}
                      </SelectedFilter>
                    )
                  }
                })}
              </div>
              <div>
                <select
                  className="select-half select !text-sm md-plus:!text-xs xl:!text-sm !min-w-[260px] md-plus:!min-w-[225px] xl:!min-w-[260px] focus:border-[1px] focus:border-black focus:outline-none "
                  onChange={handleSortingChange}
                  value={sorting}
                >
                  <option className="text-sm" value="default_sorting">
                    Default Sorting
                  </option>
                  <option className="text-sm" value="price_asc">
                    Price (Low to High)
                  </option>
                  <option className="text-sm" value="price_desc">
                    Price (High to Low)
                  </option>
                  <option className="text-sm" value="reg_desc">
                    First Registration (Newest First)
                  </option>
                  <option className="text-sm" value="reg_asc">
                    First Registration (Oldest First)
                  </option>
                  <option className="text-sm" value="mileage_asc">
                    Mileage (Low to High)
                  </option>
                  <option className="text-sm" value="mileage_desc">
                    Mileage (High to Low)
                  </option>
                </select>
              </div>
            </div>
            {mediaMatches
              ? searchedCars?.map(car => (
                  <BigCardMobile key={car._id} car={car} />
                ))
              : searchedCars?.map(car => <BigCard key={car._id} car={car} />)}
            {!searchedCars?.length && loading !== true && (
              <div className="flex flex-col gap-3 items-center">
                <h3 className="text-lg font-medium">
                  There are currently no results matching your search criteria.
                  We advise you to advertise the purchase of the vehicle you are
                  looking for.
                </h3>
                <Link href="/sellacar">
                  <button className="self-end py-1.5 px-8 rounded-3xl bg-gray-300 font-semibold ">
                    Sell a car
                  </button>
                </Link>
              </div>
            )}
            <div>
              {pagesArray.length ? (
                <ul className="flex gap-3 items-center md:text-lg md:justify-start justify-center">
                  {pagesArray?.length > 1 && +currentPage !== 1 && (
                    <>
                      <li>
                        <button
                          className="flex items-center"
                          onClick={handlePrevPage}
                        >
                          <FontAwesomeIcon icon={faAngleLeft} />
                        </button>
                      </li>
                      {+currentPage !== 2 && +currentPage !== 3 && <li>...</li>}
                    </>
                  )}
                  {pagesArray?.map((page, i) => {
                    if (+currentPage === 1 && i > 2) {
                      return ''
                    }

                    if (
                      +currentPage === pagesArray.length &&
                      i < currentPage - 3
                    ) {
                      return ''
                    }

                    if (+currentPage === 2 && i > 3) {
                      return ''
                    }

                    if (
                      +currentPage === pagesArray.length - 1 &&
                      i < pagesArray.length - 4
                    ) {
                      return ''
                    }

                    if (
                      +currentPage > 2 &&
                      currentPage < pagesArray.length - 1 &&
                      i < +currentPage - 3
                    ) {
                      return ''
                    }

                    if (
                      +currentPage > 2 &&
                      currentPage < pagesArray.length - 1 &&
                      i > +currentPage + 1
                    ) {
                      return ''
                    }

                    if (
                      +currentPage > 2 &&
                      currentPage < pagesArray.length - 1 &&
                      i < +currentPage - 3
                    ) {
                      return ''
                    }

                    return (
                      <li key={page.title}>
                        <button
                          className={`${
                            page.active
                              ? 'shadow-md cursor-default'
                              : 'bg-transparent shadow-none cursor-pointer'
                          } py-1 px-3 rounded-lg`}
                          onClick={() => {
                            handlePageChange(page)
                          }}
                          style={{ backgroundColor: page.active && '#fff' }}
                          disabled={page.active}
                        >
                          {page.title}
                        </button>
                      </li>
                    )
                  })}
                  {pagesArray?.length > 1 &&
                    +currentPage !== pagesArray.length && (
                      <>
                        {+currentPage !== pagesArray.length - 1 &&
                          +currentPage !== pagesArray.length - 2 && (
                            <li>...</li>
                          )}
                        <li>
                          <button
                            className="flex items-center"
                            onClick={handleNextPage}
                          >
                            <FontAwesomeIcon icon={faAngleRight} />
                          </button>
                        </li>
                      </>
                    )}
                </ul>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default SearchedCars
