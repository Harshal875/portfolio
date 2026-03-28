import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './styles/Cursor.css'

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    let mouseX = 0, mouseY = 0
    let curX = 0, curY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      // Dot follows instantly
      gsap.set(dot, { x: mouseX, y: mouseY })
    }

    const ticker = gsap.ticker.add(() => {
      curX += (mouseX - curX) * 0.1
      curY += (mouseY - curY) * 0.1
      gsap.set(cursor, { x: curX, y: curY })
    })

    document.addEventListener('mousemove', onMouseMove)

    // Handle data-cursor attributes
    document.querySelectorAll('[data-cursor]').forEach((item) => {
      const el = item as HTMLElement
      el.addEventListener('mouseover', () => {
        if (el.dataset.cursor === 'disable') {
          cursor.classList.add('cursor-disable')
        } else if (el.dataset.cursor === 'link') {
          cursor.classList.add('cursor-link')
        }
      })
      el.addEventListener('mouseout', () => {
        cursor.classList.remove('cursor-disable', 'cursor-link')
      })
    })

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(ticker)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={cursorRef} />
      <div className="cursor-dot" ref={dotRef} />
    </>
  )
}

export default Cursor
