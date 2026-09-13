import BookmarkStory from "@/components/layout/bookmark-story";
import {View, Text} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Bookmarks() {
  return (
    <View className="flex-1 h-screen w-screen overflow-y-scroll">
      {/* Header */}
      <SafeAreaView>
        <View className="flex-row items-center justify-center px-4 mt-2">
          <Text className="text-2xl font-semibold text-gray-800">Your Bookmarks</Text>
        </View>
      </SafeAreaView>
      {/* Bookmark area */}
      <View className="flex">
        <BookmarkStory/>
      </View>
    </View>
  )
}
