import SplitType from 'split-type'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function setAllTimeline() {
  // Career section timeline
  gsap.fromTo(
    '.career-info-box',
    { autoAlpha: 0, x: -40 },
    {
      autoAlpha: 1,
      x: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.career-section',
        start: 'top 60%',
        toggleActions: 'play pause resume reverse',
      },
    }
  )

  // Work section cards
  gsap.fromTo(
    '.work-box',
    { autoAlpha: 0, y: 50 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.work-section',
        start: 'top 65%',
        toggleActions: 'play pause resume reverse',
      },
    }
  )

  // Interests cards
  gsap.fromTo(
    '.interest-card',
    { autoAlpha: 0, y: 40, scale: 0.95 },
    {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.interests-section',
        start: 'top 65%',
        toggleActions: 'play pause resume reverse',
      },
    }
  )

  // Career dot / timeline animation
  gsap.fromTo(
    '.career-timeline',
    { scaleY: 0 },
    {
      scaleY: 1,
      duration: 1.2,
      ease: 'power3.inOut',
      transformOrigin: 'top center',
      scrollTrigger: {
        trigger: '.career-section',
        start: 'top 60%',
        toggleActions: 'play pause resume reverse',
      },
    }
  )
}

export function initialFX() {
  // Use gsap.from() — content is at final position by default,
  // GSAP animates FROM an offset. Loader (pure CSS, 2s) covers this.

  let heroNameChars: Element[] = []
  let heroSubWords: Element[] = []

  try {
    const heroName = new SplitType('.landing-name', { types: 'chars' })
    const heroSub = new SplitType('.landing-role-text', { types: 'words' })
    heroNameChars = heroName.chars ?? []
    heroSubWords = heroSub.words ?? []
  } catch (_) { /* noop */ }

  // Stagger delay so animations finish as loader fades (loader gone at ~2.5s)
  const DELAY = 1.8

  if (heroNameChars.length > 0) {
    gsap.from(heroNameChars, {
      autoAlpha: 0, y: 60,
      duration: 0.9, ease: 'power3.out',
      stagger: 0.04, delay: DELAY,
    })
  }

  gsap.from('.landing-label', {
    autoAlpha: 0, y: 30,
    duration: 0.6, ease: 'power3.out',
    delay: DELAY - 0.1,
  })

  if (heroSubWords.length > 0) {
    gsap.from(heroSubWords, {
      autoAlpha: 0, y: 40,
      duration: 0.7, ease: 'power3.out',
      stagger: 0.06, delay: DELAY + 0.3,
    })
  }

  gsap.from('.landing-bio', {
    autoAlpha: 0, y: 30,
    duration: 0.7, ease: 'power2.out',
    delay: DELAY + 0.6,
  })

  gsap.from('.landing-cta', {
    autoAlpha: 0, y: 20,
    duration: 0.6, ease: 'power2.out',
    delay: DELAY + 0.8,
  })

  gsap.from('.avatar-wrapper', {
    autoAlpha: 0, scale: 0.85,
    duration: 1.0, ease: 'power3.out',
    delay: DELAY + 0.2,
  })

  gsap.from('.header', {
    autoAlpha: 0, y: -10,
    duration: 0.8, ease: 'power2.out',
    delay: DELAY + 0.4,
  })

  gsap.from('.icons-section', {
    autoAlpha: 0, x: -10,
    duration: 0.8, ease: 'power2.out',
    delay: DELAY + 0.5,
  })

  // Scroll-driven: hero section out on scroll
  ScrollTrigger.create({
    trigger: '.landing-section',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress
      gsap.set('.landing-content', {
        y: progress * 80,
        autoAlpha: 1 - progress * 1.5,
      })
      gsap.set('.neural-canvas-wrapper', {
        autoAlpha: 1 - progress * 0.8,
      })
    },
  })
}
