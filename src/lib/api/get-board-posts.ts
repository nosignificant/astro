import { getCmsData } from "./get-cms-data";
import { PostProps } from "../types";

export async function getBoardPosts() {
  const endpoints = ['notices', 'events', 'exhibitions', 'kookmins'];

  const endpointUrls: Record<string, string> = {
    notices: 'notices?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true',
    events: 'events?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true',
    exhibitions: 'exhibitions?populate[website]=true&populate[dynamic][on][dynamic.image-block][populate]=*&populate[dynamic][on][dynamic.text-block][populate]=*&populate[users]=true&populate[tags]=true',
    kookmins: 'kookmins?populate[users]=true&populate[tags]=true&pagination[pageSize]=300'
  };

  const queries = endpoints.map((endpoint) =>
    getCmsData(endpointUrls[endpoint]).catch((error) => {
      console.error(`Error fetching ${endpoint}:`, error);
      return [];
    })
  );

  const results = await Promise.all(queries);
  const posts = results.flat() as PostProps[];

  const sortedPosts = posts
    .sort((a: PostProps, b: PostProps) => {
      return (
        new Date(a.publishedAt ?? "9999-12-31T23:59:59Z").getTime() - new Date(b.publishedAt ?? "9999-12-31T23:59:59Z").getTime() ||
        new Date(a.startDate)?.getTime() - new Date(b.startDate)?.getTime() ||
        new Date(a.endDate)?.getTime() - new Date(b.endDate)?.getTime()
      )
    })

  const calendarPosts = posts
  .filter(post => post.startDate !== null)
  .map(post => ({
    ...post,
    endDate: post.endDate ?? post.startDate,
  }))


  return {
    sortedPosts,
    calendarPosts,
  };
}