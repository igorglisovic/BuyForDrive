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
    console.log(cookies.cookieConsent)
    if (cookies.cookieConsent) {
      setTest(true)
    } else {
      setTest(false)
    }
  }, [cookies])

  return test ? (
    <></>
  ) : (
    <section className="fixed bottom-0 left-0 z-[99999999999999999999999999999] bg-white flex justify-between items-center px-28 py-5 w-full">
      <p>
        We use cookies to enhance your user experience.
        <br />
        By using out website, you agree to our use of cookies.{' '}
        <Link href="/privacy-policy" className="underline">
          Learn more
        </Link>
      </p>
      <button
        className="bg-gray-300 py-1 rounded-full self-center px-5 font-semibold hover:bg-gray-200"
        onClick={giveCookieConsent}
      >
        Accept
      </button>
    </section>
  )
}

export default CookieConsent
