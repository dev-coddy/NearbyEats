# 🍽️ NearbyEats

**NearbyEats** is a frontend project built with **React, Redux Toolkit, TailwindCSS, and React Router**.  
It fetches **real-time restaurant and menu data from a live API** and displays them beautifully.

🚀 **Live Demo:** [NearbyEats on Vercel](https://nearbyeats.vercel.app/)

---

## ✨ Features

- 📍 Browse nearby restaurants (fetched from live API)
- 📋 View restaurant menu items dynamically
- ➕ Add items to cart
- ❌ Clear the entire cart with one click
- 🛒 Cart page showing total items
- 🎨 Responsive UI with TailwindCSS

---

## 🛠️ Tech Stack

- ⚛️ **React** (hooks & functional components)
- 🛣️ **React Router DOM** – client-side routing
- 📦 **Redux Toolkit + React-Redux** – global state management
- 🎨 **TailwindCSS** – styling
- 📦 **Parcel** – bundler
- 🌍 **Vercel** – deployment

---

## 📂 Project Structure

📦 nearbyeats
┣ 📂 src
┃ ┣ 📂 components
┃ ┃ ┣ 📜 Cart.js
┃ ┃ ┣ 📜 CartItem.js
┃ ┃ ┣ 📜 RestaurantMenu.js
┃ ┃ ┗ 📜 ...
┃ ┣ 📂 utils
┃ ┃ ┣ 📜 cartSlice.js
┃ ┃ ┗ 📜 store.js
┃ ┗ 📜 index.js
┣ 📜 package.json
┣ 📜 tailwind.config.js
┣ 📜 index.html
┗ 📜 README.md

📚 What I Learned

- Fetching live API data in React
- Handling async data with hooks (useEffect, custom hooks)
- Global state management using Redux Toolkit
- Using React Router for navigation
- Styling a responsive UI with TailwindCSS
- Deploying a React project on Vercel
