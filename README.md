# Projekt Quizu

## Opis projektu

Projekt Quizu to interaktywna aplikacja umożliwiająca użytkownikowi udział w quizie składającym się z 25 pytań. Każde pytanie zawiera cztery możliwe odpowiedzi, z których użytkownik wybiera jedną.

## Zasady i Funkcje

1. **Pytania i Odpowiedzi**

   - Dostępne jest 25 pytań, z którymi użytkownik może się spotkać. Każde pytanie ma cztery możliwe odpowiedzi.
   - Użytkownik zobaczy pytaniami kolejno, po udzieleniu odpowiedzi (kliknięciu "Dalej").
   - Ważne jest, aby każde pytanie było udzielone odpowiedzią – nie można pominąć żadnego z nich.

2. **Manipulacja Odpowiedziami**

   - Użytkownik ma możliwość zmiany odpowiedzi na wcześniej udzielone pytania.
   - Przejście do poprzednich pytań i zmiana odpowiedzi jest dozwolona.

3. **Przechowywanie Danych**

   - Informacje dotyczące postępu quizu są przechowywane w Session Storage.

4. **Wynik Quizu**

   - Po zakończeniu quizu użytkownik otrzyma wynik, który obejmuje liczbę punktów oraz informację, czy quiz został zaliczony (PASS) czy nie (FAIL). Zaliczenie wymaga uzyskania co najmniej 75% poprawnych odpowiedzi.

5. **Pobieranie Wyniku w PDF**

   - Po zakończeniu quizu istnieje możliwość pobrania wyniku wraz z udzielonymi odpowiedziami w formie pliku .pdf. Ten dokument może pełnić funkcję potwierdzenia ukończenia quizu lub certyfikatu.

6. **Losowa Kolejność Pytań**
   - Przy każdym uruchomieniu quizu kolejność pytań i odpowiedzi jest losowa, co zapewnia różnorodność i unikatowe doświadczenie przy każdym podejściu.

## Technologie użyte

- HTML
- SCSS
- React

## Autor

Daniel Władyczewski 65821
