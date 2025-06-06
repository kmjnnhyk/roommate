import { Background } from "@/components/ui/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme, XStack, YStack } from "tamagui";
import { useGuestCheckin } from "@/modules/check-in/useGuestCheckin";
import { GuestNoticeSection } from "@/components/check-in/GuestNoticeSection";
import { GuestListSection } from "@/components/check-in/GuestListSection";

export default function CheckInScreen() {
  const theme = useTheme();
  const {
    bulkMessage,
    setBulkMessage,
    groupedGuests,
    handleSendBulkMessage,
    handleSendMessage,
    toggleCheckin,
  } = useGuestCheckin();

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <XStack paddingHorizontal="$4" paddingVertical="$3" alignItems="center">
          <Text fontSize="$8" fontWeight="bold" color={theme.color}>
            체크인
          </Text>
        </XStack>
        <YStack padding="$4" gap="$5">
          <GuestNoticeSection
            bulkMessage={bulkMessage}
            setBulkMessage={setBulkMessage}
            onSendBulkMessage={handleSendBulkMessage}
          />
          <GuestListSection
            groupedGuests={groupedGuests}
            onToggleCheckin={toggleCheckin}
            onSendMessage={handleSendMessage}
          />
        </YStack>
      </SafeAreaView>
    </Background>
  );
}
