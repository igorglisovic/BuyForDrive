import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Breadcrumb from './Breadcrumb'
import Container from './Container'
import {
  faCarSide,
  faMotorcycle,
  faTruck,
} from '@fortawesome/free-solid-svg-icons'
import SearchForm from './SearchForm'

const vehicleTypes = [
  { id: 1, active: true, icon: faCarSide },
  { id: 2, active: false, icon: faMotorcycle },
  { id: 3, active: false, icon: faTruck },
]

const Search = () => {
  return (
    <section className="bg-hero-pattern pb-12 shadow-lg">
      <Container>
        <Breadcrumb />
        <div className="mt-6 w-full rounded-5xl shadow-md">
          <div className="px-8 py-0 bg-gradient-light-gray rounded-top-5xl">
            <ul className="flex">
              <li className="text-center font-semibold text-lg leading-5 mr-2.5 py-3.5">
                Vehicle <br /> type
              </li>
              {vehicleTypes.map(item => (
                <li
                  key={item.id}
                  className={`flex items-center text-2xl px-4 hover:bg-white cursor-pointer transition-colors ${
                    item.active && 'bg-active'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-bottom-5xl px-8 py-7">
            <SearchForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Search
