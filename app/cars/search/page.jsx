'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import SearchedCars from '@app/components/SearchedCars'
import useFetch from '@app/hooks/useFetch'
import useMakeUrl from '@app/hooks/useMakeUrl'

const page = ({ searchParams }) => {
  const paramsArray = Object.keys(searchParams).map(key => ({
    name: key,
    value: searchParams[key],
  }))

  const { url } = useMakeUrl('/api/searched_cars?', paramsArray)
  const { data: searchedCars } = useFetch(url)

  return (
    <>
      <section className="bg-hero-pattern pb-2 shadow-lg">
        <Container>
          <div className="flex flex-col gap-16 justify-between">
            <Breadcrumb />
            <p className="self-end font-medium">
              <span className="font-semibold">{searchedCars?.length}</span>{' '}
              offers match your criteria
            </p>
          </div>
        </Container>
      </section>
      <SearchedCars paramsArray={paramsArray} searchedCars={searchedCars} />
    </>
  )
}

export default page
