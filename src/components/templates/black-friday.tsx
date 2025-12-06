import type { Offer } from "@/lib/types";

export const BlackFridayTemplate: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { description, price, discount } = offer;
  const [integerPart, decimalPart] = (price || "0,00").split(',');

  return (
    <div className="font-body w-full h-full flex flex-col bg-white text-black relative">
      {/* Header Section */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
            <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white text-xs font-bold">
                    <span className="text-[8px]">BLACK</span>
                    <span className="text-[10px] -mt-1">FRIDAY</span>
                </div>
            </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-20 h-20 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black border-4 border-black">
            <span className="text-xs font-bold">MR BEBIDAS</span>
            <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
              MR
            </div>
            <span className="text-xs font-bold">DISTRIBUIDORA</span>
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-red-600"></div>

      {/* Background Swirl */}
      <div 
        className="absolute inset-0 bg-repeat bg-center"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0,
        }}
      ></div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4 z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-4 uppercase">
          {description || "Descrição do Produto"}
        </h2>
        
        <div className="flex items-start justify-center gap-1 mb-2">
            <span className="text-3xl font-bold mt-2">R$</span>
            <span className="text-8xl md:text-9xl font-extrabold leading-none">
                {integerPart}
            </span>
            <div className="flex flex-col items-start">
                <span className="text-3xl font-bold -mb-2">,{decimalPart}</span>
                <span className="text-2xl font-bold">UND</span>
            </div>
        </div>

        {discount && (
             <p className="font-bold text-lg text-gray-700">* {discount} *</p>
        )}
      </div>

      {/* Footer */}
      <div className="bg-red-600 text-white text-center py-3 z-10">
        <h3 className="text-3xl font-extrabold tracking-wide">IMPERDÍVEL</h3>
      </div>
    </div>
  );
};
