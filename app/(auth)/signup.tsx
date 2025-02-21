import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-blue-900 mb-6">Sign Up</Text>

      {/* Name Input */}
      <TextInput
        placeholder="Name"
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
      />

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        className="w-full border border-gray-300 rounded-lg p-4 mb-4"
        secureTextEntry
      />

      {/* Signup Button */}
      <TouchableOpacity className="bg-blue-600 p-4 rounded-full w-full items-center">
        <Text className="text-white text-lg font-bold">SIGN UP</Text>
      </TouchableOpacity>

      {/* Login Redirect */}
      <View className="mt-4">
        <Text>
          Already have an account?{' '}
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className="text-blue-600">Log In</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  );
}
