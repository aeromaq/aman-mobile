import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    'wix-regular': require('../assets/fonts/WixMadeforDisplay-Regular.ttf'),
    'wix-medium': require('../assets/fonts/WixMadeforDisplay-Medium.ttf'),
    'wix-semibold': require('../assets/fonts/WixMadeforDisplay-SemiBold.ttf'),
    'wix-bold': require('../assets/fonts/WixMadeforDisplay-Bold.ttf'),
    'wix-extrabold': require('../assets/fonts/WixMadeforDisplay-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
