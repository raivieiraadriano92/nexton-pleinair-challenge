# PleinAir Todo App

This is a simple Todo List mobile application built with **Expo** and **React Native** as part of a technical test for PleinAir.

## ✨ Features

- ✅ Add new tasks
- ✏️ Edit existing tasks
- ❌ Delete tasks
- ✔️ Mark tasks as done
- 💾 Persistent storage using `AsyncStorage`

## 🛠️ Tech Stack

- **Expo** – App development framework
- **React Native** – Core mobile development
- **Zustand** – Lightweight state management
- **Expo Router** – File-based navigation system
- **NativeWind** – TailwindCSS styling for React Native
- **React Native Reusables** – Prebuilt, customizable UI components
- **AsyncStorage** – Local data persistence

## 🚀 Getting Started

Make sure you have `node`, `expo-cli`, and a mobile simulator or Expo Go app installed.

```bash
# Clone the repository
git clone https://github.com/raivieiraadriano92/todo-pleinair
cd todo-pleinair

# Install dependencies
pnpm install

# Start the app
pnpm dev
```

## 📂 Project Structure

```bash
.
├── app/                 # Screens and routing (expo-router)
├── components/          # Reusable UI components
├── store/               # Zustand store
├── libs/               # Utility functions used by React Native Reusables
└── ...

```

## 💡 Notes

- The project uses Zustand for state due to its simplicity and performance.

- Routing is handled using Expo Router, enabling a filesystem-based navigation.

- UI is styled using NativeWind, a utility-first CSS framework for React Native.

- Data is persisted locally with AsyncStorage.
