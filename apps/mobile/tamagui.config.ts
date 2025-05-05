import { defaultConfig } from '@tamagui/config/v4';
import { createTamagui } from 'tamagui';

export const tamaguiConfig = createTamagui({
  ...defaultConfig,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  },
  themes: {
    dark: {
      background: '#222131',
      backgroundHover: '#191824',
      backgroundPress: '#191824',
      backgroundFocus: '#333',
      backgroundStrong: '#444',
      backgroundTransparent: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      colorHover: '#eee',
      colorPress: '#ddd',
      colorFocus: '#ccc',
      colorTransparent: 'rgba(255, 255, 255, 0.5)',
      borderColor: '#555',
      borderColorHover: '#666',
      borderColorFocus: '#777',
      borderColorPress: '#888',
      placeholderColor: '#999',
      outlineColor: '#aaa',
      // Custom tokens
      brandBackground: '#fff', // Primary(포인트)
      brandColor: '#fa7000',
      sub1: '#2EC4B6', // 민트
      sub2: '#A29BFE', // 라이트 퍼플
      sub3: '#FFE066', // 레몬 옐로우
    },
    light: {
      background: '#222131',
      backgroundHover: '#191824',
      backgroundPress: '#191824',
      backgroundFocus: '#333',
      backgroundStrong: '#444',
      backgroundTransparent: 'rgba(0, 0, 0, 0.5)',
      color: '#fff',
      colorHover: '#eee',
      colorPress: '#ddd',
      colorFocus: '#ccc',
      colorTransparent: 'rgba(255, 255, 255, 0.5)',
      borderColor: '#555',
      borderColorHover: '#666',
      borderColorFocus: '#777',
      borderColorPress: '#888',
      placeholderColor: '#999',
      outlineColor: '#aaa',
      // Custom tokens
      brandBackground: '#fff', // Primary(포인트)
      brandColor: '#fa7000',
      sub1: '#2EC4B6', // 민트
      sub2: '#A29BFE', // 라이트 퍼플
      sub3: '#FFE066', // 레몬 옐로우
    },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
