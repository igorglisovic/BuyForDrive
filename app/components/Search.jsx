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
      <Container className="sm:max-w-7xl mx-auto sm:px-16">
        <div className="flex sm:ml-0 ml-4">
          <Breadcrumb />
        </div>
        <div className="mt-6 w-full sm:rounded-5xl rounded-3xl shadow-md">
          <div className="sm:px-8 px-4 py-0 bg-gradient-light-gray sm:rounded-top-5xl rounded-t-3xl">
            <ul className="flex">
              <li className="hidden sm:block text-center font-semibold text-lg leading-5 mr-2.5 py-3.5">
                Vehicle <br /> type
              </li>
              {vehicleTypes.map(item => (
                <li
                  key={item.id}
                  className={`flex items-center text-2xl px-4 py-4 sm:py-0 hover:bg-white cursor-pointer transition-colors ${
                    item.active && 'bg-active'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white rounded-bottom-5xl sm:px-8 px-4 py-7">
            <SearchForm />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Search
