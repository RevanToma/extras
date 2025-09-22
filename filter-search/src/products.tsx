export const products = Object.freeze([
  {
    id: 1,
    name: 'Chas Hoodie',
    price: 499,
    inStock: true,
    tags: ['clothes', 'hoodie'],
  },
  {
    id: 2,
    name: 'TS Handbook',
    price: 299,
    inStock: false,
    tags: ['book', 'typescript'],
  },
  {
    id: 3,
    name: 'Coffee Mug',
    price: 129,
    inStock: true,
    tags: ['kitchen', 'mug'],
  },
  {
    id: 4,
    name: 'Sticker Pack',
    price: 59,
    inStock: true,
    tags: ['swag', 'stickers'],
  },
  {
    id: 5,
    name: 'JS Handbook',
    price: 279,
    inStock: false,
    tags: ['book', 'javascript'],
  },
]);

const Products = () => {
  return (
    <div>
      <h1>Products</h1>
    </div>
  );
};

export default Products;
