"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const getOptionLabel = (option: string) => {
  const labels: { [key: string]: string } = {
    ubicacion: "Tu ubicación actual",
    estaciones: "Estaciones",
    ruta: "Estación más cercana",
    distritos: "Delimitar distritos",
  };
  return labels[option] || option;
};

export default function MetroPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  return (
    <div className="flex min-h-screen bg-[#e6e9ff]">
      <Link href="/" className="absolute top-4 left-4 p-2 text-blue-600 hover:text-blue-800 transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <nav className="w-64 bg-white p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">METRO DE LIMA</h2>

        <div className="space-y-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full p-4 text-white bg-green-700 hover:bg-green-800 rounded-full flex justify-center items-center relative transition-colors"
          >
            <span>Línea 1</span>
            <ChevronDown
              className={`absolute right-4 transform transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="ml-4 space-y-2">
              {["ubicacion", "estaciones", "ruta", "distritos"].map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="form-checkbox h-5 w-5"
                  />
                  <span className="text-sm">{getOptionLabel(option)}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <button className="w-full p-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
          Horario de atención
        </button>

        <button className="w-full p-4 text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
          Recarga tu tarjeta
        </button>

        {/* Imágenes locales de las líneas */}
        <div className="flex gap-4 justify-center relative top-6">
          <img
            src="/images/Logo_linea1.png"
            alt="Línea 1"
            className="w-[80px] h-[80px] object-contain"
          />
          <img
            src="/images/Logo_linea2.png"
            alt="Línea 2"
            className="w-[80px] h-[80px] object-contain"
          />
        </div>
      </nav>

      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-blue-900">Mapa del Metro de Lima</h1>
      </main>
    </div>
  );
}

