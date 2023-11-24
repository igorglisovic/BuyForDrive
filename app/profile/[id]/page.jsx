'use client'

import Container from '@app/components/Container'
import Profile from '@app/components/Profile'
import useFetch from '@app/hooks/useFetch'
import { useSearchParams } from 'next/navigation'

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
            image={cars && cars[0].creator.image}
          />
        </div>
      </Container>
    </div>
  )
}

export default page
