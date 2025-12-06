"use client";

import { useState, useEffect, useMemo } from "react";
import type { Offer, Template, OfferDocument } from "@/lib/types";
import { OfferForm } from "@/components/offer-form";
import { OfferPreview } from "@/components/offer-preview";
import { TemplateSelector } from "@/components/template-selector";
import { Header } from "@/components/header";
import { ClassicDealTemplate } from "@/components/templates/classic-deal";
import { ModernSplashTemplate } from "@/components/templates/modern-splash";
import { BlackFridayTemplate } from "@/components/templates/black-friday";
import { Button } from "@/components/ui/button";
import { Printer, Loader2 } from "lucide-react";
import { useAuth, useFirestore, useUser, useDoc, useMemoFirebase } from "@/firebase";
import { initiateAnonymousSignIn, setDocumentNonBlocking } from "@/firebase";
import { doc, serverTimestamp } from "firebase/firestore";

const templates: Template[] = [
  { id: "black-friday", name: "Black Friday", component: BlackFridayTemplate },
  { id: "classic", name: "Oferta Clássica", component: ClassicDealTemplate },
  { id: "modern", name: "Splash Moderno", component: ModernSplashTemplate },
];

const DEFAULT_OFFER_ID = "singleton";

export default function Home() {
  const [offer, setOffer] = useState<Offer | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates[0].id
  );

  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();

  const offerRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, "offers", `${user.uid}-${DEFAULT_OFFER_ID}`);
  }, [firestore, user]);

  const { data: offerData, isLoading: isOfferLoading } = useDoc<OfferDocument>(offerRef);

  // Sign in user anonymously if not logged in
  useEffect(() => {
    if (!isUserLoading && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);
  
  // Load offer from Firestore or set initial state
  useEffect(() => {
    if (!isOfferLoading && offerData) {
      // Convert Firestore Timestamps to JS Dates
      const fromDate = offerData.validity?.from ? (offerData.validity.from as any).toDate() : new Date();
      const toDate = offerData.validity?.to ? (offerData.validity.to as any).toDate() : new Date();
      toDate.setDate(fromDate.getDate() + 7);

      setOffer({
        ...offerData,
        validity: { from: fromDate, to: toDate },
      });
    } else if (!isOfferLoading && !offerData && user) {
        // No data in Firestore, set initial client-side state
        const fromDate = new Date();
        const toDate = new Date();
        toDate.setDate(fromDate.getDate() + 7);
        const initialOffer: Offer = {
            description: "CERVEJA LONG NECK SOL 330ML",
            price: "8,00",
            discount: "*LIMÃO & FRUTAS VERMELHAS*",
            unit: "UND",
            validity: { from: fromDate, to: toDate },
            logoUrl: undefined,
            productImageUrl: undefined,
        };
        setOffer(initialOffer);
    }
  }, [offerData, isOfferLoading, user]);


  const handleOfferChange = (newOfferData: Offer) => {
    setOffer(newOfferData);
    if (offerRef && user) {
      // Save to Firestore non-blockingly
      // We must include the userId to pass security rules for writes.
      const dataToSave = {
        ...newOfferData,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      };
      setDocumentNonBlocking(offerRef, dataToSave, { merge: true });
    }
  };

  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handlePrint = () => {
    window.print();
  };
  
  const isLoading = isUserLoading || isOfferLoading || !offer;

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
    )
  }

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
