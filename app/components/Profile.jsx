import { useEffect, useState } from 'react'
import Image from 'next/image'
import SmallCard from './cards/SmallCard'
import SmallCardLoad from './cards/SmallCardLoad'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

const loadCarsArray = [1, 2, 3, 4, 5, 6, 7]

const Profile = ({
  name,
  desc,
  data,
  handleEdit,
  handleDelete,
  loading,
  image,
}) => {
  const [mediaMatches, setMediaMatches] = useState(false)
  const [media, setMedia] = useState(false)

  const router = useRouter()
  const { data: session, status } = useSession()

  // Redirect user if not logged in
  useEffect(() => {
    if (!session?.user && status === 'unauthenticated' && name === 'My') {
      router.replace('/signin')
    }
  }, [session])

  useEffect(() => {
    setMedia(window.matchMedia('(max-width: 520px)'))
  }, [])
  const getMediaMatches = () => {
    if (media.matches) {
      setMediaMatches(true)
    } else {
      setMediaMatches(false)
    }
  }
  useEffect(() => {
    getMediaMatches()
    window.addEventListener('resize', getMediaMatches)
  }, [media])

  return (
    <section className="w-full">
      <div className="bg-white py-5 px-6 shadow-md rounded-[33px]">
        {image && (
          <Image
            className={`rounded-full md:m-0 m-auto md:w-[150px] md:h-[150px] w-[120px] h-[120px]`}
            width={150}
            height={150}
            alt="avatar"
            src={image ? image : null}
          />
        )}
        <h1 className="md:text-left text-center mt-4">
          <span className="md:text-4xl text-3xl font-medium capitalize">
            {name} Profile
          </span>
        </h1>
        <p className="md:text-left text-gray-600 text-center md:text-xl text-md">
          {desc}
        </p>
      </div>
      <div className="flex flex-col gap-6 mt-10 ">
        <h2 className="md:text-3xl text-2xl font-semibold text-left capitalize">
          {handleEdit && handleDelete ? 'My Cars' : `${name} Cars`}
        </h2>
        {!loading && !data.length && name === 'My' ? (
          <>
            <p>You don't have any cars yet.</p>
            <Link aria-label="Sell a car" href="/sellacar">
              <button
                aria-label="Sell a car"
                className="self-end py-1.5 px-8 rounded-3xl bg-gray-300 font-semibold "
              >
                Sell a car
              </button>
            </Link>
          </>
        ) : (
          ''
        )}
        {!loading && !data.length && name !== 'My' ? (
          <p>{name} doens't has any cars yet.</p>
        ) : (
          ''
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-3 gap-3 md:gap-3.5">
          {!loading &&
            data?.map(car => (
              <SmallCard
                key={car._id}
                car={car}
                handleEdit={() => handleEdit && handleEdit(car)}
                handleDelete={() => handleDelete && handleDelete(car)}
              />
            ))}
          {loading && loadCarsArray.map((_, i) => <SmallCardLoad key={i} />)}
        </div>
      </div>
    </section>
  )
}

export default Profile
