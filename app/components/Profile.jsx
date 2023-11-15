import BigCard from './cards/BigCard'
import BigCardLoad from './cards/BigCardLoad'

const loadCarsArray = [1, 2, 3, 4, 5, 6, 7]

const Profile = ({ name, desc, data, handleEdit, handleDelete, loading }) => {
  console.log(data)

  return (
    <section className="w-full">
      <h1 className="text-left">
        <span className="">{name} Profile</span>
      </h1>
      <p className="text-left">{desc}</p>
      <div className="flex flex-col gap-6 mt-10 mx-40">
        <h2 className="text-3xl font-semibold text-center">My Cars</h2>
        {loading
          ? loadCarsArray.map((car, i) => <BigCardLoad key={i} />)
          : data.map(car => (
              <BigCard
                key={car._id}
                car={car}
                handleEdit={() => handleEdit && handleEdit(car)}
                handleDelete={() => handleDelete && handleDelete(car)}
              />
            ))}
      </div>
    </section>
  )
}

export default Profile
