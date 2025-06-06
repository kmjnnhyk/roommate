import { Ionicons } from "@expo/vector-icons";
import {
  Button,
  Card,
  Separator,
  Text,
  useTheme,
  XStack,
  YStack,
} from "tamagui";
import type { GuestCheckinInfo } from "@/modules/check-in/useGuestCheckin";

interface GuestCardProps {
  guest: GuestCheckinInfo;
  onToggleCheckin: (id: string) => void;
  onSendMessage: (guest: GuestCheckinInfo) => void;
}

export function GuestCard({
  guest,
  onToggleCheckin,
  onSendMessage,
}: GuestCardProps) {
  const theme = useTheme();

  return (
    <Card
      backgroundColor={theme.backgroundHover}
      padding="$3"
      borderRadius="$4"
      gap="$3"
    >
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$5" fontWeight="600" color={theme.color}>
          {guest.name}
        </Text>
        <Button
          size="$2"
          variant="outlined"
          onPress={() => onToggleCheckin(guest.id)}
          borderColor={guest.isCheckedIn ? theme.sub1 : theme.sub2}
          color={guest.isCheckedIn ? theme.sub1 : theme.sub2}
          iconAfter={
            guest.isCheckedIn ? (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={theme.sub1?.val}
              />
            ) : (
              <Ionicons name="close-circle" size={16} color={theme.sub2?.val} />
            )
          }
        >
          {guest.isCheckedIn ? "체크인 완료" : "체크인 전"}
        </Button>
      </XStack>

      <Separator borderColor={theme.borderColor} />

      <YStack gap="$2">
        <XStack alignItems="center" gap="$2">
          <Ionicons
            name="time-outline"
            size={16}
            color={theme.placeholderColor?.val}
          />
          <Text color={theme.placeholderColor} fontSize="$2">
            예상 시간:{" "}
          </Text>
          <Text color={theme.color} fontSize="$2">
            {guest.estimatedTime ?? "미정"}
          </Text>
        </XStack>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap="$2">
            <Ionicons
              name="beer-outline"
              size={16}
              color={theme.placeholderColor?.val}
            />
            <Text color={theme.placeholderColor} fontSize="$2">
              파티 참석:{" "}
            </Text>
            <Text color={theme.color} fontSize="$2">
              {guest.attendingParty ? "예" : "아니오"}
            </Text>
          </XStack>
          <Button
            size="$2"
            variant="outlined"
            onPress={() => onSendMessage(guest)}
            iconAfter={<Ionicons name="chatbubble-outline" size={16} />}
          >
            메시지
          </Button>
        </XStack>
      </YStack>
    </Card>
  );
}
