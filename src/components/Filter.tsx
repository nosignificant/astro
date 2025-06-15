import { notePosts } from '../lib/utils/note-post';
import { useState } from 'react';

export default function Filter() {
  const { posts, tagsSet } = notePosts();
  const [selectedTag, setSelectedTag] = useState(tagsSet);

  function clearTags() {
    setSelectedTag(tagsSet);
  }

  function postFilter() {
    const filteredPosts = posts.filter((post) =>
      selectedTag.some((tag) => post.tags.includes(tag)),
    );
    console.log([...selectedTag]);
    console.log([...filteredPosts]);
    return filteredPosts;
  }

  const tagClicked = (tag: string) => {
    setSelectedTag(
      (prev) =>
        prev.includes(tag)
          ? prev.filter((t) => t !== tag) // 이미 있으면 제거
          : [...prev, tag], // 없으면 추가
    );
  };

  return (
    <div className="flex flex-col divide-y filter">
      <div className="flex flex-wrap">
        {tagsSet.map((tag) => (
          <button
            key={tag}
            className="flex flex-row pr-4 pb-2"
            onClick={() => tagClicked(tag)}
          >
            {tag}
          </button>
        ))}
        <a onClick={clearTags}>X</a>
      </div>

      {postFilter().map(({ url, title, date, tags }) => (
        <div key={url} className="entry-row">
          <a href={url} className="flex-1 truncate">
            {title}
            {tags.map((tag) => (
              <div key={tag} className="text-gray-500 text-sm">
                {tag}
              </div>
            ))}
          </a>
          <div className="text-gray-500 hidden sm:block pr-4">{date}</div>
        </div>
      ))}
    </div>
  );
}
