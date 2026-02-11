import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Polaroid } from './Polaroid.tsx'
import { LoveLetter } from './LoveLetter.tsx'
import { Heart, Mail } from 'lucide-react'

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
}

interface ConstellationNode {
  id: string
  x: number
  y: number
  label: string
  image?: string
  memory: string
  shape: 'heart' | 'y' | 'palm'
  fit?: 'cover' | 'contain'
}

const NODES: ConstellationNode[] = [
  // Heart Shape nodes - Nuestra Historia
  {
    id: 'h1',
    x: 50,
    y: 30,
    label: 'Nuestra Primera Salida',
    memory:
      'Carrera UTP: El comienzo de todo. Nuestra primera salida juntos, ¡qué nervios!',
    image: '/CarreraUTP.png',
    shape: 'heart',
  },
  {
    id: 'h2',
    x: 35,
    y: 20,
    label: 'Primer Viaje Juntos',
    memory:
      'Nuestro primer viaje a Panamá. Una aventura inolvidable que nos unió más.',
    image: '/ViajePanama.png',
    shape: 'heart',
  },
  {
    id: 'h3',
    x: 65,
    y: 20,
    label: 'Cena Especial',
    memory:
      "Disfrutando de esos momentos simples pero perfectos en Mcdonald's.",
    image: '/Mcdonals.png',
    shape: 'heart',
  },
  {
    id: 'h4',
    x: 50,
    y: 40,
    label: 'Detalles que Enamoran',
    memory: 'Esas pequeñas cosas, como tus uñas perfectas, que siempre noto.',
    image: '/Unas.png',
    shape: 'heart',
  },

  // 'Y' Shape nodes - Yeisury & Aventuras
  {
    id: 'y1',
    x: 20,
    y: 55,
    label: 'Aventura en Boquete',
    memory:
      'Explorando Boquete. La naturaleza y tu sonrisa, la mejor combinación.',
    image: '/Boquete.png',
    shape: 'y',
  },
  {
    id: 'y2',
    x: 30,
    y: 70,
    label: 'Momentos en la Finca',
    memory: 'Paz y tranquilidad en Finca Boquete a tu lado.',
    image: '/FincaBoquete.png',
    fit: 'contain',
    shape: 'y',
  },
  {
    id: 'y3',
    x: 15,
    y: 85,
    label: 'Amigos con Alas',
    memory:
      'Tarde de patos en Boquete. Siempre encontrando magia en lo cotidiano.',
    image: '/PatosBoquete.png',
    shape: 'y',
  },

  // Palm nodes - Ohana & Amigos
  {
    id: 'p1',
    x: 80,
    y: 55,
    label: 'Nuestra Ohana',
    memory:
      'Compartiendo risas y momentos con nuestros amigos. La familia que elegimos.',
    image: '/Amigos.png',
    fit: 'contain',
    shape: 'palm',
  },
  {
    id: 'p2',
    x: 70,
    y: 70,
    label: 'Más de Nuestra Gente',
    memory: 'Siempre rodeados de buena energía y amigos de verdad.',
    image: '/Amigos2.png',
    fit: 'contain',
    shape: 'palm',
  },
  {
    id: 'p3',
    x: 85,
    y: 85,
    label: 'Parrillada en Familia',
    memory: 'Comida, amigos y mucha felicidad en nuestra parrillada.',
    image: '/Parrillada.png',
    shape: 'palm',
  },
]

export const StarCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [selectedNode, setSelectedNode] = useState<ConstellationNode | null>(
    null,
  )
  const [showLetter, setShowLetter] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const isTouchRef = useRef(false)
  const stars = useRef<Star[]>([])

  useEffect(() => {
    if (selectedNode || showLetter) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedNode, showLetter])

  useEffect(() => {
    // Detect touch device
    const touchMediaQuery = window.matchMedia('(pointer: coarse)')
    setIsTouch(touchMediaQuery.matches)
    isTouchRef.current = touchMediaQuery.matches

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initStars = () => {
      const count = window.innerWidth < 768 ? 200 : 350
      stars.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.3 + Math.random() * 2.0,
        opacity: 0.1 + Math.random() * 0.9,
        speed: 0.03 + Math.random() * 0.12,
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    window.addEventListener('resize', resize)
    resize()

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouseX = mouseRef.current.x
      const mouseY = mouseRef.current.y
      const time = Date.now() * 0.001

      // Draw background stars
      stars.current.forEach((star) => {
        star.y -= star.speed
        if (star.y < 0) star.y = canvas.height

        ctx.fillStyle = `rgba(212, 165, 255, ${star.opacity})`
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()

        if (star.size > 1.2) {
          ctx.shadowBlur = 4
          ctx.shadowColor = 'rgba(212, 165, 255, 0.5)'
        } else {
          ctx.shadowBlur = 0
        }
      })
      ctx.shadowBlur = 0

      // Draw connections
      const radius = window.innerWidth < 768 ? 150 : 250

      NODES.forEach((node, i) => {
        const nx = (node.x / 100) * canvas.width
        const ny = (node.y / 100) * canvas.height

        // On mobile/touch, draw permanent faint connections
        if (isTouchRef.current) {
          NODES.forEach((other, j) => {
            if (i < j && other.shape === node.shape) {
              const ox = (other.x / 100) * canvas.width
              const oy = (other.y / 100) * canvas.height
              
              const pulse = 0.1 + Math.sin(time * 2 + i + j) * 0.05
              ctx.strokeStyle = `rgba(212, 165, 255, ${pulse})`
              ctx.lineWidth = 1
              ctx.beginPath()
              ctx.moveTo(nx, ny)
              ctx.lineTo(ox, oy)
              ctx.stroke()
            }
          })
        }

        if (mouseX !== 0 && mouseY !== 0) {
          const dx = mouseX - nx
          const dy = mouseY - ny
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < radius) {
            ctx.strokeStyle = `rgba(255, 77, 148, ${0.4 * (1 - dist / radius)})`
            ctx.lineWidth = 1.5
            ctx.beginPath()
            ctx.moveTo(nx, ny)
            ctx.lineTo(mouseX, mouseY)
            ctx.stroke()

            NODES.forEach((other) => {
              if (other.id !== node.id && other.shape === node.shape) {
                const ox = (other.x / 100) * canvas.width
                const oy = (other.y / 100) * canvas.height
                const d2m = Math.sqrt((mouseX - ox) ** 2 + (mouseY - oy) ** 2)

                if (d2m < radius) {
                  ctx.strokeStyle = `rgba(212, 165, 255, ${0.2 * (1 - dist / radius)})`
                  ctx.lineWidth = 1
                  ctx.beginPath()
                  ctx.moveTo(nx, ny)
                  ctx.lineTo(ox, oy)
                  ctx.stroke()
                }
              }
            })
          }
        }
      })

      animationId = window.requestAnimationFrame(animate)
    }

    animate()
    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(animationId)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
    setMouse({ x: e.clientX, y: e.clientY })
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    mouseRef.current = { x: touch.clientX, y: touch.clientY }
    setMouse({ x: touch.clientX, y: touch.clientY })
  }

  return (
    <div
      className="relative w-full h-full cursor-none overflow-hidden bg-[#0d071b] touch-pan-y"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none touch-pan-y"
      />

      {/* Node triggers */}
      <div className="absolute inset-0 z-10 touch-pan-y">
        {NODES.map((node) => (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer p-8 touch-pan-y"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => setSelectedNode(node)}
          >
            <div className="absolute inset-0 w-16 h-16 m-auto bg-pink-500/20 rounded-full animate-pulse group-hover:bg-pink-500/40" />
            <div className="relative w-6 h-6 bg-pink-400 rounded-full shadow-[0_0_25px_rgba(255,77,148,1)] group-hover:scale-150 transition-transform duration-300 border-2 border-white mx-auto mt-5" />
            <span className="absolute top-12 md:top-16 left-1/2 -translate-x-1/2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-2xl font-handwritten whitespace-nowrap text-white drop-shadow-[0_4px_8px_rgba(0,0,0,1)] pointer-events-none bg-black/40 px-2 py-0.5 md:px-3 md:py-1 rounded-lg backdrop-blur-sm z-0">
              {node.label}
            </span>
          </div>
        ))}
      </div>

      {/* Title and HUD */}
      <div className="absolute top-8 left-6 md:top-12 md:left-12 pointer-events-none z-10 max-w-[80%]">
        <h2 className="text-4xl md:text-7xl font-romantic text-pink-200 drop-shadow-[0_0_20px_rgba(255,77,148,0.7)] leading-tight">
          El Mapa de Nuestra Ohana
        </h2>
        <p className="text-xl md:text-3xl font-handwritten mt-3 md:mt-6 text-purple-100/90 italic tracking-wider leading-relaxed">
          {isTouch
            ? 'Toca las estrellas para revivir nuestros momentos...'
            : 'Conecta las estrellas para revivir nuestros momentos...'}
        </p>
      </div>

      {/* Custom Cursor */}
      {!isTouch && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: mouse.x, top: mouse.y }}
        >
          <div className="w-8 h-8 rounded-full border-2 border-pink-300/60 flex items-center justify-center bg-pink-500/10 backdrop-blur-[2px]">
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_12px_white]" />
          </div>
        </div>
      )}

      {/* Love Letter Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowLetter(true)}
        className="fixed bottom-8 right-8 z-50 bg-pink-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(255,77,148,0.5)] flex items-center gap-3 hover:bg-pink-600 transition-colors"
      >
        <Mail size={24} />
        <span className="font-handwritten text-xl pr-2">Para ti</span>
      </motion.button>

      <AnimatePresence>
        {selectedNode && (
          <Polaroid node={selectedNode} onClose={() => setSelectedNode(null)} />
        )}
        {showLetter && (
          <LoveLetter onClose={() => setShowLetter(false)} />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(13,7,27,0.4)_100%)] z-0" />
    </div>
  )
}
