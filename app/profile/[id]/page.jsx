'use client'

import Container from '@app/components/Container'
import Profile from '@app/components/Profile'
import useFetch from '@app/hooks/useFetch'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const page = ({ params }) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get('name')

  let { data: cars, loading } = useFetch(
    `/api/cars/${params?.id}`,
    [params?.id],
    params?.id
  )

  return (
    <div className="py-10">
      <Container>
        <div>
          <Profile
            name={`${userName}'s`}
            desc={`Welcome to ${userName}'s personalized profile page.`}
            data={cars}
            loading={loading}
          />
        </div>
      </Container>
    </div>
  )
}

export default page
