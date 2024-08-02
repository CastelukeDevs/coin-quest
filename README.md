# Coin Quest

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

> [!IMPORTANT]
> Coin Quest
> By: Rizki Abdillah

## Journey

Building this app is bit challenging. Due to my minimum experience into Cryptocurrency scene, It is pretty hard for me to understand its "Lingo" or terminology. So many APIs Provider also has its own language or terms referring to one another is not helping either. With my schedule amounting, I have to do this after using whatever left before I had some rest. It is challenging. But, I do think this rather enjoyable project for me.

## Features

This apps has some features that required by the documents or my own exploration and enhancement.

- Auth (? ... It is just a mock authentication, just to simulate both different behavior while user authenticated or not and limiting request since most of my data source is free service)
- Coin list
- Bookmark

## APIs Service

All data in this apps using external APIs served by Crypto API provider.

- REST data by CoinGecko
- Websocket data by CoinAPI.io

## Library/Packages Used

I pick some of my most familiar package, I used some UI library to simplify my workflow. It is bit unsatisfactory personally due to lack of control of the library itself

```
- @expo-google-fonts/plus-jakarta-sans (font)
- @backpackapp-io/react-native-toast (simple toast)
- @react-native-async-storage/async-storage (for storing persisted state from redux)
- redux / redux-toolkit / thunk (just to manage user local state, industry standard. Using thunk instead of saga due to current rdx-toolkit is bit more powerful and has less boilerplate)
- Flashlist (I have to work with lots of small data, flashlist is more efficient render wise rather than usual flatlist)
- Axios

```

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

> Rizki Abdillah
> Casteluke Creative Labs
> Mobile Developer @ 2024
