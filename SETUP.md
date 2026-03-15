# LIBERTI FITNESS — Instrukce nasazení

## Co budeš potřebovat
- GitHub účet (máš)
- Google účet (pro Sheets + Apps Script)
- 15–20 minut

---

## Krok 1 — Google Sheets + Apps Script

1. Jdi na **script.google.com** → „Nový projekt"
2. Smaž vše v editoru a vlož obsah souboru **`gas_script.js`**
3. Ulož projekt (Ctrl+S), pojmenuj ho např. „LIBERTI Fitness"
4. Klikni **Nasadit → Nové nasazení**
5. Typ: **„Webová aplikace"**
6. Nastavení:
   - Spouštět jako: **Já**
   - Kdo má přístup: **Kdokoli** ← důležité!
7. Klikni **Nasadit** → zkopíruj URL (vypadá jako `https://script.google.com/macros/s/AKfy.../exec`)

---

## Krok 2 — Nastav URL v aplikaci

Otevři soubor **`index.html`** a najdi tento řádek (cca řádek 40):

```js
var API_URL="https://script.google.com/macros/s/TVUJ_SCRIPT_ID_ZDE/exec";
```

Nahraď `TVUJ_SCRIPT_ID_ZDE` svojí skutečnou URL z kroku 1.

Volitelně změň PIN (výchozí: `2183971`):
```js
var CORRECT_PIN="2183971";
```

---

## Krok 3 — GitHub Pages

1. Jdi na **github.com** → Nový repozitář
2. Pojmenuj ho např. `liberti-fitness`
3. Nahraj soubory: `index.html`, `manifest.json`, `sw.js`
4. Jdi do **Settings → Pages** → Source: `main` branch → Save
5. Za chvíli bude aplikace na: `https://TVOJE_JMENO.github.io/liberti-fitness`

---

## Krok 4 — Přidání na mobil

**iPhone (Safari):**
1. Otevři URL v Safari
2. Sdílet → „Přidat na plochu"

**Android (Chrome):**
1. Otevři URL v Chrome
2. Menu (⋮) → „Přidat na plochu"

---

## Struktura dat (Google Sheets)

Aplikace automaticky vytvoří 4 listy:
- `workouts` — záznamy tréninků
- `progress` — tělesná měření
- `nutrition` — denní výživa
- `settings` — uživatelské nastavení

---

## Ikony (volitelné)

Pro správné zobrazení jako PWA vlož do repozitáře:
- `icon-192.png` (192×192 px)
- `icon-512.png` (512×512 px)

Bez ikon aplikace funguje, jen nemá hezkou ikonku na ploše.

---

## Problémy?

**Data se neukládají:**
- Zkontroluj URL v `API_URL` 
- Ujisti se, že Apps Script má přístup „Kdokoli"
- Zkus znovu nasadit Apps Script (nová verze = nová URL!)

**PIN nefunguje:**
- Výchozí PIN je `2183971` (7 číslic)
- Změň ho v `index.html` řádek s `CORRECT_PIN`
