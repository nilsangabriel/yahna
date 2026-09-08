import { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Linking } from "react-native";
import { getStories, fetchTopStories } from "@/app/api/hn-api";

type StoryType = {
  id: number;
  title: string;
  by: string;
  url: string;
}

const page_size = 20;

export default function NewsStory() {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allIds, setAllIds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const ids = await fetchTopStories();
        const page = await getStories(ids, 0, page_size);

        if (!isMounted)
          return;

        setAllIds(ids);
        setStories(page);
        setCursor(page_size);

      } catch (err: any) {
          if (isMounted)
            setError(err.message);
      } finally {
          if (isMounted)
            setLoading(false);
      }
    }

    load();

    return () => { isMounted = false; };
  }, [])

  const loadMore = useCallback(async () => {
    if (loadingMore || cursor >= allIds.length)
      return;

    setLoadingMore(true);

    try {
      const nextPage = await getStories(allIds, cursor, page_size);
      setStories((prev) => [...prev, ...nextPage]);
      setCursor((prev) => prev + page_size);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  }, [allIds, cursor, loadingMore]);

  if (loading)
    return <ActivityIndicator className="flex-1 items-center justify-center" size="large" />;

  if (error && stories.length == 0)
    return <Text className="flex-1 items-center justify-center">Error: {error}</Text>;

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => (
        <View className="my-2">
          <View className="px-3 py-2 gap-2">
            <Text
              className="font-bold text-blue-500"
              onPress={() => Linking.openURL(item.url)}
            >
              {item.title}
            </Text>
            <Text>{item.by}</Text>
          </View>
          <View className="w-full bg-black h-[0.45px]"/>
        </View>
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator className="m-16" /> : null}
    />
  )
}
