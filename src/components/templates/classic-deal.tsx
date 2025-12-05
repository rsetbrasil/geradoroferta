import type { Offer } from "@/lib/types";
import { format } from 'date-fns';

export const ClassicDealTemplate: React.FC<{ offer: Offer }> = ({ offer }) => {
  const { description, price, discount, validity } = offer;

  const formattedDate = (date: Date | undefined) => date ? format(date, 'MM/dd/yyyy') : 'N/A';

  return (
    <div className="font-body w-full h-full flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-gray-300 bg-white text-gray-800">
      <div className="w-full">
        {discount && (
          <div className="mb-6">
            <span className="inline-block bg-accent text-accent-foreground font-bold text-2xl md:text-4xl px-6 py-3 rounded-full">
              {discount}
            </span>
          </div>
        )}

        <h2 className="font-headline text-3xl md:text-5xl font-bold leading-tight mb-4">
          {description || "Product Description"}
        </h2>
        
        <div className="flex items-baseline justify-center gap-4 mb-8">
            <p className="text-5xl md:text-7xl font-bold text-primary">
                ${price || "0.00"}
            </p>
        </div>

        <div className="w-full h-[2px] bg-gray-300 my-8"></div>

        <div className="text-sm text-gray-500">
          <p className="font-bold">Offer valid</p>
          <p>from {formattedDate(validity.from)} to {formattedDate(validity.to)}</p>
        </div>

        <p className="mt-8 text-xs text-gray-400">
          *Terms and conditions may apply. Offer cannot be combined with other promotions.
        </p>
      </div>
    </div>
  );
};
