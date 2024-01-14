'use client'

import { createContext, useContext, useEffect, useState } from 'react'

const loadingBarContext = createContext({
  loadingBar: 0,
  increaseLoadingBar: () => {},
  decreaseLoadingBar: () => {},
  updateLoadingBar: () => {},
  resetLoadingBar: () => {},
})

export const useLoadingBarContext = () => useContext(loadingBarContext)

export const LoadingBarProvider = ({ children }) => {
  const [loadingBar, setLoadingBar] = useState(0)

  const increaseLoadingBar = value => {
    setLoadingBar(prev => prev + value)
  }

  const decreaseLoadingBar = value => {
    setLoadingBar(prev => prev - value)
  }

  const updateLoadingBar = value => {
    setLoadingBar(value)
  }

  const resetLoadingBar = () => {
    setLoadingBar(0)
  }

  useEffect(() => {
    if (loadingBar < 0) {
      setLoadingBar(0)
    }
  }, [loadingBar])

  return (
    <loadingBarContext.Provider
      value={{
        loadingBar,
        increaseLoadingBar,
        decreaseLoadingBar,
        updateLoadingBar,
        resetLoadingBar,
      }}
    >
      {children}
    </loadingBarContext.Provider>
  )
}
