'use client'

import Breadcrumb from '@app/components/Breadcrumb'
import Container from '@app/components/Container'
import SearchedCars from '@app/components/SearchedCars'
import useFetch from '@app/hooks/useFetch'
import useMakeUrl from '@app/hooks/useMakeUrl'

const page = ({ searchParams }) => {
  // Based on current url and make api url, and make an array of params
  const { url: apiUrl, paramsArray } = useMakeUrl(
    '/api/searched_cars?',
    null,
    searchParams
  )
  // Fetch cars based on api url every time if url changed
  const { data: searchedCars, loading } = useFetch(apiUrl, [apiUrl])

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
      <SearchedCars
        paramsArray={paramsArray}
        searchParams={searchParams}
        searchedCars={searchedCars}
        loading={loading}
        url={apiUrl}
      />
    </>
  )
}

export default page
