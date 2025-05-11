import { useColorScheme } from '@/hooks/useColorScheme';
import { createContext, type PropsWithChildren } from 'react';
import { TamaguiProvider } from 'tamagui';
import tamaguiConfig from '../../tamagui.config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const UIContext = createContext(null);

export function UIProvider({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();

  if (!colorScheme) {
    throw new Error('Color scheme is not defined');
  }

  return (
    <UIContext.Provider value={null}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          {children}
        </GestureHandlerRootView>
      </TamaguiProvider>
    </UIContext.Provider>
  );
}
