import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const lenis = new Lenis({
  lerp: 0.1,
  orientation: 'vertical',
  smoothWheel: true,
})

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time: number) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

export default lenis
