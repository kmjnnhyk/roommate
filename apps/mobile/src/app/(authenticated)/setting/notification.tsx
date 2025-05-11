import { Background } from '@/components/ui/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  YStack,
  XStack,
  Text,
  Button,
  useTheme,
  ScrollView,
  Switch,
  H4,
  View,
  Paragraph,
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// SettingItem을 재사용하거나 유사한 컴포넌트를 만듭니다.
// 여기서는 SettingScreen의 SettingItem과 유사하게 직접 구현합니다.
const NotificationSettingItem = ({
  iconName,
  iconColor,
  label,
  description,
  onToggle,
  isEnabled,
}: {
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  label: string;
  description?: string;
  onToggle: (value: boolean) => void;
  isEnabled: boolean;
}) => {
  const theme = useTheme();
  return (
    <XStack
      paddingVertical="$3"
      paddingHorizontal="$3"
      backgroundColor="$backgroundHover"
      borderRadius="$4"
      alignItems="center"
      justifyContent="space-between"
      gap="$3"
    >
      <XStack alignItems="center" gap="$3" flex={1}>
        <View
          padding="$2"
          backgroundColor="$background" // 아이콘 배경은 기본 배경색으로
          borderRadius="$10"
        >
          <Ionicons
            name={iconName}
            size={22}
            color={iconColor || theme.color.val}
          />
        </View>
        <YStack flex={1}>
          <Text fontSize="$4" color="$color">
            {label}
          </Text>
          {description && <Paragraph fontSize="$2">{description}</Paragraph>}
        </YStack>
      </XStack>
      <Switch
        checked={isEnabled}
        onCheckedChange={onToggle}
        size="$3"
        native="ios"
      >
        <Switch.Thumb animation="quick" />
      </Switch>
    </XStack>
  );
};

export default function NotificationScreen() {
  const theme = useTheme();
  const router = useRouter();

  // 알림 상태 관리 (실제 앱에서는 이 상태를 저장하고 불러와야 합니다)
  const [guestMessageNotifications, setGuestMessageNotifications] =
    useState(true);
  const [guestCheckInNotifications, setGuestCheckInNotifications] =
    useState(true);
  const [allNotifications, setAllNotifications] = useState(true); // 전체 알림 설정

  const handleToggleAllNotifications = (value: boolean) => {
    setAllNotifications(value);
    // 전체 알림 설정 시 개별 알림도 함께 변경 (선택적)
    setGuestMessageNotifications(value);
    setGuestCheckInNotifications(value);
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Header with Back Button and Title */}
        <XStack
          paddingHorizontal="$3"
          paddingVertical="$2.5"
          alignItems="center"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          <Button
            circular
            size="$3"
            onPress={() => router.back()}
            backgroundColor="$backgroundTransparent"
            pressStyle={{ backgroundColor: '$backgroundFocus' }}
            icon={
              <Ionicons name="arrow-back" size={24} color={theme.color.val} />
            }
          />
          <H4 color="$color" marginLeft="$3" flex={1} textAlign="left">
            알림 설정
          </H4>
        </XStack>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$4">
            <NotificationSettingItem
              iconName={
                allNotifications
                  ? 'notifications-outline'
                  : 'notifications-off-outline'
              }
              iconColor={
                allNotifications ? theme.brandColor.val : theme.colorPress.val
              }
              label="전체 알림"
              description="모든 푸시 알림을 받거나 받지 않습니다."
              isEnabled={allNotifications}
              onToggle={handleToggleAllNotifications}
            />

            {/* 개별 알림 설정 (전체 알림이 켜져 있을 때만 활성화되도록 할 수 있음) */}
            <YStack gap="$3" opacity={allNotifications ? 1 : 0.5}>
              <NotificationSettingItem
                iconName="chatbubble-ellipses-outline"
                iconColor={theme.blue10?.val || theme.brandColor.val} // 테마에 blue10이 없다면 brandColor 사용
                label="게스트 메시지 알림"
                description="새로운 게스트 메시지 도착 시 알림"
                isEnabled={guestMessageNotifications}
                onToggle={setGuestMessageNotifications}
                // disabled={!allNotifications} // Switch 컴포넌트에 disabled prop이 있다면 사용
              />
              <NotificationSettingItem
                iconName="log-in-outline"
                iconColor={theme.green10?.val || theme.brandColor.val} // 테마에 green10이 없다면 brandColor 사용
                label="게스트 체크인 알림"
                description="게스트 체크인 시 알림"
                isEnabled={guestCheckInNotifications}
                onToggle={setGuestCheckInNotifications}
                // disabled={!allNotifications}
              />
            </YStack>
            {/* 추가적인 알림 설정 항목이 있다면 여기에 추가 */}
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
