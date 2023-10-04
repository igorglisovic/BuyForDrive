'use client'

import Container from './Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCar,
  faClose,
  faHouse,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Triangle from './Triangle'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { usePostCarContext } from '@app/store/post-car'

const Nav = () => {
  const [isOpened, setIsOpened] = useState(false)

  const menuRef = useRef()
  const profileImgRef = useRef()

  const { data: session, status } = useSession()
  const { headerInView, updateHeaderInView } = usePostCarContext()

  const handleOpenMenu = () => {
    if (!isOpened) {
      console.log('jeste')
      setIsOpened(true)
    }
  }

  const handleCloseMenu = () => {
    if (isOpened) {
      setIsOpened(false)
    }
  }

  useEffect(() => {
    const handleDocumentClick = event => {
      if (
        profileImgRef.current &&
        !profileImgRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpened(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [])

  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      updateHeaderInView(true)
    } else {
      updateHeaderInView(false)
    }
  }, [inView])

  return (
    <header
      ref={ref}
      className="bg-white shadow-md absolute top-0 left-0 w-full"
    >
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
            <li className="cursor-pointer">
              <Link href="/sellacar">Sell a car</Link>
            </li>
          </ul>
          {status === 'loading' ? (
            <p>...loading</p>
          ) : !session?.user && status === 'unauthenticated' ? (
            <ul className="flex justify-center gap-3">
              <li>
                <Link href="/signin">Sign in</Link>
              </li>
              <li>
                <Link href="/signup">Join now</Link>
              </li>
            </ul>
          ) : (
            <div className="relative cursor-default">
              <div
                ref={profileImgRef}
                className={`relative w-[40px] h-[40px]  ${
                  !isOpened && 'cursor-pointer'
                } rounded-full z-50 ${isOpened ? 'avatar' : 'avatar2'}`}
              >
                <Image
                  onClick={handleOpenMenu}
                  className={`w-full rounded-full border-gray-200 border-[1px]`}
                  width={32}
                  height={32}
                  alt="avatar"
                  src={session?.user.image}
                />
              </div>
              <div
                ref={menuRef}
                className={`animation2 overflow-hidden absolute shadow-md rounded-xl pt-14 pb-3 top-0 right-0 z-40 min-w-[13rem] bg-white ${
                  isOpened ? 'flex' : 'hidden'
                }`}
              >
                <span className="absolute font-normal text-gray-500 top-[16px] left-[56px] text-sm username cursor-text">
                  {session?.user.name}
                </span>
                <FontAwesomeIcon
                  className="absolute right-[7px] top-[12px] cursor-pointer py-1.5 px-[1px] w-[26px] h-[26px] rounded-md transition-all hover:bg-gray-100 text-gray-400 hover:text-gray-500"
                  icon={faClose}
                  width={26}
                  height={26}
                  onClick={handleCloseMenu}
                />
                <ul className="w-full flex-col text-left">
                  <li className={`animation mx-2`}>
                    <Link
                      href="/"
                      className="w-full block py-1.5 px-2 hover:bg-gray-100 text-sm font-normal rounded-md text-gray-800 "
                    >
                      <FontAwesomeIcon icon={faUser} className="" />
                      <span className="ml-1.5">Your Profile</span>
                    </Link>
                  </li>
                  <li
                    className={`animation mx-2 border-b-[1px] border-gray-200`}
                  >
                    <Link
                      href="/sellacar"
                      className="w-full block py-1.5 px-2 mb-2 hover:bg-gray-100 text-sm font-normal rounded-md text-gray-800 "
                    >
                      <FontAwesomeIcon icon={faCar} className="" />
                      <span className="ml-1.5">Sell a car</span>
                    </Link>
                  </li>
                  <li className={`animation mx-2`}>
                    <button
                      onClick={signOut}
                      className="w-full block py-1.5 px-2 mt-2 hover:bg-gray-100 text-sm font-normal rounded-md text-center text-gray-800"
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </Container>
    </header>
  )
}

export default Nav
