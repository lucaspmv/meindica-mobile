import { NativeBaseProvider, StatusBar } from 'native-base';
import * as SplashScreen from 'expo-splash-screen';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { Routes } from '@routes/index';

import { THEME } from '@theme/index';
import { AuthContextProvider } from '@contexts/AuthContext';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NativeBaseProvider theme={THEME}>
        <AuthContextProvider>
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
          />
          <Routes />
        </AuthContextProvider>
      </NativeBaseProvider>
    </View>
  );
}
