"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Offer, Template, OfferDocument, Product } from "@/lib/types";
import { OfferForm } from "@/components/offer-form";
import { OfferPreview } from "@/components/offer-preview";
import { TemplateSelector } from "@/components/template-selector";
import { Header } from "@/components/header";
import { ClassicDealTemplate } from "@/components/templates/classic-deal";
import { ModernSplashTemplate } from "@/components/templates/modern-splash";
import { BlackFridayTemplate } from "@/components/templates/black-friday";
import { Button } from "@/components/ui/button";
import { Printer, Loader2 } from "lucide-react";
import { useAuth, useFirestore, useUser, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import { initiateAnonymousSignIn, setDocumentNonBlocking } from "@/firebase";
import { doc, serverTimestamp, collection } from "firebase/firestore";
import { productList as staticProductList } from "@/lib/products";
import debounce from 'lodash.debounce';

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

  const productsRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'products');
  }, [firestore]);

  const { data: productList, isLoading: areProductsLoading } = useCollection<Product>(productsRef);

  // Seed products to firestore if collection is empty
  useEffect(() => {
    if (user && productsRef && !areProductsLoading && productList && productList.length === 0) {
      console.log("Product list is empty, seeding initial data...");
      staticProductList.forEach(product => {
        const productDocRef = doc(productsRef, product.id);
        setDocumentNonBlocking(productDocRef, product, { merge: true });
      });
    }
  }, [user, productsRef, productList, areProductsLoading]);

  // Sign in user anonymously if not logged in
  useEffect(() => {
    if (!isUserLoading && !user && auth) {
      initiateAnonymousSignIn(auth);
    }
  }, [isUserLoading, user, auth]);
  
  // Load offer from Firestore or set initial state
  useEffect(() => {
    const fromDate = new Date();
    const toDate = new Date();
    toDate.setDate(fromDate.getDate() + 7);

    // Base initial state
    const initialOffer: Omit<Offer, 'logoUrl' | 'productImageUrl'> = {
      headlineText: "SUPER OFERTA!",
      description: "CERVEJA LONG NECK SOL 330ML",
      subDescription: "",
      price: "8,00",
      discount: "*LIMÃO & FRUTAS VERMELHAS*",
      unit: "UND",
      validity: { from: fromDate, to: toDate },
      fontSize: 100,
      headlineFontSize: 100,
    };

    if (!isOfferLoading && user) {
      if (offerData) {
        const fromDateDb = offerData.validity?.from ? (offerData.validity.from as any).toDate() : fromDate;
        const toDateDb = offerData.validity?.to ? (offerData.validity.to as any).toDate() : toDate;

        setOffer({
          ...initialOffer,
          ...offerData,
          validity: { from: fromDateDb, to: toDateDb },
        });
      } else {
        setOffer({
          ...initialOffer,
          logoUrl: undefined,
          productImageUrl: undefined,
        });
      }
    }
  }, [offerData, isOfferLoading, user]);

  const debouncedSave = useCallback(
    debounce((newOfferData: Offer) => {
      if (offerRef && user) {
        const dataToSave: { [key: string]: any } = {
          ...newOfferData,
          userId: user.uid,
          updatedAt: serverTimestamp(),
        };

        Object.keys(dataToSave).forEach(key => {
          if (dataToSave[key] === undefined) {
            dataToSave[key] = null;
          }
        });
        
        setDocumentNonBlocking(offerRef, dataToSave, { merge: true });
      }
    }, 500),
    [offerRef, user]
  );

  const handleOfferChange = (newOfferData: Offer) => {
    setOffer(newOfferData);
    debouncedSave(newOfferData);
  };

  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0];

  const handlePrint = () => {
    window.print();
  };
  
  const isLoading = isUserLoading || !offer || areProductsLoading;

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
            <OfferForm 
              offer={offer} 
              onOfferChange={handleOfferChange}
              productList={productList || []}
            />
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
