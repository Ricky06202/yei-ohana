import React from 'react'
import { motion } from 'framer-motion'
import { X, Heart } from 'lucide-react'

interface LoveLetterProps {
  onClose: () => void
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-[#0d071b] overflow-hidden touch-none"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, rotate: -2 }}
        animate={{ scale: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.9, y: 50, rotate: 2 }}
        className="relative bg-[#fff9f0] p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-sm border-8 border-white overscroll-contain touch-pan-y"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)',
          backgroundSize: '20px 20px',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-pink-500 transition-colors"
          aria-label="Cerrar"
        >
          <X size={28} />
        </button>

        <div className="flex flex-col items-center text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-6"
          >
            <Heart size={48} className="text-pink-500 fill-pink-500" />
          </motion.div>

          <h2 className="font-romantic text-4xl md:text-6xl text-pink-600 mb-8 leading-tight">
            Para mi mejor amiga...
          </h2>

          <div className="font-handwritten text-2xl md:text-4xl text-gray-700 space-y-6 md:space-y-8 leading-relaxed">
            <p>
              Quería dedicarte estas palabras porque, en este San Valentín, 
              no podía dejar pasar lo mucho que significas para mí.
            </p>
            
            <p>
              Adoro cada uno de nuestros viajes y planes. Cada momento que 
              pasamos juntos se convierte en un recuerdo que guardo con 
              mucho cariño en mi corazón.
            </p>

            <p>
              Espero de todo corazón que la distancia nunca nos separe. 
              Que sigamos siendo igual de unidos, hoy y siempre, sin importar 
              dónde nos lleve la vida.
            </p>

            <p className="text-pink-600 font-bold">
              Espero que nunca me olvides, así como yo no pienso olvidarme 
              de ti jamás.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-pink-200 w-full italic">
            <p className="font-romantic text-3xl text-pink-500">
              Con todo mi cariño, siempre. ✨
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-4 right-4 opacity-20">
          <Heart size={100} className="text-pink-300" />
        </div>
      </motion.div>
    </motion.div>
  )
}
