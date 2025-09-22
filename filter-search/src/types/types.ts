export type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
  tags: string[];
};

export type ReadonlyProduct = Readonly<Product>;
