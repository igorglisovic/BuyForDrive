'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import SearchedCars from '@app/components/SearchedCars'
import useFetch from '@app/hooks/useFetch'
import useMakeUrl from '@app/hooks/useMakeUrl'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const page = ({ params, searchParams }) => {
  const paramsArray = Object.keys(searchParams).map(key => ({
    name: key,
    value: searchParams[key],
  }))

  const { url } = useMakeUrl('/api/searched_cars?', paramsArray)
  const { data } = useFetch(url)

  console.log(data)

  return (
    <>
      <section className="bg-hero-pattern pb-2 shadow-lg">
        <Container>
          <div className="flex justify-between min-h-[8rem]">
            <Breadcrumb />
            <p className="self-end font-medium">
              <span className="font-semibold">{data?.length}</span> offers match
              your criteria
            </p>
          </div>
        </Container>
      </section>
      <SearchedCars />
    </>
  )
}

export default page
