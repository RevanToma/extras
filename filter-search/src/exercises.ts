import type { Product } from './types/types';

// ====== Higher-order functions ======
export function hasOutOfStock(items: readonly Product[]) {
  // return Boolean – true om någon produkt är slut i lager
  // använd some()
  return items.some((item) => !item.inStock);
}

export function allAffordable(items: readonly Product[], max: number) {
  // return Boolean – true om alla produkter har pris <= max
  // använd every()
  return items.every((item) => item.price <= max);
}

export function findByTag(items: readonly Product[], tag: string) {
  // return Object | undefined – den första produkt som innehåller taggen, annars undefined
  // använd find()
  return items.find((item) => item.tags.includes(tag));
}

export function totalPrice(items: readonly Product[]) {
  // return Number – summan av alla product.price
  // använd reduce()
  return items.reduce((acc, item) => acc + item.price, 0);
}

export function sortByName(
  items: readonly Product[],
  direction = 'asc'
): Product[] {
  // return Array – NY array av produkter sorterad på name (asc/desc)
  // använd sort() på en kopia
  const sorted = [...items].sort((a, b) => {
    if (direction === 'desc') {
      return b.name.localeCompare(a.name);
    }
    return a.name.localeCompare(b.name);
  });
  return sorted;
}

// ====== Regex ======
export function extractHashtags(text: string) {
  // return Array – alla hashtags i texten, t.ex. ["#chas", "#frontend"]
  // använd regex för att hitta hashtags
  return text.match(/#[\w-]+/g) || [];
}

export function isValidSwedishZip(code: string) {
  // return Boolean – true om koden är giltigt svenskt postnummer ("12345" eller "123 45")
  // använd regex
  return /^[0-9]{5}$/.test(code) || /^[0-9]{3} [0-9]{2}$/.test(code);
}

export function maskEmails(text: string) {
  // return String – samma text men med maskerade e-postadresser
  // använd regex för att maskera användardelen (t.ex. u***@chas.se)
  return text.replace(
    /([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
    (_, username, domain) => {
      const firstChar = username.charAt(0);
      return `${firstChar}***@${domain}`;
    }
  );
}

// ====== Rekursion ======
export function deepCountTags(items: readonly Product[]) {
  // return Number – antal taggar totalt, beräknat rekursivt
  return items.reduce((acc, item) => acc + item.tags.length, 0);
}

export function factorial(n: number): number {
  // return Number – n! (fakultet av n), beräknat rekursivt
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function findByIdRecursive(items: readonly Product[], id: number) {
  // return Object | undefined – produkten med matchande id, annars undefined
  // sök rekursivt
  return items.find((item) => item.id === id);
}

// ====== Functional programming ======
export function setInStock(
  items: readonly Product[],
  id: number,
  value: boolean
): Product[] {
  // return Array – NY array med produkten uppdaterad (pure function)
  return items.map((item) =>
    item.id === id ? { ...item, inStock: value } : item
  );
}

export function curry(fn: (...args: any[]) => any) {
  // return Function – curried version av en funktion
  return function curried(this: any, ...args: any[]) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (this: any, ...args2: any[]) {
        return curried.apply(this, args.concat(args2));
      };
    }
  };
}

export const priceAtMost = (max: number) => (item: Product) =>
  item.price <= max;
// return Function – en predikatfunktion som kan användas i filter()
