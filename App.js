import "react-native-gesture-handler";
import * as React from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import store from "./redux/store/store";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { MenuProvider } from "react-native-popup-menu";
import Navigator from "./navigation/routes";
import { COLORS } from "./constants/colors";
// enableScreens(true);

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primaryColor,
    accent: COLORS.primaryColor,
  },
  borderColors: {
    ...DefaultTheme.colors,
    primary: COLORS.primaryColor,
    accent: COLORS.primaryColor,
  },
};
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
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <MenuProvider>
          <Navigator />
        </MenuProvider>
      </PaperProvider>
    </Provider>
  );
}
