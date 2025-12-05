import type { Offer } from "@/lib/types";
import { format } from 'date-fns';

export const ModernSplashTemplate: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { description, price, discount, validity } = offer;
  
  const formattedDate = (date: Date | undefined) => date ? format(date, 'dd.MM.yy') : '...';

  return (
    <div className="font-body w-full h-full flex flex-col justify-between p-8 bg-gray-800 text-white relative overflow-hidden">
      <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary rounded-full opacity-80"></div>
      <div className="absolute -left-24 bottom-16 w-64 h-64 bg-accent rounded-full opacity-50"></div>
      
      <div className="z-10">
        <h2 className="font-headline text-4xl md:text-6xl font-extrabold leading-none tracking-tighter">
          {description || "Product Description"}
        </h2>
      </div>

      <div className="z-10 flex flex-col items-end text-right">
        {discount && (
          <div className="mb-2">
            <span className="bg-accent text-accent-foreground font-bold text-2xl md:text-4xl px-4 py-2 rounded-md">
              {discount}
            </span>
          </div>
        )}
        
        <p className="text-6xl md:text-8xl font-bold text-primary leading-none tracking-tighter">
          ${price || "0.00"}
        </p>

        <div className="mt-4 text-xs text-gray-300 font-mono">
            <p>VALID: {formattedDate(validity.from)} - {formattedDate(validity.to)}</p>
        </div>
      </div>
    </div>
  );
};
