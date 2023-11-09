'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import SearchedCars from '@app/components/SearchedCars'
import useFetch from '@app/hooks/useFetch'
import { useEffect, useState } from 'react'

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
  // Based on current url, make api url and make an array of params

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

    console.log('urlwith ', paramsArrayValue)
    setApiUrl(url)
    setParamsArray(paramsArrayValue)
  }, [searchParams])

  // Fetch cars based on api url every time if url changed
  const { data: searchedCars, loading } = useFetch(apiUrl, [apiUrl])
  const { data: countCars } = useFetch(urlForCount, [urlForCount])

  return (
    <>
      <section className="bg-hero-pattern pb-2 shadow-lg">
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
      />
    </>
  )
}

export default page
