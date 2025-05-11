import { Background } from '@/components/ui/Background';
import { useSession } from '@/providers/session';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  YStack,
  XStack,
  Text,
  Avatar,
  Button,
  useTheme,
  ScrollView,
  Separator,
  Paragraph,
  View,
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons'; // For icons
import { useState } from 'react';

// Mock data for demonstration
const userData = {
  name: 'Blake Gordon',
  email: 'blake@example.com',
  avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', // Replace with actual user avatar
};

export default function SettingScreen() {
  const { signOut } = useSession();
  const theme = useTheme();
  const router = useRouter();

  const [isLogoutInProgress, setIsLogoutInProgress] = useState(false);

  const handleLogout = async () => {
    setIsLogoutInProgress(true);
    await signOut();
    setIsLogoutInProgress(false);
    router.replace('/(unauthenticated)'); // Or wherever your sign-in screen is
  };

  const SettingItem = ({
    iconName,
    iconColor,
    label,
    onPress,
    rightContent,
  }: {
    iconName: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    label: string;
    onPress?: () => void;
    rightContent?: React.ReactNode;
  }) => (
    <Button
      chromeless
      onPress={onPress}
      paddingHorizontal="$3"
      backgroundColor="$backgroundHover" // Subtle background for items
      borderRadius="$4"
      pressStyle={{ backgroundColor: '$backgroundFocus' }}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap="$3"
    >
      <XStack alignItems="center" gap="$3" flex={1}>
        <View
          padding="$2"
          backgroundColor="$background"
          borderRadius="$10" // Circular background for icon
        >
          <Ionicons
            name={iconName}
            size={20}
            color={iconColor || theme.color.val}
          />
        </View>
        <Text fontSize="$4" color="$color" flex={1}>
          {label}
        </Text>
      </XStack>
      {rightContent || (
        <Ionicons
          name="chevron-forward"
          size={20}
          color={theme.colorPress.val}
        />
      )}
    </Button>
  );

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <XStack left="$4">
          <Button
            circular
            size="$3"
            onPress={() => router.back()}
            backgroundColor="$backgroundTransparent" // Make it more subtle or match design
            pressStyle={{ backgroundColor: '$backgroundFocus' }}
            icon={<Ionicons name="close" size={24} color={theme.color.val} />}
          />
        </XStack>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$3">
            {/* Profile Section */}
            <YStack alignItems="center" gap="$2.5">
              <Avatar circular size="$9">
                <Avatar.Image
                  accessibilityLabel="User avatar"
                  src={userData.avatarUrl}
                />
                <Avatar.Fallback backgroundColor="$backgroundStrong" />
              </Avatar>
              <Text fontSize="$7" fontWeight="bold" color="$color">
                {userData.name}
              </Text>
              <Paragraph fontSize="$3">{userData.email}</Paragraph>
              <Button
                size="$3"
                onPress={() => router.push('/(authenticated)/setting/profile')}
                iconAfter={
                  <Ionicons
                    name="arrow-forward"
                    size={16}
                    color={theme.color.val}
                  />
                }
              >
                View Profile
              </Button>
            </YStack>

            <Separator />

            {/* Notification Section */}
            <SettingItem
              iconName="notifications-off-outline"
              iconColor={theme.brandColor.val}
              label="알림"
              onPress={() =>
                router.push('/(authenticated)/setting/notification')
              } // Or toggle directly
            />
            <SettingItem
              iconName="people-outline"
              iconColor={theme.brandColor.val}
              label="스탭 관리"
              onPress={() => router.push('/(authenticated)/setting/staffs')} // Example link
            />
            <SettingItem
              iconName="home-outline"
              iconColor={theme.brandColor.val}
              label="게스트하우스 관리"
              onPress={() => router.push('/(authenticated)/setting/manage')} // Example link
            />
            <SettingItem
              iconName="pricetags-outline"
              iconColor={theme.brandColor.val}
              label="멤버십 확인"
              onPress={() => router.push('/(authenticated)/setting/membership')} // Example link
            />

            <Separator />

            {/* Logout Button */}
            <Button
              size="$4"
              backgroundColor="$brandColor"
              color="$background"
              fontWeight="500"
              onPress={handleLogout}
              disabled={isLogoutInProgress}
              icon={
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={theme.background.val}
                />
              }
            >
              Log out
            </Button>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
