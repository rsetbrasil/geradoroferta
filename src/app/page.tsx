"use client";

import { useState, useEffect } from "react";
import type { Offer, Template } from "@/lib/types";
import { OfferForm } from "@/components/offer-form";
import { OfferPreview } from "@/components/offer-preview";
import { TemplateSelector } from "@/components/template-selector";
import { Header } from "@/components/header";
import { ClassicDealTemplate } from "@/components/templates/classic-deal";
import { ModernSplashTemplate } from "@/components/templates/modern-splash";
import { BlackFridayTemplate } from "@/components/templates/black-friday";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

const templates: Template[] = [
  { id: "black-friday", name: "Black Friday", component: BlackFridayTemplate },
  { id: "classic", name: "Oferta Clássica", component: ClassicDealTemplate },
  { id: "modern", name: "Splash Moderno", component: ModernSplashTemplate },
];

export default function Home() {
  const [offer, setOffer] = useState<Offer>({
    description: "CERVEJA LONG NECK SOL 330ML",
    price: "8,00",
    discount: "*LIMÃO & FRUTAS VERMELHAS*",
    validity: {
      from: undefined,
      to: undefined,
    },
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates[0].id
  );
  
  // Set initial date on client to avoid hydration errors
  useEffect(() => {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 7);

    setOffer(prevOffer => ({
        ...prevOffer,
        validity: {
            from: fromDate,
            to: toDate,
        }
    }));
  }, []);

  const handleOfferChange = (newOfferData: Offer) => {
    setOffer(newOfferData);
  };

  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="no-print flex flex-col gap-8">
            <OfferForm offer={offer} onOfferChange={handleOfferChange} />
            <TemplateSelector
              templates={templates}
              selectedTemplateId={selectedTemplateId}
              onSelectTemplate={setSelectedTemplateId}
            />
          </div>
          <div
            id="print-area-container"
            className="flex flex-col gap-4 sticky top-24"
          >
            <OfferPreview
              templateComponent={selectedTemplate.component}
              offer={offer}
            />
            <Button
              onClick={handlePrint}
              className="w-full lg:w-auto self-end no-print"
              size="lg"
            >
              <Printer className="mr-2 h-5 w-5" />
              Imprimir Oferta
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
