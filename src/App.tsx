import { lazy, Suspense } from 'react'
import './App.css'
import Loading from './components/Loading'

const MainContainer = lazy(() => import('./components/MainContainer'))

const App = () => {
  return (
    <>
      <Loading />
      <Suspense>
        <MainContainer />
      </Suspense>
    </>
  )
}

export default App
