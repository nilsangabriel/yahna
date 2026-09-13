import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import SearchIcon from "@react-native-vector-icons/lucide";

export default function Search() {
  const router = useRouter();

  const onPress = () => {
    return router.push("/(search)/search-area");
  }

  return (
    <View className="px-4">
      <Pressable
        onPress={onPress}
      >
        <SearchIcon name="search" size={20}/>
      </Pressable>
    </View>
  )
}
