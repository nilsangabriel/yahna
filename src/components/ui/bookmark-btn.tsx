import { Pressable } from "react-native";
import Lucide from "@react-native-vector-icons/lucide";
import { useBookmarkContext } from "@/context/bookmark-context";
import { StoryType } from "@/constants/types";

export default function BookmarkBtn({ story }: {story: StoryType}) {
  const { bookmarks, toggleBookmark } = useBookmarkContext();

  return (
    <Pressable onPress={() => toggleBookmark({...story}) } className="p-2">
        <Lucide name={(story.id in bookmarks) ? "bookmark-check" : "bookmark-plus"} size={22} />
    </Pressable>
  )
}
