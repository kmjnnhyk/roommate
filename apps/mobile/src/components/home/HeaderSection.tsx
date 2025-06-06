import { Ionicons } from "@expo/vector-icons";
import { Avatar, Button, Text, useTheme, XStack, YStack } from "tamagui";
import { router } from "expo-router";

export function HeaderSection() {
  const theme = useTheme();

  return (
    <XStack alignItems="center" justifyContent="space-between">
      <XStack alignItems="center" gap="$3">
        <Avatar circular size="$5">
          <Avatar.Image
            accessibilityLabel="Host Avatar"
            src="https://randomuser.me/api/portraits/men/32.jpg"
          />
          <Avatar.Fallback backgroundColor={theme.background} />
        </Avatar>
        <YStack>
          <Text color={theme.placeholderColor} fontSize="$2">
            Welcome back,
          </Text>
          <Text color={theme.color} fontSize="$7" fontWeight="600">
            Host Name
          </Text>
        </YStack>
      </XStack>
      <Button
        chromeless
        circular
        icon={<Ionicons name="menu" size={28} color={theme.brandColor.val} />}
        onPress={() => router.push("/(authenticated)/setting")}
      />
    </XStack>
  );
}
