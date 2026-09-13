import { useBookmarkContext } from "@/context/bookmark-context";
import { FlatList, Text } from "react-native";
import StoryList from "../ui/storylist";

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

  return <StoryList list={stories} />
}
