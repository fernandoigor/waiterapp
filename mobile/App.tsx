import React, { useEffect } from "react";
import {  } from "react-native";
import * as SplashScreen from "expo-splash-screen";

import { Home } from "./src/screens/Home";

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);
  

  return (
    <Home />
  );
}
