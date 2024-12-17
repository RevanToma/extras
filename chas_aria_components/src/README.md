# Tillgängliga webbkomponenter med WAI-ARIA

I denna workshop-uppgift kommer ni att skapa webbkomponenter med HTML, CSS och JavaScript som följer WAI-ARIA-riktlinjerna. WAI-ARIA är en specifikation som gör webbinnehåll och webbapplikationer mer tillgängliga för personer med funktionsvariationer.

För att slutföra uppgiften kommer ni att behöva använda lämpliga WAI-ARIA-roller, attribut och tillstånd för att förbättra tillgängligheten hos era komponenter.

## Hur du klarar uppgiften

Er uppgift är att skapa följande webbkomponenter:

1. **Tillgängligt modalfönster**:
   Skapa ett modalfönster (popup-fönster) som hanterar fokus och tillgänglighet på ett korrekt sätt med hjälp av ARIA-attribut. Fönstret ska kunna öppnas med en knapp på sidan.

Utgå från denna html-kod:

```
<div id="accessibleModal" >
  <h2 id="modalTitle">Exempel på modalfönster</h2>
  <p>Här är lite text i modalfönstret.</p>
  <button id="closeModalBtn">Stäng</button>
</div>
```

2. **Tillängligt modalfönster med `<dialog>`**
   Skapa en tillgänglig modal med hjälp av det inbyggda HTML-elementet `<dialog>`. Vilka är fördelarna med
   att använda denna i tillgänglighets-synpunkt? Skriv svar
   i kommentarerna till koden.

Utgå från denna html-kod:

```
<dialog id="accessibleDialog">
  <h2>Exempel på tillgängligt modalfönster med &lt;dialog&gt;</h2>
  <p>Här är innehållet i modalfönstret.</p>
  <button id="closeDialogBtn">Stäng</button>
</dialog>
```

Följande kriterier ska vara uppfyllda för modalfönster:

- Sätt fokus på modalfönstrets stäng-knapp när fönstret öppnas.
- Säkerställ att användaren kan navigera till och från modalfönstret med hjälpmedel som tangentbordet.
- Fönstret ska gå att stängas med ESC-knapp
- Fokus ska gå tillbaka till öppna-knappen när fönstret stängs.

3. **Tillgänglig hamburgarmeny**
   Skapa en tillgänglig hamburgarmeny, som ska används för att visa och dölja navigeringen i html-koden här nedanför.

```
<button id="menuButton" >Meny</button>
<nav id="menuContent">
  <ul>
    <li><a href="#">Hem</a></li>
    <li><a href="#">Om oss</a></li>
    <li><a href="#">Tjänster</a></li>
    <li><a href="#">Kontakt</a></li>
  </ul>
</nav>
```

### :books: Reading List

[mdn web docs ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
[ARIA Patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)

## Testa med skärmläsare

När ni har slutfört skapandet av ovanstående komponenter, testa dem noggrant med skärmläsare för att säkerställa att de är tillgängliga och användbara för alla användare.

## Hur du lämnar in

Klicka på uppgiften i canvas och ange länken till ditt repo.

---

### :boom: Success!

Efter denna uppgift ska ni veta vad wai-aria är och kunna göra interaktiva komponenter tillgängliga.
