'use client';

// This file is a static data provider for the initial template seeding.
// It exports a string of HTML with Handlebars-like syntax for dynamic rendering.
export const blackFridayTemplateString = `
<div class="font-body w-full h-full flex flex-col bg-white text-black print:justify-between">
    <div class="bg-black text-white p-4 flex justify-between items-center">
        <div class="flex flex-col items-start justify-center">
            {{#if headlineText}}
            <h3 class="font-bold uppercase text-yellow-400" style="font-size: calc(2.5rem * var(--headline-size-multiplier));">{{headlineText}}</h3>
            {{/if}}
        </div>
        <div data-logo-container></div>
    </div>
    <div class="w-full h-1 bg-red-600"></div>
    <div class="flex flex-col items-center justify-center text-center p-4 bg-white">
        <div data-product-image-container></div>
        <h2 class="font-extrabold leading-tight mb-2 uppercase text-black" style="font-size: calc(3rem * var(--size-multiplier));">
            {{description}}
        </h2>
        {{#if subDescription}}
            <p class="font-semibold leading-tight mb-4 text-gray-700" style="font-size: calc(2rem * var(--size-multiplier));">{{subDescription}}</p>
        {{/if}}
        
        <div class="flex items-center justify-center gap-2 my-4 text-black">
            <span class="font-bold self-start" style="font-size: calc(2.5rem * var(--size-multiplier));">R$</span>
            <span class="font-extrabold leading-none" style="font-size: calc(10rem * var(--size-multiplier));">
                {{integerPart}}
            </span>
            <div class="flex flex-col items-start self-end">
                <span class="font-bold" style="font-size: calc(2.5rem * var(--size-multiplier));">,{{decimalPart}}</span>
                <span class="font-bold" style="font-size: calc(2rem * var(--size-multiplier));">{{unit}}</span>
            </div>
        </div>

        {{#if discount}}
                <p class="font-bold bg-black text-yellow-400 px-6 py-3" style="font-size: calc(1.5rem * var(--size-multiplier));">{{discount}}</p>
        {{/if}}
    </div>

    <div class="bg-red-600 text-white text-center py-3 mt-auto">
        <h3 class="text-4xl font-extrabold tracking-wide">IMPERDÍVEL</h3>
    </div>
</div>
`;
