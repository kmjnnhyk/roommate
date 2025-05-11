import React, { useState } from 'react';
import {
  YStack,
  XStack,
  Text,
  Button,
  Input,
  ScrollView,
  useTheme,
  H4,
  Paragraph,
  Select,
  Adapt,
  Sheet,
  Image,
  Card,
  Separator,
  Label,
  View,
  H3,
  type SelectProps,
} from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Assuming Check is available or use lucide-icons
import { Background } from '@/components/ui/Background'; // Assuming you have this
import { Icon } from '@/components/ui/Icon';
import { LinearGradient } from 'expo-linear-gradient';
import { useSession } from '@/providers/session';
import { router } from 'expo-router';
// import * as ImagePicker from 'expo-image-picker'; // For image picking

function SelectDemoItem(props: SelectProps) {
  const [val, setVal] = useState('포틀럭');

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$background"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Icon size={16} name="checkbox-outline" color={'red'} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['$background', 'transparent']}
          />
        </Select.ScrollUpButton>

        <Select.Viewport>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {partyStyleOptions.map((item, i) => {
              return (
                <Select.Item
                  index={i}
                  key={item.name}
                  value={item.name.toLowerCase()}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Icon size={16} name="checkbox-outline" color={'red'} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Icon size={20} name="checkbox-outline" color={'red'} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['transparent', '$background']}
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

function SelectRoomItem(props: SelectProps) {
  const [val, setVal] = useState('포틀럭');

  return (
    <Select
      value={val}
      onValueChange={setVal}
      disablePreventBodyScroll
      {...props}
    >
      <Select.Trigger>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt when="maxMd" platform="touch">
        <Sheet modal dismissOnSnapToBottom animation="medium">
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay
            backgroundColor="$background"
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Icon size={16} name="checkbox-outline" color={'red'} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['$background', 'transparent']}
          />
        </Select.ScrollUpButton>

        <Select.Viewport>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {genderOptions.map((item, i) => {
              return (
                <Select.Item
                  index={i}
                  key={item.name}
                  value={item.name.toLowerCase()}
                >
                  <Select.ItemText>{item.name}</Select.ItemText>
                  <Select.ItemIndicator marginLeft="auto">
                    <Icon size={16} name="checkbox-outline" color={'red'} />
                  </Select.ItemIndicator>
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <Icon size={20} name="checkbox-outline" color={'red'} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            colors={['transparent', '$background']}
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
}

// Dummy signIn function - replace with your actual auth logic or setup completion
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const completeGuesthouseSetup = (data: any) => {
  alert('게스트하우스 설정이 완료되었습니다!');
};

interface RoomInfo {
  id: string;
  name: string;
  capacity: string; // Keep as string for input, parse to number on save
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

export default function OnboardingScreen() {
  const theme = useTheme();
  const { signIn } = useSession();

  const [currentStep, setCurrentStep] = useState(1);

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

  // Image Picker (Example, requires expo-image-picker)
  // const pickImage = async () => {
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
    setRooms([...rooms, { ...newRoom, id: Date.now().toString() }]);
    setNewRoom({ name: '', capacity: '', gender: '' }); // Reset new room form
  };

  const handleRemoveRoom = (roomId: string) => {
    setRooms(rooms.filter((room) => room.id !== roomId));
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const handleSubmit = () => {
    const setupData = {
      guesthouseName,
      phoneNumber,
      photoUri,
      partyStyle,
      rooms: rooms.map((r) => ({
        ...r,
        capacity: Number.parseInt(r.capacity, 10) || 0,
      })),
    };
    completeGuesthouseSetup(setupData);
    signIn();
    router.replace('/(authenticated)/(tabs)');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // 게스트하우스 기본 정보
        return (
          <YStack gap="$4">
            <H3 color={theme.color}>게스트하우스 정보</H3>
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
                onPress={() => alert('Image picker functionality to be added.')}
                size="$3"
              >
                사진 선택
              </Button>
            </YStack>
            <YStack gap="$2">
              <Label htmlFor="guesthouseName" color={theme.color}>
                게스트하우스 이름
              </Label>
              <Input
                id="guesthouseName"
                placeholder="예: 별밤 게스트하우스"
                value={guesthouseName}
                onChangeText={setGuesthouseName}
                size="$4"
              />
            </YStack>
            <YStack gap="$2">
              <Label htmlFor="phoneNumber" color={theme.color}>
                대표 전화번호
              </Label>
              <Input
                id="phoneNumber"
                placeholder="010-1234-5678"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                size="$4"
              />
            </YStack>
          </YStack>
        );
      case 2: // 게스트하우스 상세 정보
        return (
          <YStack gap="$4">
            <H3 color={theme.color}>상세 정보</H3>
            <XStack width={'100%'} alignItems="center" gap="$4">
              <Label htmlFor="select-demo-1" flex={1} minW={80}>
                Custom
              </Label>
              <SelectDemoItem id="select-demo-1" />
            </XStack>
          </YStack>
        );
      case 3: // 방 정보
        return (
          <YStack gap="$4">
            <H3 color={theme.color}>방 정보 입력</H3>
            <Card
              padding="$3"
              gap="$3"
              backgroundColor={theme.backgroundStrong}
            >
              <H4 color={theme.color}>새로운 방 추가</H4>
              <Input
                placeholder="방 이름 (예: 101호, 여성 도미토리 A)"
                value={newRoom.name}
                onChangeText={(name) =>
                  setNewRoom((prev) => ({ ...prev, name }))
                }
              />
              <Input
                placeholder="총 인원"
                value={newRoom.capacity}
                onChangeText={(capacity) =>
                  setNewRoom((prev) => ({ ...prev, capacity }))
                }
                keyboardType="number-pad"
              />
              <SelectRoomItem id="select-demo-1" />
              <Button onPress={handleAddRoom} size="$3">
                방 추가하기
              </Button>
            </Card>

            {rooms.length > 0 && <Separator />}
            {rooms.map((room) => (
              <Card
                key={room.id}
                padding="$3"
                backgroundColor={theme.backgroundHover}
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
                    size="$2"
                    circular
                    icon={<Ionicons name="trash-outline" size={18} />}
                    onPress={() => handleRemoveRoom(room.id)}
                  />
                </XStack>
              </Card>
            ))}
          </YStack>
        );
      case 4: // 완료
        return (
          <YStack gap="$3" alignItems="center" justifyContent="center" flex={1}>
            <Ionicons
              name="checkmark-circle-outline"
              size={80}
              color={theme.sub2.val}
            />
            <H3 color={theme.color}>설정 준비 완료!</H3>
            <Paragraph textAlign="center" color={theme.color}>
              입력하신 정보로 게스트하우스 운영을 시작할 수 있습니다.
            </Paragraph>
          </YStack>
        );
      default:
        return null;
    }
  };

  return (
    <Background>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100 /* Space for buttons */,
          }}
        >
          <YStack padding="$4" gap="$5" flex={1}>
            {renderStepContent()}
          </YStack>
        </ScrollView>

        {/* Navigation Buttons */}
        <XStack
          padding="$4"
          gap="$3"
          borderTopWidth={1}
          borderTopColor="$borderColor"
          backgroundColor="$background"
          position="absolute"
          bottom={0}
          left={0}
          right={0}
        >
          {currentStep > 1 && (
            <Button onPress={prevStep} flex={1} size="$4">
              이전
            </Button>
          )}
          {currentStep < 4 ? (
            <Button onPress={nextStep} flex={1} size="$4">
              다음
            </Button>
          ) : (
            <Button onPress={handleSubmit} flex={1} size="$4">
              설정 완료 및 시작
            </Button>
          )}
        </XStack>
      </SafeAreaView>
    </Background>
  );
}
