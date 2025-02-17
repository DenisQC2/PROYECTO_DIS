import type { Metadata } from "next";
import Image from "next/image";
import "./globals.css";
import ChicaAtu from "./components/ChicaAtu"; // Asegúrate de usar la ruta correcta

export const metadata: Metadata = {
  title: "Sistema de Transporte de Lima",
  description: "Portal de información del transporte público de Lima",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        {/* Header */}
        <header className="bg-[#e6e9ff] p-4 flex justify-center items-center gap-8">
          {/* Imagen del logo ATU */}
          <Image
            src="/images/Logo_ATU.png"
            alt="Logo ATU"
            width={200}
            height={40}
            priority
          />
          {/* Imagen del logo del Ministerio */}
          <Image
            src="/images/Logo_Minitran.png"
            alt="Logo Ministerio"
            width={200}
            height={50}
            priority
          />
        </header>

        {/* Contenido principal */}
        <main className="p-5 relative">
          {children}
          {/* Imagen adicional: Chica ATU */}
          <ChicaAtu />
        </main>
      </body>
    </html>
  );
}








