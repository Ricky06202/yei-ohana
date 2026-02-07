import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface PolaroidProps {
  node: {
    label: string
    memory: string
    image?: string
    fit?: 'cover' | 'contain'
  }
  onClose: () => void
}

export const Polaroid: React.FC<PolaroidProps> = ({ node, onClose }) => {
  const imageFit = node.fit || 'cover'

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5, y: 20 }}
      animate={{ opacity: 1, scale: 1, rotate: 2, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: -5, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        className="relative bg-white p-3 pb-10 md:p-4 md:pb-12 shadow-2xl max-w-[90%] md:max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ transform: 'rotate(2deg)' }}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 p-3 bg-white text-gray-800 rounded-full shadow-lg border border-gray-100 hover:text-pink-500 transition-colors z-20"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative group flex items-center justify-center">
          {node.image ? (
            <img
              src={node.image}
              alt={node.label}
              className={`w-full h-full ${imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-pink-300 italic p-8 text-center bg-gradient-to-br from-pink-50 to-purple-50">
              <div className="flex flex-col items-center gap-3">
                <span className="text-4xl animate-bounce">✨</span>
                <span className="font-handwritten text-xl">
                  Recuerdo Mágico
                </span>
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-black/5 pointer-events-none mix-blend-overlay" />
        </div>

        <div className="mt-6 text-center px-4">
          <h3 className="font-romantic text-3xl md:text-5xl text-gray-800 leading-tight">
            {node.label}
          </h3>
          <p className="font-handwritten text-xl md:text-3xl text-gray-600 mt-4 leading-snug">
            {node.memory}
          </p>
        </div>

        {/* Polaroid texture overlay */}
        <div className="absolute inset-0 pointer-events-none border-[1px] border-black/5" />
        <div className="absolute inset-x-0 bottom-0 h-8 md:h-10 bg-gradient-to-t from-gray-50/50 to-transparent pointer-events-none" />
      </motion.div>
    </motion.div>
  )
}
