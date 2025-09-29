# Cedzői

Egy modern, letisztult Next.js alkalmazás feleletválasztós tesztek és flashcard tananyagok gyakorlásához.

## Funkciók

### 🧠 Kvíz (Feleletválasztós tesztek)
- Interaktív kérdések válaszlehetőségekkel
- **Single choice** (egy helyes válasz) és **Multiple choice** (több helyes válasz) kérdések
- Azonnali visszajelzés a válaszokra
- Magyarázatok a helyes válaszokhoz
- Pontszám követés és eredmény megjelenítés
- Progress bar a kvíz előrehaladásának mutatásához

### 📚 Tananyag (Flashcard)
- 3D flip animációval rendelkező kártyák
- "Tudom" / "Nem tudom" gombok a tanulás követéséhez
- Szűrési lehetőségek: Összes / Ismert / Ismeretlen kártyák
- Statisztikák a tanulási eredményekről

### 🎨 Modern UI/UX
- Responsive design
- Tailwind CSS stílusozás
- Vertikális sidebar navigáció
- Letisztult, felhasználóbarát felület

## Telepítés és futtatás

1. **Függőségek telepítése:**
   ```bash
   npm install
   ```

2. **Fejlesztői szerver indítása:**
   ```bash
   npm run dev
   ```

3. **Böngészőben megnyitás:**
   ```
   http://localhost:3000
   ```

## Adatok hozzáadása

### Kvíz adatok
A kvíz adatokat a `public/data/quizzes.json` fájlban találod. Formátum:

```json
[
  {
    "id": "quiz-1",
    "title": "Kvíz címe",
    "description": "Kvíz leírása",
    "questions": [
      {
        "id": "q1",
        "question": "Kérdés szövege",
        "options": ["Válasz 1", "Válasz 2", "Válasz 3", "Válasz 4"],
        "correctAnswer": 1,
        "explanation": "Magyarázat a helyes válaszhoz"
      },
      {
        "id": "q2",
        "question": "Multiple choice kérdés",
        "options": ["Válasz 1", "Válasz 2", "Válasz 3", "Válasz 4"],
        "correctAnswer": [0, 2],
        "type": "multiple",
        "explanation": "Magyarázat a helyes válaszokhoz"
      }
    ]
  }
]
```

**Kérdés típusok:**
- **Single choice**: `"correctAnswer": 1` (egy szám)
- **Multiple choice**: `"correctAnswer": [0, 2]` (tömb) és `"type": "multiple"`

### Flashcard adatok
A flashcard adatokat a `public/data/flashcards.json` fájlban találod. Formátum:

```json
[
  {
    "id": "flashcard-1",
    "title": "Tananyag címe",
    "description": "Tananyag leírása",
    "cards": [
      {
        "id": "card-1",
        "front": "Kérdés / Fogalom",
        "back": "Válasz / Magyarázat"
      }
    ]
  }
]
```

## Projekt struktúra

```
src/
├── app/
│   ├── layout.tsx          # Fő layout
│   ├── page.tsx            # Főoldal
│   └── globals.css         # Globális stílusok
├── components/
│   ├── Sidebar.tsx         # Navigációs sidebar
│   ├── QuizList.tsx        # Kvíz lista
│   ├── FlashcardList.tsx   # Tananyag lista
│   ├── Quiz.tsx            # Kvíz komponens
│   └── Flashcard.tsx       # Flashcard komponens
public/
└── data/
    ├── quizzes.json        # Kvíz adatok
    └── flashcards.json     # Flashcard adatok
```

## Technológiai stack

- **Next.js 14** - React framework
- **TypeScript** - Típusbiztonság
- **Tailwind CSS** - Stílusozás
- **React Hooks** - State management

## Használat

1. **Kvíz használata:**
   - Válaszd ki a "Kvíz" opciót a sidebar-ban
   - Kattints egy kvízre a listából
   - Válaszolj a kérdésekre
   - Nézd meg az eredményedet a végén

2. **Flashcard használata:**
   - Válaszd ki a "Tananyag" opciót a sidebar-ban
   - Kattints egy tananyagra a listából
   - Kattints a kártyára a megfordításhoz
   - Jelöld meg, hogy tudod-e vagy sem
   - Használd a szűrőket a tanulás optimalizálásához

## Testreszabás

A projekt könnyen testreszabható:
- Új kvízek és tananyagok hozzáadása a JSON fájlokban
- Stílusok módosítása a Tailwind CSS osztályokkal
- Új funkciók hozzáadása a komponensekben

## Jövőbeli fejlesztések

- Felhasználói fiókok és progress mentés
- További kvíz típusok (igaz/hamis, szöveges válasz)
- Tanulási statisztikák és analytics
- Offline támogatás
- Mobilalkalmazás