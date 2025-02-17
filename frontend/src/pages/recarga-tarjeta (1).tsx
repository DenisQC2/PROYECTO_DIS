"use client";
import React, { useState } from "react";
import { Loader2, CreditCard, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

import { Button } from "../components/Ui/button";
import { Input } from "../components/Ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/Ui/card";

export default function RecargaTarjeta() {
  const [cardNumber, setCardNumber] = useState("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const amounts = [
    { value: 2, label: "S/ 2" },
    { value: 5, label: "S/ 5" },
    { value: 10, label: "S/ 10" },
    { value: 20, label: "S/ 20" },
    { value: 50, label: "S/ 50" },
  ];

  const paymentMethods = [
    { id: "bcp", name: "BCP", image: "/bcp.png" },
    { id: "yape", name: "Yape", image: "/yape.png" },
    { id: "bbva", name: "BBVA", image: "/bbva.png" },
    { id: "mastercard", name: "Mastercard", image: "/mastercard.png" },
  ];

  const validateCardNumber = (number: string) => /^\d{16}$/.test(number);

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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("¡Recarga exitosa!");
      setCardNumber("");
      setSelectedAmount(null);
      setSelectedPayment(null);
      setShowForm(false);
    } catch (error) {
      alert("Hubo un error al procesar tu recarga. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-8 px-4">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              key="welcome"
              className="flex flex-col items-center justify-center min-h-[60vh]"
            >
              <Card className="w-full max-w-md text-center">
                <CardHeader>
                  <CardTitle className="text-3xl">Recarga tu tarjeta</CardTitle>
                  <CardDescription className="text-lg">
                    Elige un monto y método de pago
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg"
                  >
                    <CreditCard className="mr-2 h-6 w-6" />
                    Recargar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              key="form"
            >
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <Button
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                      className="mr-2"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Volver
                    </Button>
                  </div>
                  <CardTitle>RECARGA TU TARJETA</CardTitle>
                  <CardDescription>
                    Recarga tu tarjeta de manera rápida y segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Número de tarjeta"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 16)
                        )
                      }
                      className="w-full p-3"
                      maxLength={16}
                      pattern="\d*"
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
                        <Button
                          key={amount.value}
                          variant={
                            selectedAmount === amount.value
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setSelectedAmount(amount.value)}
                          className="w-full"
                        >
                          {amount.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Métodos de pago
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`p-4 border rounded-lg transition-all cursor-pointer ${
                            selectedPayment === method.id
                              ? "border-blue-500 bg-blue-50"
                              : "hover:border-blue-300"
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <Image
                            src={method.image || "/placeholder.svg"}
                            alt={method.name}
                            width={60}
                            height={30}
                            className="w-full h-12 object-contain"
                          />
                          <p className="text-center text-sm mt-2">
                            {method.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={handleRecharge}
                    className="w-full"
                    disabled={
                      !validateCardNumber(cardNumber) ||
                      !selectedAmount ||
                      !selectedPayment ||
                      isLoading
                    }
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Procesando...
                      </>
                    ) : (
                      "Recargar ahora"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
