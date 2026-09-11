import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { StoryType } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BookmarkProviderProps = {
  children: ReactNode;
}

type BookmarkContextType = {
  bookmarks: Record<number, StoryType>,
  toggleBookmark: (story: StoryType) => void
}

const BookmarkContext = createContext<BookmarkContextType | null>(null);

export default function BookmarkContextProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Record<number, StoryType>>({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const toggleBookmark = (story: StoryType) => {
    setBookmarks(prev => {
      // If existing, remove the id
      if (story.id in prev) {
        const updated = { ...prev };
        delete updated[story.id];
        return updated;
      }

      // Add id if not in dict
      return {
        ...prev,
        [story.id]: story,
      };
    });
  };

  // Load bookmark state from storage
  useEffect(() => {
    async function loadBookmarks() {
      const stored = await AsyncStorage.getItem("bookmarks");

      if (stored !== null)
        setBookmarks(JSON.parse(stored));

      setHasLoaded(true);
    }
    loadBookmarks();
  }, []);

  // Save bookmark state to storage
  // Then if loading has finished, save a state
  useEffect(() => {
    if (!hasLoaded)
      return;

    async function saveBookmark() {
      await AsyncStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    saveBookmark();
  }, [bookmarks, hasLoaded]);


  return (
    <BookmarkContext.Provider value={{bookmarks, toggleBookmark}}>
       {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarkContext() {
  const context = useContext(BookmarkContext);

  if (context === null) {
    throw new Error(
      "useBookmarkContext must be used within an BookmarkContextProvider"
    );
  }

  return context;
}
