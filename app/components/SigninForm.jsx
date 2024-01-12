import Image from 'next/image'
import GoogleImage from '@public/assets/google.png'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const SigninForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = async e => {
    e.preventDefault()
    setSubmitting(true)

    const loginData = {
      email: user.email,
      password: user.password,
      callbackUrl: '/',
      redirect: false,
    }

    const login = await signIn('credentials', loginData)

    if (login.error) {
      setError(login.error)
    } else {
      setError('')
    }

    if (login.ok) {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={e => handleSignIn(e)}
      className="flex flex-col lg:min-w-[36%] md:min-w-[36%] min-w-[70%] gap-5 py-7 px-6 bg-white rounded-[30px]"
    >
      <div>
        <h1 className="font-bold text-2xl">Sign in</h1>
        <p>Find your car.</p>
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-red-500">{error}</p>
        <input
          className="input-full"
          type="text"
          placeholder="Email"
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
        <div className="relative mt-5">
          <input
            className="input-full"
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => {
              setShowPassword(prev => !prev)
            }}
            className="absolute right-4 top-[50%] translate-y-[-50%] hover:text-gray-700"
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </button>
        </div>
        {/* <button className="self-start mt-1.5 text-sm">
                Forgot password?
              </button> */}
      </div>
      <button
        disabled={submitting}
        className="bg-[#8D8D8D] disabled:bg-[#adadad] text-white py-2 rounded-full text-sm font-medium"
      >
        Sign in
      </button>
      <div className="flex gap-2.5 items-center">
        <div className="h-[1px] w-full bg-[#ddd]"></div>
        <span className="text-sm">or</span>
        <div className="h-[1px] w-full bg-[#ddd]"></div>
      </div>
      <button
        className="flex justify-center gap-2 items-center border-[#ddd] border-[1px] text-[#525252] py-2 rounded-full text-sm font-medium"
        onClick={() => {
          signIn('google', {
            callbackUrl: `/`,
          })
        }}
      >
        <Image className="max-w-[1rem]" src={GoogleImage} alt="google" />
        Sign in with Google
      </button>
    </form>
  )
}

export default SigninForm
