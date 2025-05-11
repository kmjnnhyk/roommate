import { Stack } from 'expo-router';

export default function SettingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="notification" />
      <Stack.Screen name="staffs" />
      <Stack.Screen name="manage" />
    </Stack>
  );
}
