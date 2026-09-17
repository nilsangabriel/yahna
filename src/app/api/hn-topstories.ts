const base_url = "https://hacker-news.firebaseio.com/v0/";

// Fetch the top stories on the Hacker news
//
// This function uses get requests on the top stories,
// returning the story ids.
export async function fetchTopStories() {
  const response = await fetch(`${base_url}/topstories.json`);

  if (!response.ok)
    throw new Error(`Failed to fetch top stories, Error: ${response.status}`);

  return response.json();
}

// Gets each item details per id
//
// This function uses get requests on the story id,
// returning information about the id.
export async function getItem(storyId: number) {
  const response = await fetch(`${base_url}/item/${storyId}.json`);

  if (!response.ok)
    throw new Error(`Failed to fetch story ${storyId}, Error: ${response.status}`);

  return response.json();
}

// Paginate the top 100 stories
export async function getStories(ids: number[], startingIndex: number, limit: number = 20) {
  const pageIds = ids.slice(startingIndex, startingIndex + limit);

  // Using Promise to request in parallel, making it faster to fetch stories.
  const stories = await Promise.all(pageIds.map(getItem));

  return stories.filter(Boolean);
}
