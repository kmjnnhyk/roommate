// This file is a fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons';
import type { SymbolWeight } from 'expo-symbols';
import type React from 'react';
import type { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';
import { XStack } from 'tamagui';

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function Icon({
  name,
  size = 24,
  color,
  style,
}: {
  name: string;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  return (
    <XStack style={style}>
      <Ionicons
        // https://ionic.io/ionicons/v4
        name={name as React.ComponentProps<typeof Ionicons>['name']}
        size={size}
        color={color}
      />
    </XStack>
  );
}
