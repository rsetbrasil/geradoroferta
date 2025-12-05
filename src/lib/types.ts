export type Offer = {
  description: string;
  price: string;
  discount: string;
  validity: {
    from: Date | undefined;
    to: Date | undefined;
  };
};

export type Template = {
  id: string;
  name: string;
  component: React.FC<{ offer: Offer }>;
};
