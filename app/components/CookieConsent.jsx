'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const CookieConsent = () => {
  const [cookies, setCookies] = useCookies(['cookieConsent'])
  const [test, setTest] = useState(true)

  const giveCookieConsent = () => {
    setCookies('cookieConsent', true, { path: '/' })
  }

  useEffect(() => {
    if (cookies.cookieConsent) {
      setTest(true)
    } else {
      setTest(false)
    }
  }, [cookies])

  return test ? (
    <></>
  ) : (
    <section
      className="fixed bottom-0 left-0 z-50 bg-white flex justify-between items-center sm:flex-row flex-col sm:text-left text-left sm:gap-3 px-4 gap-5 lg:px-28 md:px-16 sm:px-5 sm:py-5 py-6 w-full"
      style={{ boxShadow: '0px 3px 8px 0 rgba(0,0,0,0.3)' }}
    >
      <p>
        We use cookies to enhance your user experience. By using out website,
        you agree to our use of cookies.{' '}
        <Link
          aria-label="Learn more"
          href="/privacy-policy"
          className="underline"
        >
          Learn more
        </Link>
      </p>
      <button
        aria-label="Accept cookies"
        className="bg-gray-300 py-1 rounded-full self-center px-5 font-semibold hover:bg-gray-200"
        onClick={giveCookieConsent}
      >
        Accept
      </button>
    </section>
  )
}

export default CookieConsent
