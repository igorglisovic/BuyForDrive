import { useEffect, useState } from 'react'
import BigCard from './cards/BigCard'
import BigCardLoad from './cards/BigCardLoad'
import BigCardMobile from './cards/BigCardMobile'
import BigCardMobileLoad from './cards/BigCardMobileLoad'
import Image from 'next/image'

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
  console.log(data)

  const [mediaMatches, setMediaMatches] = useState(false)
  const [media, setMedia] = useState(false)

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
      <Image
        className={`rounded-full md:m-0 m-auto md:w-[150px] md:h-[150px] w-[120px] h-[120px]`}
        width={150}
        height={150}
        alt="avatar"
        src={image ? image : ''}
      />
      <h1 className="md:text-left text-center mt-4">
        <span className="md:text-4xl text-3xl font-medium capitalize">
          {name} Profile
        </span>
      </h1>
      <p className="md:text-left text-center md:text-xl text-md">{desc}</p>
      <div className="flex flex-col gap-6 mt-10 base-plus:mx-40 base:mx-20 md-plus:mx-10">
        <h2 className="md:text-3xl text-2xl font-semibold text-center">
          My Cars
        </h2>
        {mediaMatches && !loading
          ? data?.map(car => (
              <BigCardMobile
                key={car._id}
                car={car}
                handleEdit={() => handleEdit && handleEdit(car)}
                handleDelete={() => handleDelete && handleDelete(car)}
              />
            ))
          : data?.map(car => (
              <BigCard
                key={car._id}
                car={car}
                handleEdit={
                  handleEdit ? () => handleEdit && handleEdit(car) : false
                }
                handleDelete={
                  handleDelete ? () => handleDelete && handleDelete(car) : false
                }
              />
            ))}
        {loading && loadCarsArray.map((_, i) => <BigCardLoad key={i} />)}
        {loading && loadCarsArray.map((_, i) => <BigCardMobileLoad key={i} />)}
      </div>
    </section>
  )
}

export default Profile
