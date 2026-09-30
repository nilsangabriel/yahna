import { Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import SearchIcon from "@react-native-vector-icons/lucide";

export default function Search() {
  const router = useRouter();

  const onPress = () => {
    return router.push("/(search)/search-area");
  }

  return (
    <Pressable
      onPress={onPress}
    >
      <SearchIcon name="search" size={20} color="white"/>
    </Pressable>
  )
}
