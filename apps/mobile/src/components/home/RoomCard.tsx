import { Ionicons } from "@expo/vector-icons";
import { Card, Progress, Text, useTheme, XStack, YStack } from "tamagui";
import { RoomStatus } from "@/modules/home/useRoomStatus";

interface RoomCardProps {
  room: RoomStatus;
}

export function RoomCard({ room }: RoomCardProps) {
  const theme = useTheme();
  const occupancyRate = (room.checkedIn / room.capacity) * 100;

  return (
    <Card
      backgroundColor={theme.backgroundHover}
      padding="$3"
      borderRadius="$4"
      flex={1}
    >
      <YStack gap="$2">
        <XStack alignItems="center" gap="$2">
          <Ionicons
            name={room.iconName}
            size={24}
            color={theme[room.iconColor?.replace("$", "") || "color"].val}
          />
          <YStack>
            <Text fontSize="$5" fontWeight="600" color={theme.color}>
              {room.name}
            </Text>
            <Text fontSize="$2" color={theme.placeholderColor}>
              {room.type}
            </Text>
          </YStack>
        </XStack>
        <YStack gap="$1">
          <XStack justifyContent="space-between">
            <Text fontSize="$2" color={theme.placeholderColor}>
              체크인 현황
            </Text>
            <Text fontSize="$2" color={theme.color}>
              {room.checkedIn}/{room.capacity}
            </Text>
          </XStack>
          <Progress
            value={occupancyRate}
            backgroundColor={theme.backgroundStrong}
            borderColor={theme.borderColor}
          >
            <Progress.Indicator
              animation="bouncy"
              backgroundColor={
                theme[room.iconColor?.replace("$", "") || "color"]
              }
            />
          </Progress>
        </YStack>
      </YStack>
    </Card>
  );
}
