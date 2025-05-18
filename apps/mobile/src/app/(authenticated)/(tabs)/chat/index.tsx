import { Background } from "@/components/ui/Background";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  ScrollView,
  useTheme,
  Card,
  Avatar,
} from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useRouter } from "expo-router";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isHost: boolean;
}

interface ChatRoom {
  id: string;
  guestName: string;
  guestRoom: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export default function ChatScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  // Mock data for chat rooms
  const chatRooms: ChatRoom[] = [
    {
      id: "1",
      guestName: "김민준",
      guestRoom: "101호",
      lastMessage: "네, 알겠습니다!",
      lastMessageTime: "14:30",
      unreadCount: 2,
    },
    {
      id: "2",
      guestName: "이수현",
      guestRoom: "102호",
      lastMessage: "체크인 시간이 언제인가요?",
      lastMessageTime: "12:15",
      unreadCount: 0,
    },
    {
      id: "3",
      guestName: "박지훈",
      guestRoom: "여성 도미토리",
      lastMessage: "감사합니다!",
      lastMessageTime: "어제",
      unreadCount: 0,
    },
  ];

  // Mock data for chat messages
  const chatMessages: ChatMessage[] = [
    {
      id: "1",
      senderId: "host",
      senderName: "호스트",
      content: "안녕하세요! 체크인 시간에 대해 문의드립니다.",
      timestamp: "14:25",
      isHost: true,
    },
    {
      id: "2",
      senderId: "guest1",
      senderName: "김민준",
      content: "네, 알겠습니다!",
      timestamp: "14:30",
      isHost: false,
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement message sending logic
      setMessage("");
    }
  };

  const handleChatRoomPress = (room: ChatRoom) => {
    router.push({
      pathname: "/(authenticated)/(tabs)/chat/[user]",
      params: {
        user: room.id,
        userName: room.guestName,
        userRoom: room.guestRoom,
      },
    });
  };

  const renderChatList = () => (
    <YStack gap="$2">
      {chatRooms.map((room) => (
        <Card
          key={room.id}
          backgroundColor={theme.backgroundHover}
          padding="$3"
          borderRadius="$4"
          pressStyle={{ backgroundColor: theme.backgroundFocus }}
          onPress={() => handleChatRoomPress(room)}
        >
          <XStack alignItems="center" gap="$3">
            <Avatar circular size="$4">
              <Avatar.Fallback backgroundColor={theme.backgroundStrong} />
            </Avatar>
            <YStack flex={1}>
              <XStack justifyContent="space-between" alignItems="center">
                <Text fontSize="$5" fontWeight="600" color={theme.color}>
                  {room.guestName}
                </Text>
                <Text fontSize="$2" color={theme.placeholderColor}>
                  {room.lastMessageTime}
                </Text>
              </XStack>
              <XStack justifyContent="space-between" alignItems="center">
                <Text
                  fontSize="$3"
                  color={theme.placeholderColor}
                  numberOfLines={1}
                >
                  {room.lastMessage}
                </Text>
                {room.unreadCount > 0 && (
                  <XStack
                    backgroundColor={theme.brandColor}
                    paddingHorizontal="$2"
                    paddingVertical="$1"
                    borderRadius="$10"
                  >
                    <Text fontSize="$2" color="white">
                      {room.unreadCount}
                    </Text>
                  </XStack>
                )}
              </XStack>
            </YStack>
          </XStack>
        </Card>
      ))}
    </YStack>
  );

  const renderChatRoom = (roomId: string) => {
    const room = chatRooms.find((r) => r.id === roomId);
    if (!room) return null;

    return (
      <YStack flex={1}>
        {/* Chat Header */}
        <XStack
          padding="$3"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
          alignItems="center"
          gap="$3"
        >
          <Button
            circular
            size="$3"
            onPress={() => setSelectedRoom(null)}
            backgroundColor="$backgroundTransparent"
            pressStyle={{ backgroundColor: "$backgroundFocus" }}
            icon={
              <Ionicons name="arrow-back" size={24} color={theme.color.val} />
            }
          />
          <Avatar circular size="$4">
            <Avatar.Fallback backgroundColor={theme.backgroundStrong} />
          </Avatar>
          <YStack>
            <Text fontSize="$5" fontWeight="600" color={theme.color}>
              {room.guestName}
            </Text>
            <Text fontSize="$2" color={theme.placeholderColor}>
              {room.guestRoom}
            </Text>
          </YStack>
        </XStack>

        {/* Chat Messages */}
        <ScrollView
          flex={1}
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          <YStack gap="$3">
            {chatMessages.map((msg) => (
              <XStack
                key={msg.id}
                justifyContent={msg.isHost ? "flex-end" : "flex-start"}
              >
                <Card
                  backgroundColor={
                    msg.isHost ? theme.brandColor : theme.backgroundHover
                  }
                  padding="$3"
                  borderRadius="$4"
                  maxWidth="80%"
                >
                  <Text
                    color={msg.isHost ? "white" : theme.color}
                    fontSize="$4"
                  >
                    {msg.content}
                  </Text>
                  <Text
                    fontSize="$1"
                    color={
                      msg.isHost
                        ? "rgba(255,255,255,0.7)"
                        : theme.placeholderColor
                    }
                    marginTop="$1"
                  >
                    {msg.timestamp}
                  </Text>
                </Card>
              </XStack>
            ))}
          </YStack>
        </ScrollView>

        {/* Message Input */}
        <XStack
          padding="$3"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          gap="$2"
        >
          <Input
            flex={1}
            value={message}
            onChangeText={setMessage}
            placeholder="메시지를 입력하세요..."
            borderColor="$borderColor"
          />
          <Button
            circular
            size="$4"
            backgroundColor={theme.brandColor}
            onPress={handleSendMessage}
            disabled={!message.trim()}
            icon={<Ionicons name="send" size={20} color="white" />}
          />
        </XStack>
      </YStack>
    );
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <YStack flex={1}>
          {selectedRoom ? (
            renderChatRoom(selectedRoom)
          ) : (
            <>
              <XStack padding="$4" alignItems="center">
                <Text fontSize="$8" fontWeight="bold" color={theme.color}>
                  채팅
                </Text>
              </XStack>
              <ScrollView
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
              >
                {renderChatList()}
              </ScrollView>
            </>
          )}
        </YStack>
      </SafeAreaView>
    </Background>
  );
}
