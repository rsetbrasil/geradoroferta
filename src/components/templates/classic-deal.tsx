'use client';

// This file is a static data provider for the initial template seeding.
// It exports a string of HTML with Handlebars-like syntax for dynamic rendering.
export const classicDealTemplateString = `
<div class="font-body w-full h-full flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-gray-300 bg-white text-gray-800">
    <div class="w-full">
    {{#if discount}}
        <div class="mb-6">
        <span class="inline-block bg-accent text-accent-foreground font-bold text-2xl md:text-4xl px-6 py-3 rounded-full">
            {{discount}}
        </span>
        </div>
    {{/if}}

    <h2 class="font-headline text-3xl md:text-5xl font-bold leading-tight mb-4">
        {{description}}
    </h2>
    
    <div class="flex items-baseline justify-center gap-4 mb-8">
        <p class="text-5xl md:text-7xl font-bold text-primary">
            R$\{{price}}
        </p>
    </div>

    <div class="w-full h-[2px] bg-gray-300 my-8"></div>

    <div class="text-sm text-gray-500">
        <p class="font-bold">Oferta válida</p>
        <p>de {{validity.from}} até {{validity.to}}</p>
    </div>

    <p class="mt-8 text-xs text-gray-400">
        *Termos e condições podem ser aplicados. Oferta não acumulativa com outras promoções.
    </p>
    </div>
</div>
`;
