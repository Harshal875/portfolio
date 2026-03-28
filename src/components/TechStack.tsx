import * as THREE from 'three'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from '@react-three/rapier'
import './styles/TechStack.css'

// Tech stack with category colors
const TECH = [
  // Languages
  { name: 'Python',      color: '#4B8BBE' },
  { name: 'C++',         color: '#00599C' },
  { name: 'TypeScript',  color: '#3178C6' },
  { name: 'SQL',         color: '#f29111' },
  // AI / ML / LLMs
  { name: 'PyTorch',     color: '#EE4C2C' },
  { name: 'HuggingFace', color: '#FFD21E' },
  { name: 'LangChain',   color: '#7f40ff' },
  { name: 'LLMOps',      color: '#c2a4ff' },
  { name: 'OpenAI',      color: '#10A37F' },
  { name: 'RAG',         color: '#9b59ff' },
  // Data Engineering
  { name: 'Snowflake',   color: '#29B5E8' },
  { name: 'Kafka',       color: '#E34B24' },
  { name: 'dbt',         color: '#FF694B' },
  { name: 'Redis',       color: '#DC382D' },
  { name: 'Airflow',     color: '#017CEE' },
  // Backend / Infra
  { name: 'FastAPI',     color: '#009688' },
  { name: 'Node.js',     color: '#68A063' },
  { name: 'Nginx',       color: '#009900' },
  { name: 'Docker',      color: '#2496ED' },
  // Frontend / Realtime
  { name: 'React',       color: '#61DAFB' },
  { name: 'WebRTC',      color: '#333333' },
  { name: 'WebSocket',   color: '#7f40ff' },
  // Version control
  { name: 'Git',         color: '#F05032' },
  { name: 'GitHub',      color: '#ffffff' },
  // Data science
  { name: 'Pandas',      color: '#150458' },
  { name: 'NumPy',       color: '#4DABCF' },
]

const sphereGeo = new THREE.SphereGeometry(1, 20, 20)

const spheres = TECH.map((t) => ({
  ...t,
  scale: 0.65 + Math.random() * 0.45,
}))

type SphereProps = {
  name: string
  color: string
  scale: number
  isActive: boolean
}

function SphereItem({ name, color, scale, isActive }: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null)
  const vec = useMemo(() => new THREE.Vector3(), [])
  const mat = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.15,
        metalness: 0.3,
        roughness: 0.6,
        clearcoat: 0.2,
      }),
    [color]
  )

  useFrame((_state, delta) => {
    if (!isActive || !api.current) return
    const d = Math.min(0.1, delta)
    const impulse = vec
      .copy(api.current.translation() as THREE.Vector3)
      .normalize()
      .multiplyScalar(-50 * d * scale)
    api.current.applyImpulse(impulse, true)
  })

  const r = THREE.MathUtils.randFloatSpread
  return (
    <RigidBody
      linearDamping={0.8}
      angularDamping={0.2}
      friction={0.2}
      position={[r(22), r(22) - 20, r(16) - 8]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <mesh geometry={sphereGeo} material={mat} scale={scale} castShadow>
        <Text
          position={[0, 0, scale + 0.05]}
          fontSize={scale * 0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {name}
        </Text>
      </mesh>
    </RigidBody>
  )
}

type PointerProps = { isActive: boolean }
function Pointer({ isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody | null>(null)
  const vec = useMemo(() => new THREE.Vector3(), [])
  useFrame(({ pointer, viewport }) => {
    if (!isActive || !ref.current) return
    ref.current.setNextKinematicTranslation(
      vec.set(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      )
    )
  })
  return (
    <RigidBody type="kinematicPosition" colliders={false} ref={ref}>
      <CylinderCollider args={[0.01, isActive ? 3 : 0]} />
    </RigidBody>
  )
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('work')
      if (!section) return
      const threshold = section.getBoundingClientRect().top
      setIsActive(threshold < 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="techstack-section">
      <h2 className="techstack-heading">My Tech Stack</h2>
      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => { state.gl.toneMappingExposure = 1.5 }}
        className="tech-canvas"
      >
        <ambientLight intensity={0.8} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={1.5} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} />
          {spheres.map((props, i) => (
            <SphereItem key={i} {...props} isActive={isActive} />
          ))}
        </Physics>
      </Canvas>
    </div>
  )
}

export default TechStack
