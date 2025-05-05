import { useTheme, View } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';

export const Background = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();

  const gradientColors = [
    theme.background?.val,
    theme.backgroundHover?.val,
  ] as const;

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={gradientColors} // Using theme colors for consistency
        style={{ flex: 1 }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
};
