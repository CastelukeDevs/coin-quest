require("dotenv").config();

const PACKAGES = process.env.PACKAGE_NAME ?? "com.casteluke.coinquest";

export default {
  expo: {
    name: "Coin Quest",
    slug: "coin-quest",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "coinquest",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: PACKAGES,
      buildNumber: "100000",
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: PACKAGES,
      versionCode: 100000,
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "c12540eb-aa6d-4a53-b4e6-b64b3c80f6fc",
      },
    },
    updates: {
      url: "https://u.expo.dev/c12540eb-aa6d-4a53-b4e6-b64b3c80f6fc",
    },
  },
};
