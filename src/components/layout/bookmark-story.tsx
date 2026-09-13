import { useBookmarkContext } from "@/context/bookmark-context";
import { FlatList, View, TouchableOpacity, Linking, Text } from "react-native";
import { TimeAgo } from "@/utils/time-ago";
import Lucide from "@react-native-vector-icons/lucide";
import BookmarkBtn from "../ui/bookmark-btn";

export default function BookmarkStory() {
  const { bookmarks } = useBookmarkContext();
  const stories = Object.values(bookmarks);

  if (stories.length === 0)
    return <FlatList
      data={stories}
      ListEmptyComponent={
        <Text className="flex-1 items-center justify-center">No Bookmarks yet. Add one!</Text>
      }
      renderItem={null}
    >
      No Bookmarked stories
    </FlatList>;

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="my-2">
          <View className="px-3 py-2">
            <View className="flex-row items-center justify-between">
              <TouchableOpacity
                onPress={() => Linking.openURL(item.url)}
              >
                {/* Title */}
                <Text className="font-bold text-lg text-blue-500">
                  {item.title}
                </Text>
                <View className="mt-1 flex-row items-center">
                  {/* Author and time */}
                  <View className="flex-row items-center">
                    <Text>{item.by}</Text>
                    <Text>
                      <Lucide name="dot" size={30} />
                    </Text>
                    <Text className="text-sm">{TimeAgo(item.time)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Bookmark */}
              <View className="justify-end">
                <BookmarkBtn story={item} />
              </View>
            </View>
          </View>
          {/* Line separator */}
          <View className="w-full bg-black h-[0.45px]"/>
        </View>
      )}
    >

    </FlatList>
  )
}
