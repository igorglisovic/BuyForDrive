'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import SearchedCars from '@app/components/SearchedCars'
import useFetch from '@app/hooks/useFetch'
import { useSearchContext } from '@app/store/search-car'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const makeUrl = (initialUrl, searchParams = null) => {
  let paramsArray = []
  let url = ''

  if (searchParams) {
    const makeParamsArray = Object.keys(searchParams).map(key => ({
      name: key,
      value: searchParams[key],
    }))

    paramsArray = makeParamsArray
  }

  paramsArray?.forEach(item => {
    if (item?.value) {
      url += `&${item?.name}=${item?.value}`
    }
  })

  // e.g. "/cars/search?" + "sort=...&brand=..."
  url = initialUrl + url?.slice(1)

  return { url, paramsArray }
}

const page = ({ searchParams }) => {
  const [apiUrl, setApiUrl] = useState('')
  const [paramsArray, setParamsArray] = useState([])
  const [urlForCount, setUrlForCount] = useState([])
  const [subHeaderInView, setSubHeaderInView] = useState(true)
  // Based on current url, make api url and make an array of params

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      setSubHeaderInView(true)
    } else {
      setSubHeaderInView(false)
    }
  }, [inView])

  useEffect(() => {
    console.log(subHeaderInView)
  }, [subHeaderInView])

  useEffect(() => {
    const { url, paramsArray: paramsArrayValue } = makeUrl(
      '/api/searched_cars?',
      searchParams
    )

    const urlWithoutPageAndLimit = url
      .split('&')
      .filter(
        param => !param.startsWith('page=') && !param.startsWith('limit=')
      )
      .join('&')

    setUrlForCount(urlWithoutPageAndLimit)

    setApiUrl(url)
    setParamsArray(paramsArrayValue)
  }, [searchParams])

  // Fetch cars based on api url every time if url changed
  const { data: searchedCars, loading } = useFetch(apiUrl, [apiUrl])
  const { data: countCars } = useFetch(urlForCount, [urlForCount])

  const { isFilterMenuOpen } = useSearchContext()

  return (
    <>
      <section
        ref={ref}
        className={`bg-hero-pattern pb-2 shadow-lg ${
          isFilterMenuOpen && 'overflow-hidden fixed z-[-1]'
        }`}
      >
        <Container>
          <div className="flex flex-col gap-16 justify-between">
            <Breadcrumb />
            <p className="self-end font-medium">
              <span className="font-semibold">{countCars?.length}</span> offers
              match your criteria
            </p>
          </div>
        </Container>
      </section>
      <SearchedCars
        paramsArray={paramsArray}
        searchParams={searchParams}
        searchedCars={searchedCars}
        loading={loading}
        url={apiUrl}
        countCars={countCars}
        subHeaderInView={subHeaderInView}
      />
    </>
  )
}

export default page
