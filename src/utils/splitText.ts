import SplitType from 'split-type'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

interface SplitElement extends HTMLElement {
  _splitInstance?: SplitType
  _splitAnim?: gsap.core.Animation
}

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true })
  if (window.innerWidth < 768) return

  const paras: NodeListOf<SplitElement> = document.querySelectorAll('.para')
  const titles: NodeListOf<SplitElement> = document.querySelectorAll('.title')

  const triggerStart = window.innerWidth <= 1024 ? 'top 65%' : 'top 60%'
  const toggleActions = 'play pause resume reverse'

  paras.forEach((para) => {
    if (para._splitAnim) {
      para._splitAnim.progress(1).kill()
      para._splitInstance?.revert()
    }

    para._splitInstance = new SplitType(para, { types: 'lines,words' })

    // Wrap lines for clip reveal
    para._splitInstance.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    para._splitAnim = gsap.fromTo(
      para._splitInstance.words,
      { autoAlpha: 0, y: 60 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.015,
        scrollTrigger: {
          trigger: para,
          toggleActions,
          start: triggerStart,
        },
      }
    )
  })

  titles.forEach((title) => {
    if (title._splitAnim) {
      title._splitAnim.progress(1).kill()
      title._splitInstance?.revert()
    }

    title._splitInstance = new SplitType(title, { types: 'chars,lines' })

    title._splitInstance.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    title._splitAnim = gsap.fromTo(
      title._splitInstance.chars,
      { autoAlpha: 0, y: 70, rotate: 8 },
      {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        duration: 0.75,
        ease: 'power2.inOut',
        stagger: 0.025,
        scrollTrigger: {
          trigger: title,
          toggleActions,
          start: triggerStart,
        },
      }
    )
  })
}
