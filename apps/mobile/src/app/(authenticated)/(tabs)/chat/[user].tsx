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
import { useLocalSearchParams, useRouter } from "expo-router";

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isHost: boolean;
}

export default function ChatRoomScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { user, userName, userRoom } = useLocalSearchParams<{
    user: string;
    userName: string;
    userRoom: string;
  }>();
  const [message, setMessage] = useState("");

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
      senderName: userName || "게스트",
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

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
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
              onPress={() => router.back()}
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
                {userName}
              </Text>
              <Text fontSize="$2" color={theme.placeholderColor}>
                {userRoom}
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
      </SafeAreaView>
    </Background>
  );
}
