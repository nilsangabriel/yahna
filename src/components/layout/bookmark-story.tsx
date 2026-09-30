import { useBookmarkContext } from "@/context/bookmark-context";
import { View, Text } from "react-native";
import StoryList from "../ui/storylist";

export default function BookmarkStory() {
  const { bookmarks } = useBookmarkContext();
  const stories = Object.values(bookmarks);

  if (stories.length === 0)
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="mt-2 text-sm text-white">No Bookmarks yet. Add one!</Text>
      </View>
  )

  return <StoryList list={stories} />
}
