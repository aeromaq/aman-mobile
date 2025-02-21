  import { View, Text, TextInput, TouchableOpacity } from 'react-native';
  import { useRouter, Link} from 'expo-router';

  export default function LoginScreen() {
    const router = useRouter();

    return (
      <View className="flex-1 items-center justify-center bg-white px-6">
        {/* Title */}
        <Text className="text-2xl font-bold text-blue-900 mb-6">Login</Text>

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

        {/* Login Button */}
        <TouchableOpacity onPress={() => router.push('/(tabs)')} className="bg-blue-600 p-4 rounded-full w-full items-center" >
          <Text className="text-white text-lg font-bold">LOGIN</Text>
        </TouchableOpacity>

        {/* Forgot Password & Signup */}
        <View className="flex-row justify-between w-full mt-4">
          <TouchableOpacity>
            <Text className="text-blue-600">Forgot your password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text className="text-blue-600">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
