import { createContext, useContext, useState } from 'react'

const loadingBarContext = createContext()

export const useLoadingBarContext = () => useContext(loadingBarContext)

export const LoadingBarProvider = ({ children }) => {
  const [loadingBar, setLoadingBar] = useState(0)

  return (
    <loadingBarContext.Provider value={{ loadingBar, setLoadingBar }}>
      {children}
    </loadingBarContext.Provider>
  )
}
