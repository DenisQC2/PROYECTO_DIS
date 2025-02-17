"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Loader2, CreditCard, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const validateCardNumber = (number: string) => {
    return /^\d{16}$/.test(number);
  };

  const handleRecharge = async () => {
    if (!validateCardNumber(cardNumber)) {
      toast({
        title: "Error",
        description:
          "Por favor ingresa un número de tarjeta válido (16 dígitos)",
        variant: "destructive",
      });
      return;
    }

    if (!selectedAmount) {
      toast({
        title: "Error",
        description: "Por favor selecciona un monto",
        variant: "destructive",
      });
      return;
    }

    if (!selectedPayment) {
      toast({
        title: "Error",
        description: "Por favor selecciona un método de pago",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast({
        title: "¡Recarga exitosa!",
        description: `Se ha recargado S/ ${selectedAmount} a tu tarjeta`,
      });
      // Reset form
      setCardNumber("");
      setSelectedAmount(null);
      setSelectedPayment(null);
      setShowForm(false); // Volver a la página inicial después de una recarga exitosa
    } catch (error) {
      toast({
        title: "Error",
        description:
          "Hubo un error al procesar tu recarga. Por favor intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fff5f5]">
      <div className="bg-red-600 p-4 sticky top-0 z-10 shadow-md">
        <div className="container mx-auto flex items-center gap-4">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KCKbqL1IPO6ja0uDf4ig6pgr6KCd3a.png"
            alt="Corredores Logo"
            width={50}
            height={50}
            className="rounded-full bg-white p-1"
          />
          <h1 className="text-white text-2xl font-bold">Corredores</h1>
        </div>
      </div>

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
                  <CardTitle className="text-3xl">
                    Bienvenido a Corredores
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Sistema de recarga de tarjetas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => setShowForm(true)}
                    className="bg-[#40c9db] hover:bg-[#3bb5c4] text-white px-8 py-6 text-lg"
                  >
                    <CreditCard className="mr-2 h-6 w-6" />
                    Recargar mi tarjeta
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
                  <CardTitle className="text-center">
                    RECARGA TU TARJETA
                  </CardTitle>
                  <CardDescription className="text-center">
                    Recarga tu tarjeta de manera rápida y segura
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      placeholder="Ingresa tu número de tarjeta"
                      value={cardNumber}
                      onChange={(e) =>
                        setCardNumber(
                          e.target.value.replace(/\D/g, "").slice(0, 16)
                        )
                      }
                      className="w-full p-3 bg-[#40c9db] text-white placeholder:text-white/90"
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
                              ? "border-[#40c9db] bg-[#40c9db]/10"
                              : "hover:border-[#40c9db]/50"
                          }`}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <Image
                            src={method.image || "/placeholder.svg"}
                            alt={method.name}
                            width={60}
                            height={30}
                            className="w-full object-contain h-12"
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
                    className="w-full bg-[#40c9db] hover:bg-[#3bb5c4]"
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

                  <div className="text-center">
                    <a
                      href="#"
                      className="text-[#40c9db] hover:underline text-sm"
                    >
                      ¿Cómo verificar mi saldo?
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
