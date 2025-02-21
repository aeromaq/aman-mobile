import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function FirstScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      {/* Logo */}
      <Image source={require('../assets/images/logo.png')} className="w-40 h-40 mb-6" />

      {/* Title */}
      <Text className="text-2xl font-bold text-center text-blue-900">
        Aquaculture Monitoring and Analysis Network
      </Text>

      {/* Subtitle */}
      <Text className="text-md text-gray-500 text-center mt-2">
        Empowering Aquaculture with Smart Technology.
      </Text>

      {/* Buttons */}
      <View className="w-full mt-6">
        <TouchableOpacity
          onPress={() => router.push('/login')}
          className="bg-blue-600 p-4 rounded-full w-full items-center"
        >
          <Text className="text-white text-lg font-bold">LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/signup')}
          className="border border-blue-600 p-4 rounded-full w-full items-center mt-4"
        >
          <Text className="text-blue-600 text-lg font-bold">CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
