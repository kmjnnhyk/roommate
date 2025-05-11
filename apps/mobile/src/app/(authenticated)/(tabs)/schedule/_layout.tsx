import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="edit/[date]"
        options={{ headerShown: false, presentation: 'modal' }}
      />
      <Stack.Screen name="create/[month]" options={{ headerShown: false }} />
    </Stack>
  );
}
