'use client';
import type { Offer } from "@/lib/types";
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import React from 'react';

// This is a simplified and unsafe renderer.
// In a real-world scenario, you would want to use a library that safely
// parses and sanitizes the HTML, like `react-html-parser` or build
// a more robust parser that only allows specific elements and attributes.

const interpolations = (offer: Offer) => {
  const [integerPart, decimalPart] = (offer.price || "0,00").split(',');
  const sizeMultiplier = (offer.fontSize || 100) / 100;
  const headlineSizeMultiplier = (offer.headlineFontSize || 100) / 100;
  const formattedFromDate = (date: Date | undefined) => date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : 'N/A';
  const formattedToDate = (date: Date | undefined) => date ? format(date, 'dd/MM/yyyy', { locale: ptBR }) : 'N/A';
  const formattedFromDateModern = (date: Date | undefined) => date ? format(date, 'dd.MM.yy', { locale: ptBR }) : '...';
  const formattedToDateModern = (date: Date | undefined) => date ? format(date, 'dd.MM.yy', { locale: ptBR }) : '...';

  return {
    '{{description}}': offer.description || "Descrição do Produto",
    '{{subDescription}}': offer.subDescription || "",
    '{{price}}': offer.price || "0,00",
    '{{discount}}': offer.discount || "",
    '{{unit}}': offer.unit || "UND",
    '{{headlineText}}': offer.headlineText || "SUPER OFERTA!",
    '{{integerPart}}': integerPart,
    '{{decimalPart}}': decimalPart,
    '{{fontSize}}': offer.fontSize || 100,
    '{{headlineFontSize}}': offer.headlineFontSize || 100,
    '{{sizeMultiplier}}': sizeMultiplier,
    '{{headlineSizeMultiplier}}': headlineSizeMultiplier,
    '{{validity.from}}': formattedFromDate(offer.validity?.from),
    '{{validity.to}}': formattedToDate(offer.validity?.to),
    '{{validity.from.modern}}': formattedFromDateModern(offer.validity?.from),
    '{{validity.to.modern}}': formattedToDateModern(offer.validity?.to),
    '{{logoUrl}}': offer.logoUrl || "DEFAULT_LOGO", // Special keyword for default
    '{{productImageUrl}}': offer.productImageUrl,
  }
}

const renderConditions = (html: string, offer: Offer) => {
    // Basic conditional rendering for if statements
    // This is very limited and only supports simple checks for property existence
    // e.g., {{#if headlineText}}...{{/if}}
    return html.replace(/\{\{#if (\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, key, content) => {
        return offer[key as keyof Offer] ? content : '';
    });
};

const renderImages = (html: string, offer: Offer) => {
    let processedHtml = html;

    // Logo Rendering
    if (offer.logoUrl) {
         processedHtml = processedHtml.replace(/<div data-logo-container><\/div>/g, `<img src="${offer.logoUrl}" alt="Logo" class="w-16 h-16 object-contain" />`);
    } else {
        // This is a very specific replacement for the default logo placeholder.
        processedHtml = processedHtml.replace(/<div data-logo-container><\/div>/g, `
             <div class="w-16 h-16 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black border-2 border-black relative text-[8px] font-bold">
              <span>MR BEBIDAS</span>
              <div class="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-lg font-bold relative">
                <span class="absolute left-[-1px] top-1/2 -translate-y-1/2 text-black text-2xl font-extrabold" style="font-family: Arial, sans-serif;">M</span>
                <span class="absolute right-[-1px] top-1/2 -translate-y-1/2 text-black text-2xl font-extrabold -scale-x-100" style="font-family: Arial, sans-serif;">R</span>
              </div>
              <span>DISTRIBUIDORA</span>
              <div class="absolute inset-0 rounded-full border border-black"></div>
            </div>
        `);
    }

    // Product Image Rendering
    if (offer.productImageUrl) {
        processedHtml = processedHtml.replace(/<div data-product-image-container><\/div>/g, `<div class="relative w-[150px] h-[120px] mb-4"><img src="${offer.productImageUrl}" alt="Produto" class="w-full h-full object-contain" /></div>`);
    } else {
        processedHtml = processedHtml.replace(/<div data-product-image-container><\/div>/g, '');
    }


    return processedHtml;
};

const renderStyles = (html: string, offer: Offer) => {
    const sizeMultiplier = (offer.fontSize || 100) / 100;
    const headlineSizeMultiplier = (offer.headlineFontSize || 100) / 100;

    const styleRegex = /style="([^"]*)"/g;
    return html.replace(styleRegex, (match, styleString) => {
        let newStyleString = styleString;
        newStyleString = newStyleString.replace(/var\(--size-multiplier\)/g, String(sizeMultiplier));
        newStyleString = newStyleString.replace(/var\(--headline-size-multiplier\)/g, String(headlineSizeMultiplier));
        return `style="${newStyleString}"`;
    });
};


export const DynamicTemplateRenderer: React.FC<{ templateData: string, offer: Offer }> = ({ templateData, offer }) => {
  
  let processedHtml = templateData;

  // 1. Handle conditional blocks
  processedHtml = renderConditions(processedHtml, offer);

  // 2. Handle image placeholders
  processedHtml = renderImages(processedHtml, offer);

  // 3. Handle simple value interpolations
  const replacements = interpolations(offer);
  for (const [key, value] of Object.entries(replacements)) {
      processedHtml = processedHtml.replace(new RegExp(key, 'g'), String(value));
  }

  // 4. Handle dynamic styles
  processedHtml = renderStyles(processedHtml, offer);

  return <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: processedHtml }} />;
};
