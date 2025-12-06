// This file is now a static data provider for the initial template seeding.
// The actual rendering is handled by DynamicTemplateRenderer.tsx
import type { Offer } from "@/lib/types";

export const ClassicDealTemplate: React.FC<{ offer: Offer }> = () => {
  return (
    <div className="font-body w-full h-full flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-gray-300 bg-white text-gray-800">
      <div className="w-full">
        {{#if discount}}
          <div className="mb-6">
            <span className="inline-block bg-accent text-accent-foreground font-bold text-2xl md:text-4xl px-6 py-3 rounded-full">
              {{discount}}
            </span>
          </div>
        {{/if}}

        <h2 className="font-headline text-3xl md:text-5xl font-bold leading-tight mb-4">
          {{description}}
        </h2>
        
        <div className="flex items-baseline justify-center gap-4 mb-8">
            <p className="text-5xl md:text-7xl font-bold text-primary">
                R${{price}}
            </p>
        </div>

        <div className="w-full h-[2px] bg-gray-300 my-8"></div>

        <div className="text-sm text-gray-500">
          <p className="font-bold">Oferta válida</p>
          <p>de {{validity.from}} até {{validity.to}}</p>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          *Termos e condições podem ser aplicados. Oferta não acumulativa com outras promoções.
        </p>
      </div>
    </div>
  );
};
