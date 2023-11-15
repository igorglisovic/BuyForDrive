'use client'

import Container from '@app/components/Container'
import Profile from '@app/components/Profile'
import useFetch from '@app/hooks/useFetch'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

const page = () => {
  const [filteredCars, setFilteredCars] = useState([])

  const { data: session } = useSession()

  let { data: cars, loading } = useFetch(
    `/api/cars/${session?.user.id}`,
    [session?.user.id],
    session?.user.id
  )

  const handleEdit = post => {
    router.push(`/edit-car?id=${post._id}`)
  }

  const handleDelete = async car => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?')

    if (hasConfirmed) {
      try {
        await fetch(`/api/car/${car._id.toString()}`, {
          method: 'DELETE',
        })

        const filteredPosts = cars.filter(p => p._id !== car._id)

        setFilteredCars(filteredPosts)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className="py-10">
      <Container>
        <div>
          <Profile
            name="My"
            desc="Welcome to your personalazed profile page"
            data={filteredCars.length ? filteredCars : cars}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            loading={loading}
          />
        </div>
      </Container>
    </div>
  )
}

export default page
