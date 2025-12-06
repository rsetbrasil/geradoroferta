import { Timestamp } from "firebase/firestore";

export type Offer = {
  description: string;
  subDescription?: string;
  price: string;
  discount: string;
  unit?: string;
  validity: {
    from: Date | undefined;
    to: Date | undefined;
  };
  logoUrl?: string;
  productImageUrl?: string;
  headlineText?: string;
  fontSize?: number;
  headlineFontSize?: number;
};

export type OfferDocument = Omit<Offer, 'validity'> & {
  validity: {
    from: Timestamp | Date | undefined;
    to: Timestamp | Date | undefined;
  };
  userId: string;
  updatedAt: Timestamp;
}

export type Template = {
  id: string;
  name: string;
  layoutData: string;
  userId?: string;
  component?: React.FC<{ offer: Offer }>; // For mock/preview on client
};

export type Product = {
  id: string;
  name: string;
  price: string;
};
