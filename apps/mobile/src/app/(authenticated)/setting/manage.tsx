import { Background } from '@/components/ui/Background';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  YStack,
  XStack,
  Text,
  Button,
  useTheme,
  ScrollView,
  Input,
  H4,
  Card,
  Separator,
  Label,
  View,
  H3,
  Image,
  Select,
  Adapt,
  Sheet,
  type SelectProps,
  Paragraph, // SelectProps를 사용하기 위해 추가
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react'; // useEffect 추가
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
// import * as ImagePicker from 'expo-image-picker'; // 실제 이미지 피커 사용 시 주석 해제

// 온보딩 스크린에서 가져온 타입 및 옵션 (실제로는 공유 모듈로 분리하는 것이 좋음)
interface RoomInfo {
  id: string;
  name: string;
  capacity: string;
  gender: 'mixed' | 'female_only' | 'male_only' | '';
}

const partyStyleOptions = [
  { name: '포틀럭', value: 'potluck' },
  { name: '저녁 제공', value: 'dinner_provided' },
  { name: '기타', value: 'other' },
];

const genderOptions = [
  { name: '선택하세요', value: '' },
  { name: '혼성', value: 'mixed' },
  { name: '여성 전용', value: 'female_only' },
  { name: '남성 전용', value: 'male_only' },
];

// 가상 데이터 저장/로드 함수 (실제 앱에서는 API 또는 AsyncStorage 사용)
const GUESTHOUSE_DATA_KEY = 'guesthouse_manage_data';
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const saveGuesthouseData = async (data: any) => {
  // await AsyncStorage.setItem(GUESTHOUSE_DATA_KEY, JSON.stringify(data));
};
const loadGuesthouseData = async () => {
  // const data = await AsyncStorage.getItem(GUESTHOUSE_DATA_KEY);
  // return data ? JSON.parse(data) : null;
  // 임시 목업 데이터 반환
  return {
    guesthouseName: '별밤 게스트하우스 (수정 전)',
    phoneNumber: '010-0000-0000',
    photoUri: null, // 'https://example.com/photo.jpg' 등으로 테스트 가능
    partyStyle: 'potluck',
    rooms: [
      { id: '1', name: '101호 도미토리', capacity: '4', gender: 'mixed' },
    ],
  };
};

export default function ManageScreen() {
  const theme = useTheme();
  const router = useRouter();

  // Form State
  const [guesthouseName, setGuesthouseName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [partyStyle, setPartyStyle] =
    useState<(typeof partyStyleOptions)[number]['value']>('potluck');
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [newRoom, setNewRoom] = useState<Omit<RoomInfo, 'id'>>({
    name: '',
    capacity: '',
    gender: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await loadGuesthouseData();
      if (data) {
        setGuesthouseName(data.guesthouseName || '');
        setPhoneNumber(data.phoneNumber || '');
        setPhotoUri(data.photoUri || null);
        setPartyStyle(data.partyStyle || 'potluck');
        setRooms(data.rooms as RoomInfo[]);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // Image Picker (실제 사용 시 주석 해제 및 권한 설정 필요)
  // const pickImage = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== 'granted') {
  //     alert('사진 라이브러리 접근 권한이 필요합니다.');
  //     return;
  //   }
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.canceled) {
  //     setPhotoUri(result.assets[0].uri);
  //   }
  // };

  const handleAddRoom = () => {
    if (!newRoom.name || !newRoom.capacity || !newRoom.gender) {
      alert('방 이름, 인원, 유형을 모두 입력해주세요.');
      return;
    }
    setRooms([...rooms, { ...newRoom, id: Date.now().toString() }]);
    setNewRoom({ name: '', capacity: '', gender: '' }); // Reset new room form
    alert('방이 추가되었습니다.');
  };

  const handleRemoveRoom = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
    alert('방이 삭제되었습니다.');
  };

  const handleSubmit = async () => {
    const updatedData = {
      guesthouseName,
      phoneNumber,
      photoUri,
      partyStyle,
      rooms: rooms.map((r) => ({
        ...r,
        capacity: Number.parseInt(r.capacity, 10) || 0, // 저장 시 숫자로 변환
      })),
    };
    await saveGuesthouseData(updatedData);
    alert('정보가 수정되었습니다.');
    router.back(); // 이전 화면으로 돌아가기
  };

  if (isLoading) {
    return (
      <Background>
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>정보를 불러오는 중...</Text>
        </SafeAreaView>
      </Background>
    );
  }

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        {/* Header */}
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
            게스트하우스 정보 수정
          </H4>
        </XStack>

        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 80 /* Space for save button */,
          }}
        >
          <YStack padding="$4" gap="$5" flex={1}>
            {/* 기본 정보 */}
            <YStack gap="$4">
              <H3 color={theme.color}>기본 정보</H3>
              <YStack gap="$2" alignItems="center">
                <Label color={theme.color}>대표 사진</Label>
                {photoUri ? (
                  <Image
                    source={{ uri: photoUri, width: 200, height: 150 }}
                    borderRadius="$4"
                  />
                ) : (
                  <View
                    width={200}
                    height={150}
                    backgroundColor="$backgroundStrong"
                    borderRadius="$4"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Ionicons
                      name="image-outline"
                      size={40}
                      color={theme.color.val}
                    />
                  </View>
                )}
                <Button
                  onPress={() =>
                    alert('Image picker functionality to be added.')
                  } // pickImage 주석 해제 시 pickImage로 변경
                  size="$3"
                >
                  사진 변경
                </Button>
              </YStack>
              <YStack gap="$2">
                <Label htmlFor="guesthouseName" color={theme.color}>
                  게스트하우스 이름
                </Label>
                <Input
                  id="guesthouseName"
                  value={guesthouseName}
                  onChangeText={setGuesthouseName}
                  size="$4"
                  borderColor="$borderColor"
                />
              </YStack>
              <YStack gap="$2">
                <Label htmlFor="phoneNumber" color={theme.color}>
                  대표 전화번호
                </Label>
                <Input
                  id="phoneNumber"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  size="$4"
                  borderColor="$borderColor"
                />
              </YStack>
            </YStack>

            <Separator />

            {/* 상세 정보 */}
            <YStack gap="$4">
              <H3 color={theme.color}>상세 정보</H3>
              <YStack gap="$2">
                <Label htmlFor="partyStyle" color={theme.color}>
                  파티 방식
                </Label>
                <Select
                  id="partyStyle"
                  value={partyStyle}
                  onValueChange={(val) =>
                    setPartyStyle(val as typeof partyStyle)
                  }
                  native={false} // Tamagui Select 권장 방식
                >
                  <Select.Trigger
                    width="100%"
                    iconAfter={<Ionicons name="chevron-down" />}
                  >
                    <Select.Value placeholder="파티 방식을 선택하세요" />
                  </Select.Trigger>
                  <Adapt when="sm" platform="touch">
                    <Sheet modal dismissOnSnapToBottom>
                      <Sheet.Frame>
                        <Sheet.ScrollView>
                          <Adapt.Contents />
                        </Sheet.ScrollView>
                      </Sheet.Frame>
                      <Sheet.Overlay />
                    </Sheet>
                  </Adapt>
                  <Select.Content zIndex={200000}>
                    <Select.Viewport>
                      {partyStyleOptions.map((opt, i) => (
                        <Select.Item
                          index={i}
                          key={opt.value}
                          value={opt.value}
                        >
                          <Select.ItemText>{opt.name}</Select.ItemText>
                          <Select.ItemIndicator marginLeft="auto">
                            <Icon
                              name="check"
                              size={16}
                              color={theme.brandColor.val}
                            />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select>
              </YStack>
            </YStack>

            <Separator />

            {/* 방 정보 */}
            <YStack gap="$4">
              <H3 color={theme.color}>방 정보 관리</H3>
              <Card padding="$3" gap="$3" backgroundColor="$backgroundStrong">
                <H4 color={theme.color}>새로운 방 추가/수정</H4>
                <Input
                  placeholder="방 이름"
                  value={newRoom.name}
                  onChangeText={(name) =>
                    setNewRoom((prev) => ({ ...prev, name }))
                  }
                  borderColor="$borderColor"
                />
                <Input
                  placeholder="총 인원"
                  value={newRoom.capacity}
                  onChangeText={(capacity) =>
                    setNewRoom((prev) => ({ ...prev, capacity }))
                  }
                  keyboardType="number-pad"
                  borderColor="$borderColor"
                />
                <Select
                  id="roomGender"
                  value={newRoom.gender}
                  onValueChange={(val) =>
                    setNewRoom((prev) => ({
                      ...prev,
                      gender: val as RoomInfo['gender'],
                    }))
                  }
                  native={false}
                >
                  <Select.Trigger
                    width="100%"
                    iconAfter={<Ionicons name="chevron-down" />}
                  >
                    <Select.Value placeholder="성별 유형 선택" />
                  </Select.Trigger>
                  <Adapt when="sm" platform="touch">
                    <Sheet modal dismissOnSnapToBottom>
                      <Sheet.Frame>
                        <Sheet.ScrollView>
                          <Adapt.Contents />
                        </Sheet.ScrollView>
                      </Sheet.Frame>
                      <Sheet.Overlay />
                    </Sheet>
                  </Adapt>
                  <Select.Content zIndex={200000}>
                    <Select.Viewport>
                      {genderOptions.map((opt, i) => (
                        <Select.Item
                          index={i}
                          key={opt.value}
                          value={opt.value}
                        >
                          <Select.ItemText>{opt.name}</Select.ItemText>
                          <Select.ItemIndicator marginLeft="auto">
                            <Icon
                              name="check"
                              size={16}
                              color={theme.brandColor.val}
                            />
                          </Select.ItemIndicator>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select>
                <Button onPress={handleAddRoom} size="$3">
                  방 추가하기
                </Button>
              </Card>

              {rooms.length > 0 && <Separator marginVertical="$2" />}
              {rooms.map((room) => (
                <Card
                  key={room.id}
                  padding="$3"
                  backgroundColor="$backgroundHover"
                >
                  <XStack justifyContent="space-between" alignItems="center">
                    <YStack>
                      <Text fontWeight="bold" color={theme.color}>
                        {room.name}
                      </Text>
                      <Paragraph>
                        인원: {room.capacity}명, 유형:{' '}
                        {genderOptions.find((g) => g.value === room.gender)
                          ?.name || room.gender}
                      </Paragraph>
                    </YStack>
                    <Button
                      size="$2.5"
                      circular
                      icon={
                        <Ionicons
                          name="trash-outline"
                          size={18}
                          color={theme.borderColor.val}
                        />
                      }
                      onPress={() => handleRemoveRoom(room.id)}
                    />
                  </XStack>
                </Card>
              ))}
            </YStack>
          </YStack>
        </ScrollView>

        {/* Save Button */}
        <XStack
          padding="$4"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          backgroundColor="$background"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        >
          <Button onPress={handleSubmit} flex={1} size="$4">
            수정 완료
          </Button>
        </XStack>
      </SafeAreaView>
    </Background>
  );
}
