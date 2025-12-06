'use client';

// This file is a static data provider for the initial template seeding.
// It exports a string of HTML with Handlebars-like syntax for dynamic rendering.
export const modernSplashTemplateString = `
<div class="font-body w-full h-full flex flex-col justify-between p-8 bg-gray-800 text-white relative overflow-hidden">
    <div class="absolute -right-16 -top-16 w-48 h-48 bg-primary rounded-full opacity-80"></div>
    <div class="absolute -left-24 bottom-16 w-64 h-64 bg-accent rounded-full opacity-50"></div>
    
    <div class="z-10">
    <h2 class="font-headline text-4xl md:text-6xl font-extrabold leading-none tracking-tighter">
        {{description}}
    </h2>
    </div>

    <div class="z-10 flex flex-col items-end text-right">
    {{#if discount}}
        <div class="mb-2">
        <span class="bg-accent text-accent-foreground font-bold text-2xl md:text-4xl px-4 py-2 rounded-md">
            {{discount}}
        </span>
        </div>
    {{/if}}
    
    <p class="text-6xl md:text-8xl font-bold text-primary leading-none tracking-tighter">
        R$\{{price}}
    </p>

    <div class="mt-4 text-xs text-gray-300 font-mono">
        <p>VÁLIDO: {{validity.from.modern}} - {{validity.to.modern}}</p>
    </div>
    </div>
</div>
`;
