# Mini Feedback App

A minimal full-stack web application that allows users to submit feedback and view it in an admin panel.

## ✍️ Author

- **Yauheni Ivus**
  
- Email: [s97819@pollub.edu.pl](mailto:s97819@pollub.edu.pl)  
- Location: Lublin, Poland

## 🛠️ Technologies Used

### Frontend
- **React** (Next.js)
- **Tailwind CSS**
- **TypeScript**
- **shadcn/ui** (for UI components)

### Backend
- **Node.js**
- **NestJS** 
- **Mongoose** (ORM)
- **Mongo** (Database)
- **JWT** (Authentication, if used)
- **Zustand** (global state)

---

## 🧩 Opis funkcjonalności 

Aplikacja umożliwia:

- Login / Registration / Logout
- Dodawanie opinii przez użytkowników (imię, e-mail, wiadomość, ocena)
- Walidację danych wejściowych
- Przeglądanie wszystkich zapytan o opinii w panelu administratora
- Przeglądanie wszystkich opinii w panelu pojedenczego zapytania o opiniie
- Możliwość usunięcia zapytania o opinii

## 🛠️ Jak uruchomić aplikację lokalnie

### 🔃 1. Wymagania

- Zainstalowany **Node.js**
- Zainstalowany **MongoDB** i uruchomiony lokalnie (`mongod`)
- Globalnie zainstalowany `pnpm`:  npm install -g pnpm

💡 Uwaga: Aplikacja backendowa łączy się z bazą MongoDB o nazwie "mini-feedback-app".
Jeżeli taka baza nie istnieje, należy ją ręcznie utworzyć w MongoDB (np. przez MongoDB Compass)
lub zostanie utworzona automatycznie przy pierwszym zapisie danych.

### ▶️ 2. Uruchomienie backendu (NestJS)

cd mini-feedback-app/mini-feedback-app-back
npm install
npm run start:dev  

### 💻 3. Uruchomienie frontend (Next.js)

cd mini-feedback-app/mini-feedback-app-front
pnpm install
pnpm run dev

Frontend zostanie uruchomiony pod adresem http://localhost:3000