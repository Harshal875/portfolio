import { lazy, Suspense, useEffect, useState } from 'react'
import { initialFX, setAllTimeline } from '../utils/gsapAnimations'
import setSplitText from '../utils/splitText'
import '../utils/lenis'
import About from './About'
import Career from './Career'
import Contact from './Contact'
import Cursor from './Cursor'
import Landing from './Landing'
import Navbar from './Navbar'
import SocialIcons from './SocialIcons'
import WhatIDo from './WhatIDo'
import Work from './Work'
import Interests from './Interests'
import '../App.css'

const TechStack = lazy(() => import('./TechStack'))

const MainContainer = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)

  useEffect(() => {
    // Run entrance + scroll animations once on mount
    initialFX()
    setSplitText()
    setAllTimeline()

    const onResize = () => {
      setSplitText()
      setIsDesktop(window.innerWidth > 1024)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <Cursor />
      <Navbar />
      <SocialIcons />

      <main>
        <Landing />
        <About />
        <Career />
        <Work />
        <WhatIDo />
        {isDesktop && (
          <Suspense fallback={<div style={{ height: '100vh' }} />}>
            <TechStack />
          </Suspense>
        )}
        <Interests />
        <Contact />
      </main>
    </div>
  )
}

export default MainContainer
