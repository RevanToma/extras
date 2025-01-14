// 5. Full info med spread (3p)
// Använd spread operator för att kombinera objekten personInfo och contaktInfo
// till ett nytt objekt som heter fullInfo.
// Lägg till en ny egenskap city: "Göteborg" i samma objekt.
// Logga fullInfo till konsolen.

const personInfo = {
  name: 'Kalle',
  age: 30,
};

const contactInfo = {
  phone: '123-456-789',
  email: 'kalle@mail.com',
};

const fullInfo = { ...personInfo, ...contactInfo, city: 'Göteborg' };

console.log(fullInfo);
