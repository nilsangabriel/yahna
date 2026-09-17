import { useCallback, useEffect, useState } from "react";
import { Text, ActivityIndicator } from "react-native";
import { getStories, fetchTopStories } from "@/app/api/hn-topstories";
import { StoryType } from "@/constants/types";
import StoryList from "../ui/storylist";

const page_size = 20;

export default function NewsStory() {
  const [stories, setStories] = useState<StoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [allIds, setAllIds] = useState([]);
  const [cursor, setCursor] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Load stories from api
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

  // Load more if cursor is almost at page limit
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

  return <StoryList list={stories} config={{
    onEndReached: loadMore,
    onEndReachedThreshold: 0.5,
    ListFooterComponent: loadingMore ? <ActivityIndicator className="m-16" /> : null
  }}/>

}
