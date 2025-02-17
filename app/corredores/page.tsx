"use client";

import { useState } from "react";
import { ChevronDown, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CorredoresPage() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleOption = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const getOptionLabel = (option: string) => {
    const labels: { [key: string]: string } = {
      ubicacion: "Tu ubicación actual",
      paraderos: "Paraderos-209",
      ruta: "Paradero más cercano",
      distritos: "Delimitar distritos",
    };
    return labels[option] || option;
  };

  return (
    <div className="flex min-h-screen bg-[#e6e9ff]">
      <Link
        href="/"
        className="absolute top-4 left-2 p-2 text-blue-600 hover:text-blue-800 transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <nav className="w-64 bg-white p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          CORREDORES
        </h2>

        <div className="space-y-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full p-4 text-white bg-red-600 rounded-full flex justify-center items-center relative transition-colors hover:bg-red-700"
          >
            <span>Corredor Rojo</span>
            <ChevronDown
              className={`absolute right-4 transform transition-transform ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isMenuOpen && (
            <div className="ml-4 space-y-2">
              {["ubicacion", "paraderos", "ruta", "distritos"].map((option) => (
                <label
                  key={option}
                  className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => toggleOption(option)}
                    className="form-checkbox"
                  />
                  <span>{getOptionLabel(option)}</span>
                </label>
              ))}
            </div>
          )}
        </div>
        <button className="w-full p-4 text-white bg-blue-600 rounded-full transition-colors hover:bg-blue-700">
          Horario de atención
        </button>

        <button className="w-full p-4 text-white bg-blue-600 rounded-full transition-colors hover:bg-blue-700">
          Recarga tu tarjeta
        </button>

        {/* Imágenes locales de los corredores */}
        <Image
          src="/images/Logo_corre_rojo.jpg"
          alt="Corredor Rojo"
          width={96}
          height={96}
          className="absolute top-0 left-0 object-contain"
        />
        <Image
          src="/images/Logo_corre_azul.jpg"
          alt="Corredor Azul"
          width={96}
          height={96}
          className="absolute top-24 left-11 object-contain"
        />
        <Image
          src="/images/Logo_corre_morado.jpg"
          alt="Corredor Morado"
          width={96}
          height={96}
          className="absolute top-0 left-24 object-contain"
        />
      </nav>
      <main className="flex-1 p-5">
        <h1 className="text-2xl font-bold text-blue-900">Mapa del corredor</h1>
      </main>
    </div>
  );
}
