import { useEffect, useState } from 'react';
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import '../../global.css'
const fetchSensorData = async () => {
  return {
    device: {
      id: 'C1_PG',
      location: 'Bataan',
      battery: '18%',
      feedAmount: '50 kg',
      cycles: 4,
    },
    sensors: [
      { label: 'pH Level', value: '8.1', unit: '', icon: 'water-outline', status: 'green' },
      { label: 'DO', value: '5.33', unit: '', icon: 'cloud-outline', status: 'green' },
      { label: 'Temperature', value: '23', unit: '°C', icon: 'thermometer-outline', status: 'green' },
      { label: 'Hydrogen Sulfide', value: '7', unit: '', icon: 'flask-outline', status: 'red' },
      { label: 'Salinity', value: '35', unit: '', icon: 'water-outline', status: 'green' },
      { label: 'Turbidity', value: '37', unit: '', icon: 'water-outline', status: 'green' },
    ],
  };
};

export default function HomeScreen() {
  const [deviceData, setDeviceData] = useState(null);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSensorData();
      setDeviceData(data.device);
      setSensorData(data.sensors);
    };
    loadData();
  }, []);

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
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              className="w-10 h-10 rounded-full"
            />
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
                width: '48%',  // ✅ Fixes grid wrapping issue
                aspectRatio: 1.3, // ✅ Ensures consistent height across all devices
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
