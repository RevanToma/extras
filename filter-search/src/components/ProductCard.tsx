import type { Product } from '../types/types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className='product-card'>
      <div className='product-card__header'>
        <h3 className='product-card__title'>{product.name}</h3>
        <div
          className={`product-card__status ${
            product.inStock ? 'in-stock' : 'out-of-stock'
          }`}
        >
          {product.inStock ? 'I lager' : 'Slut'}
        </div>
      </div>

      <div className='product-card__content'>
        <div className='product-card__price'>
          <span className='price-amount'>{product.price}</span>
          <span className='price-currency'>kr</span>
        </div>

        <div className='product-card__tags'>
          {product.tags.map((tag) => (
            <span key={tag} className='tag'>
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className='product-card__footer'>
        <button className='product-card__button' disabled={!product.inStock}>
          {product.inStock ? 'Lägg i varukorg' : 'Ej tillgänglig'}
        </button>
      </div>
    </div>
  );
}
