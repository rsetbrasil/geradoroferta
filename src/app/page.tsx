"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import type { Offer, Template, OfferDocument, Product } from "@/lib/types";
import { OfferForm } from "@/components/offer-form";
import { OfferPreview } from "@/components/offer-preview";
import { TemplateSelector } from "@/components/template-selector";
import { Header } from "@/components/header";
import { blackFridayTemplateString } from "@/components/templates/black-friday";
import { classicDealTemplateString } from "@/components/templates/classic-deal";
import { modernSplashTemplateString } from "@/components/templates/modern-splash";
import { DynamicTemplateRenderer } from "@/components/templates/dynamic-renderer";
import { Button } from "@/components/ui/button";
import { Printer, Loader2 } from "lucide-react";
import { useAuth, useFirestore, useUser, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import { initiateAnonymousSignIn, setDocumentNonBlocking, addDocumentNonBlocking } from "@/firebase";
import { doc, serverTimestamp, collection } from "firebase/firestore";
import { productList as staticProductList } from "@/lib/products";
import debounce from 'lodash.debounce';

const DEFAULT_OFFER_ID = "singleton";

const staticTemplates: Omit<Template, 'id' | 'userId'>[] = [
  { name: "Black Friday", layoutData: blackFridayTemplateString },
  { name: "Oferta Clássica", layoutData: classicDealTemplateString },
  { name: "Splash Moderno", layoutData: modernSplashTemplateString },
];


export default function Home() {
  const [offer, setOffer] = useState<Offer | undefined>(undefined);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');

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

  const templatesRef = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'templates');
  }, [firestore]);

  const { data: templates, isLoading: areTemplatesLoading } = useCollection<Template>(templatesRef);

   // Seed initial data (products and templates) if collections are empty
  useEffect(() => {
    if (user && firestore && !areProductsLoading && productList && productList.length === 0) {
      console.log("Product list is empty, seeding initial data...");
      staticProductList.forEach(product => {
        const productDocRef = doc(productsRef, product.id);
        setDocumentNonBlocking(productDocRef, product, { merge: true });
      });
    }
    if (user && firestore && !areTemplatesLoading && templates && templates.length === 0) {
      console.log("Templates list is empty, seeding initial data...");
      staticTemplates.forEach(template => {
        addDocumentNonBlocking(templatesRef, { ...template, userId: user.uid });
      });
    }
  }, [user, firestore, productList, areProductsLoading, templates, areTemplatesLoading, productsRef, templatesRef]);

  // Set default selected template
  useEffect(() => {
    if (!selectedTemplateId && templates && templates.length > 0) {
      setSelectedTemplateId(templates[0].id);
    }
  }, [templates, selectedTemplateId]);

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

  const handleOfferChange = useCallback((newOfferData: Offer) => {
      setOffer(newOfferData);
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
    },
    [offerRef, user]
  );
  
  const debouncedOfferChange = useMemo(() => debounce(handleOfferChange, 500), [handleOfferChange]);

  const selectedTemplate = useMemo(() => 
    templates?.find((t) => t.id === selectedTemplateId),
    [templates, selectedTemplateId]
  );

  const handlePrint = () => {
    window.print();
  };
  
  const isLoading = isUserLoading || !offer || areProductsLoading || areTemplatesLoading || !selectedTemplate;

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
              onOfferChange={debouncedOfferChange}
              productList={productList || []}
            />
            <TemplateSelector
              templates={templates || []}
              selectedTemplateId={selectedTemplateId}
              onSelectTemplate={setSelectedTemplateId}
            />
          </div>
          <div
            id="print-area-container"
            className="flex flex-col gap-4 sticky top-24"
          >
            <OfferPreview
              offer={offer}
            >
                {selectedTemplate && <DynamicTemplateRenderer templateData={selectedTemplate.layoutData} offer={offer} />}
            </OfferPreview>

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
