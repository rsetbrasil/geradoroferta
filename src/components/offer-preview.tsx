"use client";

import type { Offer } from "@/lib/types";
import { type ReactNode } from "react";

interface OfferPreviewProps {
  offer: Offer;
  children: ReactNode;
}

export function OfferPreview({ offer, children }: OfferPreviewProps) {
  return (
    <div
      id="print-area"
      className="flex w-full aspect-[210/297] bg-white rounded-lg shadow-lg border transition-all duration-300"
    >
      {children}
    </div>
  );
}
