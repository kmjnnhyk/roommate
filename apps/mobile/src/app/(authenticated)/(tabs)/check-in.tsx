import { Background } from '@/components/ui/Background';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Button,
  Card,
  ScrollView,
  Separator,
  Text,
  TextArea,
  useTheme,
  XStack,
  YStack,
} from 'tamagui';

const SectionHeader = ({ title }: { title: string }) => (
  <Text
    fontSize="$6"
    fontWeight="600"
    color={useTheme().color}
    marginBottom="$2"
  >
    {title}
  </Text>
);

interface GuestCheckinInfo {
  id: string;
  name: string;
  roomName: string;
  isCheckedIn: boolean;
  estimatedTime: string | null;
  attendingParty: boolean;
  phoneNumber: string;
}

export default function () {
  const theme = useTheme();
  const [bulkMessage, setBulkMessage] = useState(
    '안녕하세요! 오늘 저녁 7시에 로비에서 간단한 파티가 있을 예정입니다. 많은 참석 부탁드립니다 :)',
  ); // 공지 메시지 상태 추가
  const [guests, setGuests] = useState<GuestCheckinInfo[]>([
    {
      id: '1',
      name: '김민준',
      roomName: '101호', // 방 이름 할당
      isCheckedIn: true,
      estimatedTime: '15:00',
      attendingParty: true,
      phoneNumber: '010-1234-5678',
    },
    {
      id: '2',
      name: '이수현',
      roomName: '102호', // 방 이름 할당
      isCheckedIn: false,
      estimatedTime: '17:30',
      attendingParty: false,
      phoneNumber: '010-9876-5432',
    },
    {
      id: '3',
      name: '박지훈',
      roomName: '101호', // 방 이름 할당
      isCheckedIn: false,
      estimatedTime: null,
      attendingParty: true,
      phoneNumber: '010-1111-2222',
    },
    {
      id: '4',
      name: '최유나',
      roomName: '여성 도미토리', // 방 이름 할당
      isCheckedIn: true,
      estimatedTime: '16:00',
      attendingParty: true,
      phoneNumber: '010-3333-4444',
    },
    {
      id: '5',
      name: '정재현',
      roomName: '남성 도미토리', // 방 이름 할당
      isCheckedIn: false,
      estimatedTime: '19:00',
      attendingParty: false,
      phoneNumber: '010-5555-6666',
    },
  ]);

  // 그룹핑 로직 추가
  const groupedGuests = guests.reduce(
    (acc, guest) => {
      const room = guest.roomName;
      if (!acc[room]) {
        acc[room] = [];
      }
      acc[room].push(guest);
      return acc;
    },
    {} as Record<string, GuestCheckinInfo[]>, // 타입 명시
  );

  // 일괄 메시지 발송 핸들러
  const handleSendBulkMessage = () => {
    const guestNames = guests.map((g) => g.name).join(', ');
    alert(
      `다음 게스트에게 메시지 일괄 발송:\n${guestNames}\n\n내용:\n${bulkMessage}`,
    );
    // 실제 발송 로직 구현 필요
  };

  const handleSendMessage = (guest: GuestCheckinInfo) => {
    alert(`${guest.name}님(${guest.phoneNumber})에게 문자 발송 기능 실행`);
  };

  const toggleCheckin = (guestId: string) => {
    setGuests(
      guests.map((g) =>
        g.id === guestId ? { ...g, isCheckedIn: !g.isCheckedIn } : g,
      ),
    );
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        {/* Large Header Text */}
        <XStack paddingHorizontal="$4" paddingVertical="$3" alignItems="center">
          <Text fontSize="$8" fontWeight="bold" color={theme.color}>
            체크인
          </Text>
          {/* You could add other header elements here if needed, e.g., a back button */}
        </XStack>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$5">
            {/* 게스트 공지 발송 섹션 */}
            <YStack gap="$2">
              <SectionHeader title="게스트 공지 발송" />
              <Card
                backgroundColor={theme.backgroundHover}
                padding="$3"
                borderRadius="$4"
                gap="$3" // Add gap for spacing between TextArea and Button
              >
                <TextArea
                  placeholder="게스트에게 보낼 공지 내용을 입력하세요..."
                  value={''}
                  onChangeText={() => {}}
                  backgroundColor="$backgroundTransparent"
                  color={theme.color}
                  borderColor={theme.borderColor}
                  placeholderTextColor={theme.placeholderColor}
                  minHeight={80}
                />
                <Button
                  iconAfter={<Ionicons name="send-outline" size={16} />}
                  onPress={() => {}}
                >
                  일괄 전송
                </Button>
              </Card>
            </YStack>

            {/* 체크인 현황 (방별 그룹핑) */}
            <YStack gap="$3">
              {Object.entries(groupedGuests).map(([roomName, guestsInRoom]) => (
                <YStack key={roomName} gap="$3">
                  {/* 방 이름 헤더 */}
                  <Text
                    fontSize="$4"
                    fontWeight="500"
                    color={theme.color}
                    paddingLeft="$1"
                  >
                    {roomName} ({guestsInRoom.length}명)
                  </Text>
                  {/* 해당 방의 게스트 목록 */}
                  {guestsInRoom.map((guest) => (
                    <Card
                      key={guest.id}
                      backgroundColor={theme.backgroundHover}
                      padding="$3"
                      borderRadius="$4"
                      gap="$3"
                    >
                      {/* 기존 게스트 카드 내용과 동일하게 사용 */}
                      <XStack
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Text
                          fontSize="$5"
                          fontWeight="600"
                          color={theme.color}
                        >
                          {guest.name}
                        </Text>
                        <Button
                          size="$2"
                          variant="outlined"
                          onPress={() => toggleCheckin(guest.id)}
                          borderColor={
                            guest.isCheckedIn ? theme.sub1 : theme.sub2
                          }
                          color={guest.isCheckedIn ? theme.sub1 : theme.sub2}
                          iconAfter={
                            guest.isCheckedIn ? (
                              <Ionicons
                                name="checkmark-circle"
                                size={16}
                                color={theme.sub1?.val}
                              />
                            ) : (
                              <Ionicons
                                name="close-circle"
                                size={16}
                                color={theme.sub2?.val}
                              />
                            )
                          }
                        >
                          {guest.isCheckedIn ? '체크인 완료' : '체크인 전'}
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
                            예상 시간:{' '}
                          </Text>
                          <Text color={theme.color} fontSize="$2">
                            {guest.estimatedTime ?? '미정'}
                          </Text>
                        </XStack>
                        <XStack
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <XStack alignItems="center" gap="$2">
                            <Ionicons
                              name="beer-outline"
                              size={16}
                              color={theme.placeholderColor.val}
                            />
                            <Text color={theme.placeholderColor} fontSize="$2">
                              파티 참석:{' '}
                            </Text>
                            <Text
                              color={
                                guest.attendingParty ? theme.sub1 : theme.sub2
                              }
                              fontSize="$2"
                            >
                              {guest.attendingParty ? '예' : '아니오'}
                            </Text>
                          </XStack>
                          <Button
                            size="$2"
                            chromeless
                            icon={
                              <Ionicons
                                name="chatbubble-ellipses-outline"
                                size={20}
                                color={theme.brandColor.val}
                              />
                            }
                            onPress={() => handleSendMessage(guest)}
                          >
                            <Text color={theme.brandColor} fontSize="$2">
                              문자
                            </Text>
                          </Button>
                        </XStack>
                      </YStack>
                    </Card>
                  ))}
                </YStack>
              ))}
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
