import { useEffect, useState } from 'react';
import { Image, Text, View, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import '../../global.css'

const API_URL = 'http://192.168.0.112:8080/get-water-parameters';

/**
 * Fetch the latest sensor data from the API.
 * Returns the most recent (first) entry.
 */
const fetchSensorData = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('No data received');
    }

    const latestData = data[0]; // ✅ Get the first (latest) entry

    return {
      device: {
        id: latestData.id.toString(),
        location: 'Bataan', // If API includes location, update here
        battery: '18%', // If API includes battery, update here
        feedAmount: '50 kg', // Update based on API data
        cycles: 4, // Adjust based on API data
      },
      sensors: [
        { label: 'pH Level', value: latestData.ph_level, unit: '', icon: 'water-outline', status: latestData.ph_level < 7 ? 'red' : 'green' },
        { label: 'Temperature', value: latestData.temperature, unit: '°C', icon: 'thermometer-outline', status: latestData.temperature < 0 ? 'red' : 'green' },
        { label: 'Hydrogen Sulfide', value: latestData.hydrogen_sulfide_level, unit: '', icon: 'flask-outline', status: latestData.hydrogen_sulfide_level > 5 ? 'red' : 'green' },
        { label: 'Turbidity', value: latestData.turbidity, unit: '', icon: 'water-outline', status: latestData.turbidity > 100 ? 'red' : 'green' },
      ],
    };
  } catch (error) {
    console.error('Error fetching sensor data:', error);
    return null;
  }
};

export default function HomeScreen() {
  const [deviceData, setDeviceData] = useState<any>(null);
  const [sensorData, setSensorData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSensorData();
      if (data) {
        setDeviceData(data.device);
        setSensorData(data.sensors);
      }
      setLoading(false);
    };

    loadData();
    const interval = setInterval(loadData, 5000); // ✅ Auto-refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold">Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 py-5 mt-8">
        {/* Top Navbar */}
        <View className="flex-row items-center justify-between">
          <Ionicons name="menu" size={24} color="black" />
          <View className="flex-row items-center gap-2">
            <View className="bg-green-500 px-3 py-1 rounded-full">
              <Text className="text-white text-sm">● Connected</Text>
            </View>
            <Image source={{ uri: 'https://i.pravatar.cc/100' }} className="w-10 h-10 rounded-full" />
          </View>
        </View>

        {/* Device Info */}
        {deviceData && (
          <LinearGradient
            colors={['#065CC7', '#032D61']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ padding: 33, borderRadius: 20, marginTop: 24 }}
          >
            <Text className="text-white text-[23px] font-wix-semibold">AMAN Device</Text>
            <Text className="text-white text-[12px] font-wix">Select Device ▼</Text>

            <View className="flex-row justify-between mt-[15px]">
              <View>
                <Text className="text-white font-wix-medium text-[23px]">{deviceData.id}</Text>
                <Text className="text-white font-wix-semibold">Enclosure ID</Text>
              </View>
              <View>
                <Text className="text-white font-wix-medium text-[23px]">{deviceData.location}</Text>
                <Text className="text-white font-wix-semibold">Location</Text>
              </View>
              <View>
                <Text className="text-white font-wix-medium text-[23px]">{deviceData.battery}</Text>
                <Text className="text-white font-wix-semibold">Battery</Text>
              </View>
            </View>
          </LinearGradient>
        )}

        {/* Feed & Cycles */}
        {deviceData && (
          <View className="flex-row justify-between mt-4">
            <LinearGradient
              colors={['#065CC7', '#032D61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1, padding: 16, borderRadius: 20, marginRight: 8, alignItems: 'center' }}
            >
              <Text className="text-white text-[30px] font-wix-semibold">{deviceData.feedAmount}</Text>
              <Text className="text-white text-[15px] font-wix">Feed Amount</Text>
            </LinearGradient>

            <LinearGradient
              colors={['#065CC7', '#032D61']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ flex: 1, padding: 16, borderRadius: 20, marginLeft: 8, alignItems: 'center' }}
            >
              <Text className="text-white text-[30px] font-wix-semibold">{deviceData.cycles}</Text>
              <Text className="text-white text-[15px] font-wix">Cycles</Text>
            </LinearGradient>
          </View>
        )}

        {/* Sensor Status */}
        <Text className="text-lg font-semibold mt-6">Sensor Status</Text>
        <View className="flex-row flex-wrap justify-between mt-2">
          {sensorData.map((sensor, index) => (
            <View
              key={index}
              className="bg-gray-100 p-4 rounded-lg mt-5"
              style={{
                width: '48%', 
                aspectRatio: 1.3, 
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Sensor Icon */}
              <Ionicons name={sensor.icon} size={24} color="black" />

              {/* Sensor Value & Label (Centered) */}
              <View className="items-center mt-2">
                <Text className="text-lg font-bold text-gray-900">{sensor.value}{sensor.unit}</Text>
                <Text className="text-xs text-gray-500">{sensor.label}</Text>
              </View>

              {/* Status Indicator */}
              <View className={`w-3 h-3 rounded-full absolute top-2 right-2 ${sensor.status === 'red' ? 'bg-red-500' : 'bg-green-500'}`} />
            </View>
          ))}
        </View>

        {/* Spacer for safe scrolling */}
        <View className="pb-20" />
      </ScrollView>
    </SafeAreaView>
  );
}
