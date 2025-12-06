// This file is now a static data provider for the initial template seeding.
// The actual rendering is handled by DynamicTemplateRenderer.tsx
'use client';
import type { Offer } from "@/lib/types";

export const BlackFridayTemplate: React.FC<{ offer: Offer }> = () => {
  return (
    <div className="font-body w-full h-full flex flex-col bg-white text-black print:justify-between">
      {/* Header Section */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex flex-col items-start justify-center">
          {{#if headlineText}}
            <h3 className="font-bold uppercase text-yellow-400" style="font-size: calc(2.5rem * var(--headline-size-multiplier));">{{headlineText}}</h3>
          {{/if}}
        </div>
        <div data-logo-container></div>
      </div>
      <div className="w-full h-4 bg-red-600"></div>
      
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center p-4 bg-white">
        <div data-product-image-container></div>
        <h2 className="font-extrabold leading-tight mb-2 uppercase text-black" style="font-size: calc(3rem * var(--size-multiplier));">
          {{description}}
        </h2>
        {{#if subDescription}}
            <p className="font-semibold leading-tight mb-4 text-gray-700" style="font-size: calc(2rem * var(--size-multiplier));">{{subDescription}}</p>
        {{/if}}
        
        <div className="flex items-start justify-center gap-1 my-4 text-black">
            <span className="font-bold mt-4" style="font-size: calc(2.5rem * var(--size-multiplier));">R$</span>
            <span className="font-extrabold leading-none" style="font-size: calc(150px * var(--size-multiplier));">
                {{integerPart}}
            </span>
            <div className="flex flex-col items-start mt-4">
                <span className="font-bold -mb-2" style="font-size: calc(2.5rem * var(--size-multiplier));">,{{decimalPart}}</span>
                <span className="font-bold" style="font-size: calc(2rem * var(--size-multiplier));">{{unit}}</span>
            </div>
        </div>

        {{#if discount}}
             <p className="font-bold bg-black text-yellow-400 px-6 py-3" style="font-size: calc(1.5rem * var(--size-multiplier));">* {{discount}} *</p>
        {{/if}}
      </div>

      {/* Footer */}
      <div className="bg-red-600 text-white text-center py-3">
        <h3 className="text-4xl font-extrabold tracking-wide">IMPERDÍVEL</h3>
      </div>
    </div>
  );
};
