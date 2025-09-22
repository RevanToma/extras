import { useSearchParams } from 'react-router-dom';

import './App.css';
import { ProductCard } from './components/ProductCard';
import './components/ProductCard.css';

import { products } from './products';
import {
  hasOutOfStock,
  allAffordable,
  findByTag,
  totalPrice,
  sortByName,
  extractHashtags,
  isValidSwedishZip,
  maskEmails,
  deepCountTags,
  factorial,
  findByIdRecursive,
  setInStock,
  curry,
  priceAtMost,
} from './exercises';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filter = searchParams.get('filter') || '',
    onlyStock = searchParams.get('stock') === 'true',
    sortDir = (searchParams.get('sort') as 'asc' | 'desc') || 'asc';

  const updateFilter = (newFilter: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (newFilter.trim()) {
        newParams.set('filter', newFilter);
      } else {
        newParams.delete('filter');
      }
      return newParams;
    });
  };

  const updateStock = (stock: boolean) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (stock) {
        newParams.set('stock', 'true');
      } else {
        newParams.delete('stock');
      }
      return newParams;
    });
  };

  const updateSort = (sort: 'asc' | 'desc') => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (sort === 'asc') {
        newParams.delete('sort');
      } else {
        newParams.set('sort', sort);
      }
      return newParams;
    });
  };

  const runTests = () => {
    console.clear();
    console.log('== HOFs ==');
    console.log('hasOutOfStock:', hasOutOfStock(products));
    console.log('allAffordable(500):', allAffordable(products, 500));
    console.log("findByTag('book'):", findByTag(products, 'book'));
    console.log('totalPrice:', totalPrice(products));
    console.log(
      'sortByName desc:',
      sortByName(products, 'desc').map((p) => p.name)
    );

    console.log('\n== Regex ==');
    console.log(
      'extractHashtags:',
      extractHashtags('Idag #frontend #Chas! #100DaysOfCode')
    );
    console.log(
      'isValidSwedishZip:',
      ['12345', '123 45', '12 345'].map(isValidSwedishZip)
    );
    console.log(
      'maskEmails:',
      maskEmails('Kontakta: user@example.com, test@chas.se')
    );

    console.log('\n== Rekursion ==');
    console.log('deepCountTags:', deepCountTags(products));
    console.log('factorial(5):', factorial(5));
    console.log('findByIdRecursive(3):', findByIdRecursive(products, 3));

    console.log('\n== FP ==');
    console.log(
      'setInStock id=2 true:',
      setInStock(products, 2, true).find((p) => p.id === 2)
    );
    const cheap = products.filter(priceAtMost(200));
    console.log(
      'priceAtMost(200):',
      cheap.map((p) => p.name)
    );
    const add = (a: number, b: number) => a + b;
    const cAdd = curry(add);
    console.log('curry(add)(2)(3):', cAdd(2)(3));
  };

  // Steg 7
  // Mini-app: filtrera, sortera, sök med regex
  let regex = null;
  if (filter.trim() !== '') {
    try {
      regex = new RegExp(filter, 'i');
    } catch {
      regex = null;
    }
  }

  // Apply filters in sequence
  let filtered = products;

  // 1. Filtrera produkter med regex
  if (regex) {
    filtered = filtered.filter((product) => regex.test(product.name));
  }

  // 2. Filtrera produkter med endast i lager
  if (onlyStock) {
    filtered = filtered.filter((product) => product.inStock);
  }

  // 3. Sortera produkter med asc/desc - använd sortByName
  filtered = sortByName(filtered, sortDir);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Avancerad JS</h1>
      <p className='muted'>HOFs • Regex • Rekursion • FP</p>

      <section>
        <h2>Övningar</h2>
        <button onClick={runTests}>Kör tester (se konsolen)</button>
      </section>

      <section>
        <h2>Mini-app: Produktlista med filter & sök</h2>
        <div className='controls'>
          <input
            type='search'
            placeholder='Sök (regex stöds)'
            value={filter}
            onChange={(e) => updateFilter(e.target.value)}
          />
          <select
            value={sortDir}
            onChange={(e) => updateSort(e.target.value as 'asc' | 'desc')}
          >
            <option value='asc'>Namn ↑</option>
            <option value='desc'>Namn ↓</option>
          </select>
          <label>
            <input
              type='checkbox'
              checked={onlyStock}
              onChange={(e) => updateStock(e.target.checked)}
            />
            Endast i lager
          </label>
        </div>

        <div className='products-grid'>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
