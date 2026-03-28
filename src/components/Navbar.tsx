import { useEffect } from 'react'
import { gsap } from 'gsap'
import lenis from '../utils/lenis'
import HoverLinks from './HoverLinks'
import './styles/Navbar.css'

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll('.nav-link')
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault()
        const el = e.currentTarget as HTMLAnchorElement
        const target = el.getAttribute('data-href')
        if (target) {
          lenis.scrollTo(target, { duration: 1.4, offset: 0 })
        }
      })
    })
  }, [])

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-logo" data-cursor="disable">
          HB<span className="navbar-logo-dot">.</span>
        </a>
        <a
          href="mailto:harshalbansal.bt23cseai@pec.edu.in"
          className="navbar-email"
          data-cursor="disable"
        >
          harshalbansal.bt23cseai@pec.edu.in
        </a>
        <ul>
          <li>
            <a className="nav-link" data-href="#about" href="#about" data-cursor="disable">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a className="nav-link" data-href="#work" href="#work" data-cursor="disable">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a className="nav-link" data-href="#contact" href="#contact" data-cursor="disable">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>
      <div className="nav-fade" />
    </>
  )
}

export default Navbar
