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

## 🧪 Running Tests

This project uses **Jest** for unit testing. The following scripts are available in `package.json`:

```json
"scripts": {
  "test": "jest --watch --coverage=false --changedSince=origin/main",
  "testDebug": "jest -o --watch --coverage=false",
  "testFinal": "jest",
  "updateSnapshots": "jest -u --coverage=false"
}
```

## 💡 Notes

- The project uses Zustand for state due to its simplicity and performance.

- Routing is handled using Expo Router, enabling a filesystem-based navigation.

- UI is styled using NativeWind, a utility-first CSS framework for React Native.

- Data is persisted locally with AsyncStorage.

## 📱 Screenshots

![Dark Theme](https://raw.githubusercontent.com/raivieiraadriano92/todo-pleinair/refs/heads/main/assets/images/Screenshot2.png)

![light Theme](https://raw.githubusercontent.com/raivieiraadriano92/todo-pleinair/refs/heads/main/assets/images/screenshot1.png)
