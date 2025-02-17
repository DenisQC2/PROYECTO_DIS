"use client";

import { useState } from "react";
import Link from "next/link";
import NewsCarousel from "./components/news-carousel"; // Importamos el carrusel aquí

export default function Home() {
  const [isHovered, setIsHovered] = useState("");

  return (
    <div className="flex min-h-screen bg-[#e6e9ff]">
      {/* Barra de navegación */}
      <nav className="w-64 bg-white p-4 space-y-2">
        <Link
          href="/metro"
          className={`block p-4 text-white font-bold rounded-full transition-colors ${
            isHovered === "metro" ? "bg-blue-700" : "bg-blue-600"
          } text-center`}
          onMouseEnter={() => setIsHovered("metro")}
          onMouseLeave={() => setIsHovered("")}
        >
          Metro de Lima
        </Link>

        <Link
          href="/corredores"
          className={`block p-4 text-white font-bold rounded-full transition-colors ${
            isHovered === "corredores" ? "bg-blue-700" : "bg-blue-600"
          } text-center`}
          onMouseEnter={() => setIsHovered("corredores")}
          onMouseLeave={() => setIsHovered("")}
        >
          Corredores
        </Link>

        <button
          className={`w-full p-4 text-white font-bold rounded-full transition-colors ${
            isHovered === "atencion" ? "bg-blue-700" : "bg-blue-600"
          } text-center`}
          onMouseEnter={() => setIsHovered("atencion")}
          onMouseLeave={() => setIsHovered("")}
        >
          Atención al pasajero
        </button>

        <button
          className={`w-full p-4 text-white font-bold rounded-full transition-colors ${
            isHovered === "tarifas" ? "bg-blue-700" : "bg-blue-600"
          } text-center`}
          onMouseEnter={() => setIsHovered("tarifas")}
          onMouseLeave={() => setIsHovered("")}
        >
          Tarifas
        </button>

        <button
          className={`w-full p-4 text-white font-bold rounded-full transition-colors ${
            isHovered === "tarjeta" ? "bg-blue-700" : "bg-blue-600"
          } text-center`}
          onMouseEnter={() => setIsHovered("tarjeta")}
          onMouseLeave={() => setIsHovered("")}
        >
          Adquiere tu tarjeta
        </button>
      </nav>

      {/* Contenido Principal */}
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-blue-900">
          Bienvenido al Sistema de Transporte de Lima
        </h1>

        {/* Sección de Noticias */}
        <div className="mt-6">
          <NewsCarousel />
        </div>
      </main>
    </div>
  );
}
