// 2. Medelvärdet (3p)
// Skriv en funktion average som returnerar medelvärdet av en array med siffror.
// Medelvärdet räknas ut genom att först räkna ut summan av siffrorna och sen
// dela det med antalet siffror. medelvärdet = summan / antal.

function average(numbers) {
  //Din kod här
  return numbers.reduce((acc, curr) => acc + curr) / numbers.length;
}

console.log(average([1, 2, 3, 4, 5])); // Ska logga 3
console.log(average([1, 2, 3, 4])); // Ska logga 2.5
