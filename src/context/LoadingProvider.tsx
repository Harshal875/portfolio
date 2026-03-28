import { createContext, useContext, useState, ReactNode } from 'react'

interface LoadingContextType {
  loading: number
  setLoading: (value: number) => void
  isLoaded: boolean
  setIsLoaded: (value: boolean) => void
}

const LoadingContext = createContext<LoadingContextType>({
  loading: 0,
  setLoading: () => {},
  isLoaded: false,
  setIsLoaded: () => {},
})

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <LoadingContext.Provider value={{ loading, setLoading, isLoaded, setIsLoaded }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
