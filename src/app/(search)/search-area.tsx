import { View, TextInput, Pressable, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { fetchQuery } from "../api/hn-search";
import { StoryType } from "@/constants/types";

import AngleLeft from "@react-native-vector-icons/lucide";
import StoryList from "@/components/ui/storylist";

export default function SearchArea() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StoryType[]>([]);

  useEffect(() => {
    // If query is empty, clear results and do nothing
    if (query === "") {
      return;
    }

    // Call getQuery(query) here, and store results in some state
    const timeOutId = setTimeout(async () => {
      const res = await fetchQuery(query);
      setResults(res);

    }, 500);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [query])

  return (
    <View>
      {/* Search header */}
      <SafeAreaView className="px-4">
        <View className="flex-row items-center gap-2">
          <Pressable
            onPress={() => router.back()}
          >
            <AngleLeft name="chevron-left" size={30}/>
          </Pressable>
          <TextInput
            placeholder="Search Hacker News"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3"
            value={query}
            onChangeText={setQuery}
          />
        </View>
      </SafeAreaView>
      {/* Search results */}
      <View className="flex">
        <StoryList list={results} />
      </View>
    </View>
  )
}
