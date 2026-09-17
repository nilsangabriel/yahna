export type StoryType = {
  id: number;
  title: string;
  by: string;
  url: string;
  time: number;
}

export type HitResultsType = {
  objectID: string;
  title: string;
  author: string;
  url: string;
  created_at_i: number; // Note: returns int, will use TimeAgo here
}
