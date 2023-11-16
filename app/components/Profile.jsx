import { useEffect, useState } from 'react'
import BigCard from './cards/BigCard'
import BigCardLoad from './cards/BigCardLoad'
import BigCardMobile from './cards/BigCardMobile'
import BigCardMobileLoad from './cards/BigCardMobileLoad'

const loadCarsArray = [1, 2, 3, 4, 5, 6, 7]

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
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
      // setMediaMatches(true)
      setMediaMatches(false)
    }
  }
  useEffect(() => {
    getMediaMatches()
    window.addEventListener('resize', getMediaMatches)
  }, [media])

  return (
    <section className="w-full">
      <h1 className="text-left">
        <span className="text-2xl font-medium">{name} Profile</span>
      </h1>
      <p className="text-left">{desc}</p>
      <div className="flex flex-col gap-6 mt-10 base-plus:mx-40 base:mx-20 md-plus:mx-10">
        <h2 className="text-3xl font-semibold text-center">My Cars</h2>
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
                handleEdit={() => handleEdit && handleEdit(car)}
                handleDelete={() => handleDelete && handleDelete(car)}
              />
            ))}
        {loading && loadCarsArray.map((_, i) => <BigCardLoad key={i} />)}
        {loading && loadCarsArray.map((_, i) => <BigCardMobileLoad key={i} />)}
      </div>
    </section>
  )
}

export default Profile
