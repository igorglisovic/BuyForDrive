'use client'

import Link from 'next/link'
import Container from './Container'
import { useSearchContext } from '@app/store/search-car'

const mostWantedModelsArray = [
  {
    label: 'BMW M4',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e7&model_id=64d8c1abd7a49bfd5341e1ea',
  },
  {
    label: 'Toyota Supra',
    link: '/',
  },
  {
    label: 'Audi A7',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e8&model_id=64d8c3add7a49bfd5341e1f9',
  },
  {
    label: 'Volkswagen Arteon',
    link: '/',
  },
  {
    label: 'Audi A6',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e8&model_id=64d8c3add7a49bfd5341e1f8',
  },
  {
    label: 'BMW M5',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e7&model_id=64d8c1ddd7a49bfd5341e1ec',
  },
  {
    label: 'Ferrari LaFerrari',
    link: '/cars/search?sort=default_sorting&page=1&limit=10&brand_id=64d8c0efd7a49bfd5341e1e4',
  },
  {
    label: 'Porsche 911',
    link: '/',
  },
  {
    label: 'Volkswagen Golf 6',
    link: '/',
  },
  {
    label: 'Mercedes Benz C63',
    link: '/',
  },
  {
    label: 'Nissan GTR',
    link: '/',
  },
  {
    label: 'Skoda Octavia',
    link: '/',
  },
]

const Footer = () => {
  const { isFilterMenuOpen } = useSearchContext()

  return (
    <footer
      className={`bg-white py-14 shadow-2xl relative ${
        isFilterMenuOpen ? 'z-[-1]' : ''
      }`}
    >
      <Container>
        <div className="flex flex-col lg:flex-row relative">
          <div className="flex-1 xl:grow-[1.2] grow-[1.4]">
            <h2 className="text-3xl font-bold mb-5 md:text-left text-center">
              Most wanted models
            </h2>
            <ul className="grid lg:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3">
              {mostWantedModelsArray?.map((item, i) => (
                <li key={i} className={`${i}`}>
                  <Link
                    className="bg-gray-200 w-full  sm:text-base text-[0.9rem] font-medium block text-center py-1.5 rounded-[10px]"
                    href={item.link}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1"></div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
