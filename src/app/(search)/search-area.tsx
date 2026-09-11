import { Text, View, TextInput, Image, TouchableOpacity, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import AngleLeft from "@react-native-vector-icons/lucide";

export default function SearchArea() {
  const router = useRouter();

  const onPress = () => {
    return router.back();
  }

  return (
    <View>
      <SafeAreaView className="px-4">
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={onPress}
          >
            <AngleLeft name="chevron-left" size={30}/>
          </Pressable>
          <TextInput
            placeholder="Search Hacker News"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
          />
        </View>
      </SafeAreaView>
    </View>
  )
}
