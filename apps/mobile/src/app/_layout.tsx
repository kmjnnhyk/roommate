import { SessionProvider, useSession } from '@/providers/session';
import { UIProvider } from '@/providers/ui';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function RootLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <SessionProvider>
      <UIProvider>
        <Slot />
      </UIProvider>
    </SessionProvider>
  );
}
