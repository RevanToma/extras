// 1. Gå på bio (3p)
// Skriv en funktion canBuyTickets som tar en persons ålder och en film-typ
// som input och returnerar true eller false om personen får köpa biljetter.

// filmType kan vara antingen "action", "comedy" eller "family"
// För "action" måste man vara 15 år eller äldre
// För "comedy" måste man vara 11 år eller äldre
// För "family" måste man vara 7 år eller äldre

function canBuyTickets(age, filmType) {
  //Din kod här
  if (filmType === 'action' && age >= 15) {
    return true;
  } else if (filmType === 'comedy' && age >= 11) {
    return true;
  } else if (filmType === 'family' && age >= 7) {
    return true;
  } else {
    return false;
  }
}

console.log(canBuyTickets(5, 'action')); // ska logga false
console.log(canBuyTickets(11, 'comedy')); // ska logga true
