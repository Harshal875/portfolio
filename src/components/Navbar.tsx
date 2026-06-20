import { useEffect } from 'react'
import lenis from '../utils/lenis'
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
          href="mailto:hello@harshal.cc"
          className="navbar-email"
          data-cursor="disable"
        >
          hello@harshal.cc
        </a>
        <ul>
          <li>
            <a className="nav-link" data-href="#about" href="#about" data-cursor="disable">
              ABOUT
            </a>
          </li>
          <li>
            <a className="nav-link" data-href="#career" href="#career" data-cursor="disable">
              EXPERIENCE
            </a>
          </li>
          <li>
            <a className="nav-link" data-href="#work" href="#work" data-cursor="disable">
              WORK
            </a>
          </li>
          <li>
            <a className="nav-link" data-href="#achievements" href="#achievements" data-cursor="disable">
              ACHIEVEMENTS
            </a>
          </li>
          <li>
            <a className="nav-link" data-href="#contact" href="#contact" data-cursor="disable">
              CONTACT
            </a>
          </li>
        </ul>
      </div>
      <div className="nav-fade" />
    </>
  )
}

export default Navbar



