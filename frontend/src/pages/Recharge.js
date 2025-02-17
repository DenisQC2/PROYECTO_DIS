"use client";

import { useState } from "react";

export default function Recharge() {
  const [cardNumber, setCardNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const amounts = [
    { value: 2, label: "S/ 2" },
    { value: 5, label: "S/ 5" },
    { value: 10, label: "S/ 10" },
    { value: 20, label: "S/ 20" },
    { value: 50, label: "S/ 50" },
  ];

  const paymentMethods = [
    {
      id: "bcp",
      name: "BCP",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCKbqL1IPO6ja0uDf4ig6pgr6KCd3a.png",
    },
    {
      id: "yape",
      name: "Yape",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCKbqL1IPO6ja0uDf4ig6pgr6KCd3a.png",
    },
    {
      id: "bbva",
      name: "BBVA",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCKbqL1IPO6ja0uDf4ig6pgr6KCd3a.png",
    },
    {
      id: "mastercard",
      name: "Mastercard",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCKbqL1IPO6ja0uDf4ig6pgr6KCd3a.png",
    },
  ];

  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number);
  };

  const handleRecharge = async () => {
    if (!validateCardNumber(cardNumber)) {
      alert("Por favor ingresa un número de tarjeta válido (16 dígitos)");
      return;
    }

    if (!selectedAmount) {
      alert("Por favor selecciona un monto");
      return;
    }

    if (!selectedPayment) {
      alert("Por favor selecciona un método de pago");
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("¡Recarga exitosa!");
      // Reset form
      setCardNumber("");
      setSelectedAmount(null);
      setSelectedPayment(null);
    } catch (error) {
      alert("Error al procesar la recarga. Por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5]">
      <div className="bg-red-600 p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex items-center gap-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCKbqL1IPO6ja0uDf4ig6pgr6KCd3a.png"
            alt="Corredores Logo"
            className="w-12 h-12 rounded-full bg-white p-1"
          />
          <h1 className="text-white text-2xl font-bold">Corredores</h1>
        </div>
      </div>

      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">RECARGA TU TARJETA</h2>
            <p className="text-gray-600">
              Recarga tu tarjeta de manera rápida y segura
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Ingresa tu número de tarjeta"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
                }
                className="w-full p-3 bg-[#40c9db] text-white placeholder-white/90 rounded-md"
                maxLength={16}
              />
              {cardNumber && !validateCardNumber(cardNumber) && (
                <p className="text-red-500 text-sm mt-1">
                  El número de tarjeta debe tener 16 dígitos
                </p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Selecciona el monto
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {amounts.map((amount) => (
                  <button
                    key={amount.value}
                    onClick={() => setSelectedAmount(amount.value)}
                    className={`p-2 rounded-md transition-all ${
                      selectedAmount === amount.value
                        ? "bg-[#40c9db] text-white"
                        : "border border-[#40c9db] text-[#40c9db] hover:bg-[#40c9db]/10"
                    }`}
                  >
                    {amount.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Métodos de pago</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`p-4 border rounded-lg transition-all cursor-pointer ${
                      selectedPayment === method.id
                        ? "border-[#40c9db] bg-[#40c9db]/10"
                        : "hover:border-[#40c9db]/50"
                    }`}
                    onClick={() => setSelectedPayment(method.id)}
                  >
                    <img
                      src={method.image || "/placeholder.svg"}
                      alt={method.name}
                      className="w-full h-12 object-contain"
                    />
                    <p className="text-center text-sm mt-2">{method.name}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleRecharge}
              disabled={
                !validateCardNumber(cardNumber) ||
                !selectedAmount ||
                !selectedPayment ||
                isLoading
              }
              className={`w-full p-3 rounded-md bg-[#40c9db] text-white font-semibold transition-all
                ${
                  isLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#3bb5c4]"
                }`}
            >
              {isLoading ? "Procesando..." : "Recargar ahora"}
            </button>

            <div className="text-center">
              <a href="#" className="text-[#40c9db] hover:underline text-sm">
                ¿Cómo verificar mi saldo?
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
