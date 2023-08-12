'use client'

import Container from './Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Triangle from './Triangle'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Nav = () => {
  const [isOpened, setIsOpened] = useState(false)

  const { data: session } = useSession()

  const handleClick = () => {
    setIsOpened(prev => !prev)
  }

  return (
    <header className="bg-white shadow-md absolute top-0 left-0 w-full">
      <Container>
        <nav
          className={`flex items-center justify-between font-medium ${
            session?.user ? 'py-3' : 'py-5'
          }`}
        >
          <ul className="flex justify-center gap-3">
            <li className="flex items-center">
              <Link href="/">
                <FontAwesomeIcon icon={faHouse} width="20px" />
              </Link>
            </li>
            <li className="flex items-center gap-1.5 cursor-pointer">
              Fast search
              <span className="flex items-center w-3 rotate-180 mt-1">
                <Triangle />
              </span>
            </li>
            <li className="flex items-center gap-1.5 cursor-pointer">
              Vehicle types
              <span className="flex items-center w-3 rotate-180 mt-1">
                <Triangle />
              </span>
            </li>
            <li className="cursor-pointer">Sell the car</li>
          </ul>
          {!session?.user ? (
            <ul className="flex justify-center gap-3">
              <li>
                <Link href="/signin">Sign in</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          ) : (
            <button className="relative">
              <Image
                onClick={handleClick}
                className="avatar w-[40px] h-[40px] rounded-full"
                width={32}
                height={32}
                src={session?.user.image}
              />
              {isOpened && (
                <ul
                  className={`absolute top-100 right-0 z-50 min-w-[10rem] flex-col bg-white ${
                    isOpened ? 'flex' : 'hidden'
                  }`}
                >
                  <li
                    className={` hover:bg-gray-200 cursor-pointer
                    `}
                  >
                    <button onClick={signOut} className="w-full py-2 px-2">
                      Sign out
                    </button>
                  </li>
                </ul>
              )}
            </button>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Nav
