import "react-native-gesture-handler";
import * as React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { Provider as PaperProvider } from "react-native-paper";
import Navigator from "./navigation/routes";

export default function App() {
  const [loaded] = useFonts({
    "OpenSansCondensed-Bold": require("./assets/fonts/OpenSansCondensed-Bold.ttf"),
    "OpenSansCondensed-Light": require("./assets/fonts/OpenSansCondensed-Light.ttf"),
    "OpenSansCondensed-LightItalic": require("./assets/fonts/OpenSansCondensed-LightItalic.ttf"),
    "Karla-Light": require("./assets/fonts/Karla-Light.ttf"),
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
    "Karla-Bold": require("./assets/fonts/Karla-Bold.ttf"),
    "Karla-Medium": require("./assets/fonts/Karla-Medium.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }
  return (
    <PaperProvider>
      <Navigator />
    </PaperProvider>
  );
}
