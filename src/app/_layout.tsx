import BookmarkContextProvider from "@/context/bookmark-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <BookmarkContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="(search)" options={{headerShown: false}} />
      </Stack>
    </BookmarkContextProvider>

  );
}
