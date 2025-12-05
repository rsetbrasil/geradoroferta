"use client";

import type { Offer, Template } from "@/lib/types";

interface OfferPreviewProps {
  templateComponent: Template["component"];
  offer: Offer;
}

export function OfferPreview({ templateComponent: TemplateComponent, offer }: OfferPreviewProps) {
  return (
    <div
      id="print-area"
      className="w-full aspect-[210/297] bg-white rounded-lg shadow-lg border p-6 transition-all duration-300"
    >
      <TemplateComponent offer={offer} />
    </div>
  );
}
