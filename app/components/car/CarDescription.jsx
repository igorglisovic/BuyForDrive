const CarDescription = ({ car }) => {
  return (
    <section className="w-full p-6 bg-white shadow-xl rounded-[30px]">
      <h2 className="mb-4 text-2xl font-semibold">Description</h2>
      <p>{car?.description}</p>
    </section>
  )
}

export default CarDescription
