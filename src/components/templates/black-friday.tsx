import type { Offer } from "@/lib/types";

export const BlackFridayTemplate: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { description, price, discount, unit, logoUrl, productImageUrl } = offer;
  const [integerPart, decimalPart] = (price || "0,00").split(',');

  return (
    <div className="font-body w-full h-full flex flex-col bg-white text-black relative">
      {/* Header Section */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex flex-col items-center justify-center text-center">
            <h3 className="text-4xl font-bold uppercase text-yellow-400">Super Oferta!</h3>
            <div className="relative w-[150px] h-[120px] mt-2">
                {productImageUrl ? (
                    <img src={productImageUrl} alt="Produto" className="w-full h-full object-contain" />
                ) : (
                    <div className="w-full h-full bg-black"></div>
                )}
            </div>
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
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 uppercase text-black">
          {description || "Descrição do Produto"}
        </h2>
        
        <div className="flex items-start justify-center gap-1 mb-2 text-black">
            <span className="text-4xl font-bold mt-4">R$</span>
            <span className="text-9xl md:text-[160px] font-extrabold leading-none">
                {integerPart}
            </span>
            <div className="flex flex-col items-start mt-2">
                <span className="text-4xl font-bold -mb-2">,{decimalPart}</span>
                <span className="text-3xl font-bold">{unit || "UND"}</span>
            </div>
        </div>

        {discount && (
             <p className="font-bold text-xl text-yellow-400 bg-black px-2 py-1">* {discount} *</p>
        )}
      </div>

      {/* Footer */}
      <div className="bg-red-600 text-white text-center py-3 z-10">
        <h3 className="text-4xl font-extrabold tracking-wide">IMPERDÍVEL</h3>
      </div>
    </div>
  );
};
