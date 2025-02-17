"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface NewsItem {
  id: number
  title: string
  description: string
  image: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: " 280 Mil Usuarios Seguirán Usando los Corredores",
    description:
      "La ATU y las empresas concesionarias han llegado a un acuerdo para garantizar la continuidad del servicio de los corredores complementarios. Esto beneficiará a miles de pasajeros que dependen de este sistema de transporte todos los días.",
    image: "/images/noticia_1.png",
  },
  {
    id: 2,
    title: "Nueva Frecuencia de Llegada de los Trenes",
    description:
      "A partir de diciembre, los trenes de la Línea 1 del Metro de Lima contarán con una nueva programación de llegada. La frecuencia variará según el día de la semana, optimizando el tiempo de espera y mejorando la experiencia de los pasajeros.",
    image: "/images/noticia_2.png",
  },
  {
    id: 3,
    title: "Plan de Desvío Vehicular en la Línea 2 del Metro",
    description:
      "Debido a los trabajos de construcción de la Línea 2, se ha implementado un plan de desvío en la estación Carmen de la Legua. La ATU promueve un transporte seguro, moderno y sostenible con esta obra que mejorará la conectividad en Lima.",
    image: "/images/noticia_3.png",
  },
  {
    id: 4,
    title: "Ampliación de la Vía Exclusiva del Corredor Rojo",
    description:
      "Los usuarios del Corredor Rojo podrán disfrutar de una mejor movilidad gracias a la ampliación de la vía exclusiva en avenidas clave como Javier Prado, Sánchez Carrión y La Marina. Esta medida permitirá ahorrar hasta 15 minutos en cada viaje.",
    image: "/images/noticia_4.png",
  },
]

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<"left" | "right">("right")

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection("right")
      setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left")
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setDirection("left")
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setDirection("right")
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1))
  }

  return (
    <div className="w-full max-w-[1200px] h-[500px] mx-auto rounded-lg shadow-lg overflow-hidden bg-white">
      <div className="relative h-[530px]">
        {/* Background Image */}
        <Image
          src={newsItems[currentIndex].image || "/placeholder.svg"}
          alt={newsItems[currentIndex].title}
          width={1200}  // Ajusta según el tamaño del carrusel
          height={200}
          className="object-contain"
        />

        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Slide content */}
        <div
          className={`absolute inset-0 flex items-end justify-center p-4 pb-20 transition-opacity duration-500 ${
            direction === "right" ? "animate-fadeInRight" : "animate-fadeInLeft"
          }`}
          key={newsItems[currentIndex].id}
        >
          <div className="text-white text-center w-full px-8">
            <h2 className="text-3xl font-bold mb-4">{newsItems[currentIndex].title}</h2>
            <p className="text-lg opacity-90">{newsItems[currentIndex].description}</p>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Navigation dots */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-10">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

