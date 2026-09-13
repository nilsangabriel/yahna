import { StoryType } from "@/constants/types";
import { FlatList, View, Text, TouchableOpacity, Linking, FlatListProps } from "react-native";
import BookmarkBtn from "./bookmark-btn";
import Lucide from "@react-native-vector-icons/lucide";
import { TimeAgo } from "@/utils/time-ago";

type StoryListProps = {
  list: StoryType[];
  config?: Partial<FlatListProps<StoryType>>;
}

export default function StoryList({ list, config }: StoryListProps) {
  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View className="my-2">
          <View className="px-3 py-2">
            <TouchableOpacity
              onPress={() => Linking.openURL(item.url)}
              className="w-full"
            >
              {/* Title */}
              <Text className="font-bold text-lg text-blue-500">
                {item.title}
              </Text>
            </TouchableOpacity>
              <View className="mt-1 flex-row items-center justify-between">
                {/* Author and time */}
                <View className="flex-row items-center">
                  <Text>{item.by}</Text>
                  <Text>
                    <Lucide name="dot" size={30} />
                  </Text>
                  <Text className="text-sm">{TimeAgo(item.time)}</Text>
                </View>
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
      {...config}
    />
  )
}
