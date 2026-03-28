import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Create a soft radial glow texture on a canvas
function makeGlowTexture(
  size: number,
  innerColor: string,
  outerColor: string
): THREE.CanvasTexture {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  const ctx = c.getContext('2d')!
  const half = size / 2
  const grad = ctx.createRadialGradient(half, half, 0, half, half, half)
  grad.addColorStop(0, innerColor)
  grad.addColorStop(0.35, outerColor)
  grad.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, size, size)
  return new THREE.CanvasTexture(c)
}

type NodeData = {
  pos: THREE.Vector3
  baseSize: number
}

type PulseData = {
  sprite: THREE.Sprite
  edgeIdx: number
  progress: number
  speed: number
}

const NeuralScene = () => {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const W = container.offsetWidth || window.innerWidth
    const H = container.offsetHeight || window.innerHeight

    if (W === 0 || H === 0) return

    // ── Scene / Renderer ──────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 200)
    camera.position.set(0, 0, 18)

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // ── Textures ──────────────────────────────────────────────
    const nodeTex = makeGlowTexture(
      64,
      'rgba(210, 180, 255, 1)',
      'rgba(127, 64, 255, 0.7)'
    )
    const pulseTex = makeGlowTexture(
      32,
      'rgba(255, 255, 255, 1)',
      'rgba(200, 140, 255, 0.8)'
    )

    // ── Group (everything rotates together) ───────────────────
    const group = new THREE.Group()
    scene.add(group)

    // ── Nodes ─────────────────────────────────────────────────
    const NODE_COUNT = 90
    const nodes: NodeData[] = []

    // Avatar sits ~35% from right edge. In NDC that's roughly x = +4 to +6.
    // We cluster nodes around the avatar center and let them fade left.
    const AVATAR_X = 5.0
    const AVATAR_Y = 0.0

    for (let i = 0; i < NODE_COUNT; i++) {
      let x: number, y: number, z: number

      if (i < 55) {
        // Dense cluster around avatar — tight gaussian-ish spread
        const angle = Math.random() * Math.PI * 2
        const r = 0.5 + Math.pow(Math.random(), 0.6) * 4.5
        x = AVATAR_X + Math.cos(angle) * r
        y = AVATAR_Y + Math.sin(angle) * r * 0.7
        z = (Math.random() - 0.5) * 4
      } else {
        // Tendrils that reach LEFT toward the name
        x = AVATAR_X - 2 - Math.random() * 9   // extends left
        y = (Math.random() - 0.5) * 7
        z = (Math.random() - 0.5) * 5
      }

      nodes.push({
        pos: new THREE.Vector3(x, y, z),
        baseSize: 0.15 + Math.random() * 0.22,
      })
    }

    // Points cloud for all nodes
    const posArr = new Float32Array(NODE_COUNT * 3)
    nodes.forEach((n, i) => {
      posArr[i * 3] = n.pos.x
      posArr[i * 3 + 1] = n.pos.y
      posArr[i * 3 + 2] = n.pos.z
    })
    const ptGeo = new THREE.BufferGeometry()
    ptGeo.setAttribute('position', new THREE.BufferAttribute(posArr, 3))

    const ptMat = new THREE.PointsMaterial({
      size: 0.28,
      map: nodeTex,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      color: 0xd0b0ff,
    })
    const pointCloud = new THREE.Points(ptGeo, ptMat)
    group.add(pointCloud)

    // ── Edges ─────────────────────────────────────────────────
    // Threshold varies by distance from avatar: dense near it, sparse on tendrils
    const edgeVerts: number[] = []
    const edges: { from: number; to: number }[] = []

    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const d = nodes[i].pos.distanceTo(nodes[j].pos)
        // Closer to avatar = tighter connections; tendrils connect more loosely
        const avgX = (nodes[i].pos.x + nodes[j].pos.x) / 2
        const distFromAvatar = Math.abs(avgX - AVATAR_X)
        const threshold = distFromAvatar < 3 ? 3.2 : 2.4
        if (d < threshold) {
          edgeVerts.push(
            nodes[i].pos.x, nodes[i].pos.y, nodes[i].pos.z,
            nodes[j].pos.x, nodes[j].pos.y, nodes[j].pos.z
          )
          edges.push({ from: i, to: j })
        }
      }
    }

    const edgeGeo = new THREE.BufferGeometry()
    edgeGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(new Float32Array(edgeVerts), 3)
    )
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x7f40ff,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
    })
    group.add(new THREE.LineSegments(edgeGeo, edgeMat))

    // ── Pulses ────────────────────────────────────────────────
    const PULSE_COUNT = 18
    const pulses: PulseData[] = []

    for (let i = 0; i < PULSE_COUNT && edges.length > 0; i++) {
      const mat = new THREE.SpriteMaterial({
        map: pulseTex,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.scale.setScalar(0.28)
      group.add(sprite)
      pulses.push({
        sprite,
        edgeIdx: Math.floor(Math.random() * edges.length),
        progress: Math.random(),
        speed: 0.18 + Math.random() * 0.35,
      })
    }

    // ── Mouse parallax ────────────────────────────────────────
    let target = { x: 0, y: 0 }
    let current = { x: 0, y: 0 }

    const onMouseMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMouseMove)

    // ── Scroll: dissolve scene ─────────────────────────────────
    let scrollOpacity = 1
    ScrollTrigger.create({
      trigger: '.landing-section',
      start: 'top top',
      end: '80% top',
      scrub: true,
      onUpdate: (self) => {
        scrollOpacity = 1 - self.progress * 1.2
        renderer.domElement.style.opacity = String(Math.max(0, scrollOpacity))
      },
    })

    // ── Animation loop ────────────────────────────────────────
    const clock = new THREE.Clock()

    const animate = () => {
      const id = requestAnimationFrame(animate)

      const delta = Math.min(clock.getDelta(), 0.05)

      // Smooth mouse tracking
      current.x += (target.x - current.x) * 0.04
      current.y += (target.y - current.y) * 0.04

      group.rotation.y = current.x * 0.25 + clock.getElapsedTime() * 0.012
      group.rotation.x = -current.y * 0.12

      // Move pulses along edges
      for (const p of pulses) {
        p.progress += p.speed * delta
        if (p.progress >= 1) {
          p.progress = 0
          p.edgeIdx = Math.floor(Math.random() * edges.length)
        }
        const e = edges[p.edgeIdx]
        p.sprite.position.lerpVectors(nodes[e.from].pos, nodes[e.to].pos, p.progress)
      }

      renderer.render(scene, camera)

      return id
    }

    const animId = animate()

    // ── Resize ─────────────────────────────────────────────────
    const onResize = () => {
      const w = container.offsetWidth
      const h = container.offsetHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      ptGeo.dispose()
      edgeGeo.dispose()
      nodeTex.dispose()
      pulseTex.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default NeuralScene
