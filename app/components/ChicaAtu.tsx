"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function ChicaAtu() {
  const pathname = usePathname();

  if (pathname !== "/") {
    return null; // No renderiza la imagen si no estás en la página inicial
  }

  return (
    <Image
      src="/images/Chica_ATU.png"
      alt="Chica ATU"
      width={283}
      height={298}
      className="absolute bottom-4 left-0"
    />
  );
}
