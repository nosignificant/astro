import { PostProps, UserDataProps } from '../types';
import Fuse from 'fuse.js'
import { tags } from '../data/tags';

export function queryFilter(
  data: PostProps[],
  tag: string[],
  search: string | null,
) {

  // 태그 필터링
  let tagFiltered;

  if (tag.length === 0) {
    tagFiltered = data;
  } else {
    tagFiltered = data.filter((entry) => {
      return tag && Array.isArray(entry.tags) && entry.tags.some(t => tag.includes(t.name));
    })
  }

  // console.log("tagFiltered", tagFiltered)

  // 검색 필터링
  const options = {
    includeScore: true,
    threshold: 0.5,
    keys: ["name", "dynamic.text_block"] // Define searchable fields
  }

  const fuse = new Fuse(tagFiltered, options)

  let searchFiltered;

  if (search === null) {
    searchFiltered = tagFiltered;
  } else {
    searchFiltered = fuse.search(search).map(result => result.item);
  }

  // console.log("searchFiltered", searchFiltered)

  return searchFiltered;
}

export function bookmarkFilter(data: PostProps[], bookmark: string | null, user: UserDataProps) {
  let bookmarkFiltered;

  const tagNames = tags.map(tag => tag.tag)

  if (user) {
    const allPostIds = tagNames.flatMap(
      (tag) => ((user as unknown as Record<string, PostProps[]>)[tag] || [])
        .map((post) => post.documentId)
    );

    if (bookmark === 'true') {
      bookmarkFiltered = data.filter((entry) => {
        return bookmark && allPostIds.includes(entry.documentId);
      })
    } else {
      bookmarkFiltered = data;
    }
  } else {
    bookmarkFiltered = data;
  }

  return bookmarkFiltered;
}

export function yearFilter(data: PostProps[], year: string | null) {
  // console.log(data[0].publishedAt?.slice(0,4), year, data[0].publishedAt?.slice(0,4) === year)

  const thisyearFiltered = data.filter((entry) => {
    return entry.publishedAt?.slice(0,4) === year;
  })

  return thisyearFiltered;
}