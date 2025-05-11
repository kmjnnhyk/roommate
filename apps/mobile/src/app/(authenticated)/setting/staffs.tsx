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
} from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

interface Staff {
  id: string;
  name: string;
  phone: string;
}

export default function StaffsScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [staffName, setStaffName] = useState('');
  const [staffPhone, setStaffPhone] = useState('');
  const [staffs, setStaffs] = useState<Staff[]>([]); // 스태프 목록 상태

  const handleAddStaff = () => {
    if (!staffName.trim() || !staffPhone.trim()) {
      alert('이름과 핸드폰 번호를 모두 입력해주세요.');
      return;
    }
    // 간단한 유효성 검사 (예: 핸드폰 번호 형식) - 필요시 추가
    const newStaff: Staff = {
      id: Date.now().toString(), // 임시 ID 생성
      name: staffName.trim(),
      phone: staffPhone.trim(),
    };
    setStaffs((prevStaffs) => [...prevStaffs, newStaff]);
    setStaffName('');
    setStaffPhone('');
    alert('성공');
  };

  const handleDeleteStaff = (staffId: string) => {
    setStaffs((prevStaffs) =>
      prevStaffs.filter((staff) => staff.id !== staffId),
    );
    alert('삭제됨');
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
            스태프 관리
          </H4>
        </XStack>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" gap="$5">
            {/* Add Staff Form */}
            <Card
              backgroundColor="$backgroundHover"
              padding="$4"
              borderRadius="$4"
              gap="$3"
            >
              <H4 color="$color">새 스태프 추가</H4>
              <Input
                placeholder="스태프 이름"
                value={staffName}
                onChangeText={setStaffName}
                size="$4"
                borderColor="$borderColor"
              />
              <Input
                placeholder="핸드폰 번호 (예: 010-1234-5678)"
                value={staffPhone}
                onChangeText={setStaffPhone}
                keyboardType="phone-pad"
                size="$4"
                borderColor="$borderColor"
              />
              <Button
                size="$4"
                onPress={handleAddStaff}
                iconAfter={
                  <Ionicons
                    name="add-circle-outline"
                    size={20}
                    color={theme.color.val}
                  />
                }
              >
                추가하기
              </Button>
            </Card>

            <Separator />

            {/* Staff List */}
            <YStack gap="$3">
              <H4 color="$color">등록된 스태프 목록</H4>
              {staffs.length === 0 ? (
                <Text
                  color="$colorPress"
                  textAlign="center"
                  paddingVertical="$4"
                >
                  등록된 스태프가 없습니다.
                </Text>
              ) : (
                staffs.map((staff) => (
                  <Card
                    key={staff.id}
                    backgroundColor="$background"
                    padding="$3"
                    borderRadius="$4"
                    borderWidth={1}
                    borderColor="$borderColor"
                  >
                    <XStack justifyContent="space-between" alignItems="center">
                      <YStack>
                        <Text fontSize="$5" fontWeight="bold" color="$color">
                          {staff.name}
                        </Text>
                        <Text fontSize="$3" color="$colorPress">
                          {staff.phone}
                        </Text>
                      </YStack>
                      <Button
                        size="$3"
                        circular
                        onPress={() => handleDeleteStaff(staff.id)}
                        icon={
                          <Ionicons
                            name="trash-outline"
                            size={20}
                            color={theme.sub3.val}
                          />
                        }
                      />
                    </XStack>
                  </Card>
                ))
              )}
            </YStack>
          </YStack>
        </ScrollView>
      </SafeAreaView>
    </Background>
  );
}
