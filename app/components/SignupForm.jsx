import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import GoogleImage from '@public/assets/google.png'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const validateUsername = (value, setError) => {
  if (value.length < 4) {
    setError(prev => {
      return {
        ...prev,
        username: '*Username must be at least 4 characters long!',
      }
    })
    return false
  } else if (value.length > 14) {
    setError(prev => {
      return {
        ...prev,
        username: '*Username must have a maximum 14 characters!',
      }
    })
    return false
  } else if (/[^A-Za-z0-9]/.test(value)) {
    setError(prev => {
      return {
        ...prev,
        username: '*Username must not contain special characters!',
      }
    })
    return false
  } else {
    setError(prev => {
      return {
        ...prev,
        username: '',
      }
    })
    return true
  }
}

const validateEmail = (value, setError) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  if (!emailRegex.test(value)) {
    setError(prev => {
      return {
        ...prev,
        email: '*Enter a valid email!',
      }
    })
    return false
  } else {
    setError(prev => {
      return {
        ...prev,
        email: '',
      }
    })
    return true
  }
}

const validatePassword = (value, setError, user) => {
  if (!/(?=.*[a-z])/.test(value)) {
    setError(prev => {
      return {
        ...prev,
        password: '*Password must have at least one lowercase letter!',
      }
    })
    return false
  } else if (!/(?=.*[A-Z])/.test(value)) {
    setError(prev => {
      return {
        ...prev,
        password: '*Password must have at least one uppercase letter!',
      }
    })
    return false
  } else if (!/(?=.*[0-9])/.test(value)) {
    setError(prev => {
      return {
        ...prev,
        password: '*Password must have at least one number!',
      }
    })
    return false
  } else if (!/.{8,}/.test(value)) {
    setError(prev => {
      return {
        ...prev,
        password: '*Password must be at least 8 characters long!',
      }
    })
    return false
  } else if (value.length > 25) {
    setError(prev => {
      return {
        ...prev,
        password: '*Password must not be longer than 25 characters!',
      }
    })
  } else {
    setError(prev => {
      return {
        ...prev,
        password: '',
      }
    })
    return true
  }

  if (
    user.confirmPassword !== user.password &&
    user.confirmPassword.length !== 0
  ) {
    setError(prev => {
      return {
        ...prev,
        confirmPassword: '*Passwords do not match!',
      }
    })
    return false
  } else {
    setError(prev => {
      return {
        ...prev,
        confirmPassword: '',
      }
    })
    return true
  }
}

const validateConfirmPassword = (value, setError, user) => {
  if (value !== user.password) {
    setError(prev => {
      return {
        ...prev,
        confirmPassword: '*Passwords do not match!',
      }
    })
    return false
  } else {
    setError(prev => {
      return {
        ...prev,
        confirmPassword: '',
      }
    })
    return true
  }
}

const Signup = () => {
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [inputTimeout, setInputTimeout] = useState(null)
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [mainError, setMainError] = useState('')

  const router = useRouter()

  const handleSignup = async e => {
    e.preventDefault()

    const isUsernameValid = validateUsername(user.username, setError)
    const isEmailValid = validateEmail(user.email, setError)
    const isPasswordValid = validatePassword(user.password, setError, user)
    const isConfirmPasswordValid = validateConfirmPassword(
      user.confirmPassword,
      setError,
      user
    )

    if (
      !isUsernameValid ||
      !isEmailValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })

      if (res.status === 409) {
        setMainError('User with this email already exists!')
      } else {
        setMainError('')
      }

      if (res.ok) {
        setSubmitting(false)
        router.push('/signin')
      }
    } catch (error) {
      console.log('Signup failed', error.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleUsernameChange = e => {
    const usernameValue = e.target.value
    setUser({ ...user, username: usernameValue })

    clearTimeout(inputTimeout)

    setInputTimeout(
      setTimeout(() => {
        validateUsername(usernameValue, setError)
      }, 800)
    )
  }

  const handleEmailChange = e => {
    const emailValue = e.target.value
    setUser({ ...user, email: emailValue })

    clearTimeout(inputTimeout)

    setInputTimeout(
      setTimeout(() => {
        validateEmail(emailValue, setError)
      }, 800)
    )
  }

  const handlePasswordChange = e => {
    const passwordValue = e.target.value
    setUser({ ...user, password: passwordValue })

    clearTimeout(inputTimeout)

    setInputTimeout(
      setTimeout(() => {
        validatePassword(passwordValue, setError, user)
      }, 800)
    )
  }

  const handleConfirmPasswordChange = e => {
    const confirmPasswordValue = e.target.value
    setUser({ ...user, confirmPassword: confirmPasswordValue })

    clearTimeout(inputTimeout)

    setInputTimeout(
      setTimeout(() => {
        validateConfirmPassword(confirmPasswordValue, setError, user)
      }, 800)
    )
  }

  return (
    <form
      onSubmit={e => handleSignup(e)}
      className="flex flex-col lg:min-w-[36%] md:min-w-[36%] min-w-[70%] gap-5 py-7 px-6 bg-white rounded-[30px]"
    >
      <div>
        <h1 className="font-bold text-2xl">Join now</h1>
        <p>Find your car.</p>
      </div>
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm text-red-500">{mainError}</p>
          <input
            className="input-full"
            type="text"
            placeholder="Username"
            onChange={e => {
              handleUsernameChange(e)
            }}
          />
          <p className="text-sm text-red-500">{error?.username}</p>
        </div>
        <div>
          <input
            className="input-full"
            type="email"
            placeholder="Email"
            onChange={e => handleEmailChange(e)}
          />
          <p className="text-sm text-red-500">{error.email}</p>
        </div>
        <div>
          <div className="relative">
            <input
              className="input-full"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={e => handlePasswordChange(e)}
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
          <p className="text-sm text-red-500">{error.password}</p>
        </div>
        <div>
          <input
            className="input-full"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            onChange={e => handleConfirmPasswordChange(e)}
          />

          <p className="text-sm text-red-500">{error.confirmPassword}</p>
        </div>
      </div>
      <button
        type="submit"
        className="bg-[#8D8D8D] text-white py-2 rounded-full text-sm font-medium disabled:bg-[#adadad]"
        disabled={submitting}
      >
        Sign up
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

export default Signup
