import type { Offer } from "@/lib/types";

export const BlackFridayTemplate: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { description, price, discount } = offer;
  const [integerPart, decimalPart] = (price || "0,00").split(',');

  return (
    <div className="font-body w-full h-full flex flex-col bg-white text-black relative">
      {/* Header Section */}
      <div className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative w-[150px] h-[120px]">
            {/* Shopping Cart Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="120" viewBox="0 0 48 48" fill="none" className="absolute -top-4 -left-8">
              <path d="M12.9688 12.3333L10.3125 33H38.25L40.9062 12.3333H12.9688Z" stroke="#B0B0B0" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M10.3125 33H4.5C4.5 33 4.5 31.6667 6.5625 30.3333" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M38.25 33H44.0625C44.0625 33 44.0625 31.6667 42 30.3333" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.0234 18.1667H33.5391" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/>
              <path d="M14 24.3333H34.5625" stroke="#B0B0B0" strokeWidth="2" strokeLinecap="round"/>
              <path d="M7.625 33L6.5625 38.3333H42L41.5312 33" stroke="#B0B0B0" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M18.8125 12.3333V9C18.8125 7.66667 19.3438 6 21.4062 6H27.1875C29.25 6 29.7812 7.66667 29.7812 9V12.3333" stroke="#D83933" strokeWidth="2"/>
              <path d="M21.4062 42.5C23.2373 42.5 24.7188 41.1593 24.7188 39.5C24.7188 37.8407 23.2373 36.5 21.4062 36.5C19.5752 36.5 18.0938 37.8407 18.0938 39.5C18.0938 41.1593 19.5752 42.5 21.4062 42.5Z" fill="#D83933" stroke="white" strokeWidth="1.5"/>
              <path d="M34.5625 42.5C36.3935 42.5 37.875 41.1593 37.875 39.5C37.875 37.8407 36.3935 36.5 34.5625 36.5C32.7315 36.5 31.25 37.8407 31.25 39.5C31.25 41.1593 32.7315 42.5 34.5625 42.5Z" fill="#D83933" stroke="white" strokeWidth="1.5"/>
            </svg>
            {/* Black Friday Skewed Box */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28">
              <div className="absolute w-[90px] h-[70px] bg-black top-2 left-2 transform -skew-y-12 flex flex-col items-center justify-center text-white p-2 shadow-2xl ring-2 ring-gray-500">
                <span className="font-bold text-[12px] leading-tight tracking-tighter">BLACK</span>
                <span className="font-extrabold text-[16px] leading-none tracking-tighter">FRIDAY</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* MR Bebidas Logo */}
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-black border-4 border-black relative">
            <span className="absolute top-1 text-[10px] font-bold">MR BEBIDAS</span>
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-lg relative">
              <span className="absolute left-[-1px] top-1/2 -translate-y-1/2 text-black text-3xl font-extrabold" style={{fontFamily: 'Arial, sans-serif'}}>M</span>
              <span className="absolute right-[-1px] top-1/2 -translate-y-1/2 text-black text-3xl font-extrabold -scale-x-100" style={{fontFamily: 'Arial, sans-serif'}}>R</span>
            </div>
            <span className="absolute bottom-1 text-[10px] font-bold">DISTRIBUIDORA</span>
            <div className="absolute inset-0 rounded-full border-2 border-black"></div>
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-red-600"></div>
      
      {/* Background with subtle pattern */}
      <div 
        className="absolute inset-0"
        style={{ 
          zIndex: 0,
          backgroundColor: '#000000',
        }}
      ></div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4 z-10 bg-black">
        <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 uppercase text-white">
          {description || "Descrição do Produto"}
        </h2>
        
        <div className="flex items-start justify-center gap-1 mb-2 text-white">
            <span className="text-4xl font-bold mt-4">R$</span>
            <span className="text-9xl md:text-[160px] font-extrabold leading-none">
                {integerPart}
            </span>
            <div className="flex flex-col items-start mt-2">
                <span className="text-4xl font-bold -mb-2">,{decimalPart}</span>
                <span className="text-3xl font-bold">UND</span>
            </div>
        </div>

        {discount && (
             <p className="font-bold text-xl text-yellow-400">* {discount} *</p>
        )}
      </div>

      {/* Footer */}
      <div className="bg-red-600 text-white text-center py-3 z-10">
        <h3 className="text-4xl font-extrabold tracking-wide">IMPERDÍVEL</h3>
      </div>
    </div>
  );
};
