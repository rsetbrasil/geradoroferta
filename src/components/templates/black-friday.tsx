'use client';
import type { Offer } from "@/lib/types";

export const BlackFridayTemplate: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { description, subDescription, price, discount, unit, logoUrl, productImageUrl, headlineText, fontSize, headlineFontSize } = offer;
  const [integerPart, decimalPart] = (price || "0,00").split(',');
  const sizeMultiplier = (fontSize || 100) / 100;
  const headlineSizeMultiplier = (headlineFontSize || 100) / 100;

  return (
    <div className="font-body w-full h-full flex flex-col bg-black text-black">
      {/* Header Section */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex flex-col items-start justify-center">
          {headlineText && (
            <h3 className="font-bold uppercase text-yellow-400" style={{ fontSize: `${2.5 * headlineSizeMultiplier}rem` }}>{headlineText}</h3>
          )}
        </div>
        <div className="flex items-center space-x-2">
        {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-24 h-24 rounded-full object-cover border-4 border-black" />
          ) : (
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black border-4 border-black relative">
              <span className="absolute top-1 text-[10px] font-bold">MR BEBIDAS</span>
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg relative">
                <span className="absolute left-[-1px] top-1/2 -translate-y-1/2 text-black text-3xl font-extrabold" style={{fontFamily: 'Arial, sans-serif'}}>M</span>
                <span className="absolute right-[-1px] top-1/2 -translate-y-1/2 text-black text-3xl font-extrabold -scale-x-100" style={{fontFamily: 'Arial, sans-serif'}}>R</span>
              </div>
              <span className="absolute bottom-1 text-[10px] font-bold">DISTRIBUIDORA</span>
              <div className="absolute inset-0 rounded-full border-2 border-black"></div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-4 bg-red-600"></div>
      
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4 z-10 bg-white">
        {productImageUrl && (
          <div className="relative w-[150px] h-[120px] mb-4">
              <img src={productImageUrl} alt="Produto" className="w-full h-full object-contain" />
          </div>
        )}
        <h2 className="font-extrabold leading-tight mb-2 uppercase text-black" style={{ fontSize: `${3 * sizeMultiplier}rem` }}>
          {description || "Descrição do Produto"}
        </h2>
        {subDescription && (
            <p className="font-semibold leading-tight mb-4 text-gray-700" style={{ fontSize: `${2 * sizeMultiplier}rem` }}>{subDescription}</p>
        )}
        
        <div className="flex items-start justify-center gap-1 my-4 text-black">
            <span className="font-bold mt-4" style={{ fontSize: `${2.5 * sizeMultiplier}rem` }}>R$</span>
            <span className="font-extrabold leading-none" style={{ fontSize: `${150 * sizeMultiplier}px`}}>
                {integerPart}
            </span>
            <div className="flex flex-col items-start mt-4">
                <span className="font-bold -mb-2" style={{ fontSize: `${2.5 * sizeMultiplier}rem` }}>,{decimalPart}</span>
                <span className="font-bold" style={{ fontSize: `${2 * sizeMultiplier}rem` }}>{unit || "UND"}</span>
            </div>
        </div>

        {discount && (
             <p className="font-bold bg-black text-yellow-400 px-6 py-3" style={{ fontSize: `${1.5 * sizeMultiplier}rem` }}>* {discount} *</p>
        )}
      </div>

      {/* Footer */}
      <div className="bg-red-600 text-white text-center py-3 z-10">
        <h3 className="text-4xl font-extrabold tracking-wide">IMPERDÍVEL</h3>
      </div>
    </div>
  );
};
