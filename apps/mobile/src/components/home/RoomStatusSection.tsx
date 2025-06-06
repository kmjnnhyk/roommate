import { Text, useTheme, XStack, YStack } from "tamagui";
import { RoomStatus } from "@/modules/home/useRoomStatus";
import { RoomCard } from "./RoomCard";

interface RoomStatusSectionProps {
  roomChunks: RoomStatus[][];
}

export function RoomStatusSection({ roomChunks }: RoomStatusSectionProps) {
  const theme = useTheme();

  return (
    <YStack gap="$3">
      {roomChunks.map((chunk, rowIndex) => (
        <XStack key={rowIndex} gap="$3">
          {chunk.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </XStack>
      ))}
    </YStack>
  );
}
