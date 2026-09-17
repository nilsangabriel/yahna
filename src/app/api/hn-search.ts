import { HitResultsType, StoryType } from "@/constants/types";

const base_url = "http://hn.algolia.com/api/v1/"

function hitToStory(hit: HitResultsType): StoryType {
  return {
    id: parseInt(hit.objectID, 10),
    title: hit.title,
    by: hit.author,
    url: hit.url,
    time: hit.created_at_i
  }
}

export async function fetchQuery(text: string): Promise<StoryType[]> {
  const response = await fetch(`${base_url}/search?query=${text}`)

  if (!response.ok)
    throw new Error(`Failed to find ${text}, Error: ${response.status}`);

  const queryItems = await response.json();

  // Take th hits object only
  return queryItems.hits.map(hitToStory);
}
