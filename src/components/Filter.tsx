import { notePosts } from "../lib/utils/note-post";
import { useState } from "react";

let filterTag = [];

export default function Filter() {
  const { posts, tagsSet } = notePosts();
  const [selectedTag, setSelectedTag] = useState<string[]>(tagsSet); // 초기에는 전체 보이게
  const [firstSelected, setFirstSelected] = useState(true);

  function clearTags() {
    setFirstSelected(true);
    setSelectedTag(tagsSet); // 전체 보기
  }

  function postFilter() {
    const filteredPosts = posts.filter((post) =>
      selectedTag.some((tag) => post.tags.includes(tag))
    );
    console.log("selected tag", [...selectedTag]);
    return filteredPosts;
  }

  const tagClicked = (tag: string) => {
    setSelectedTag((prev) => {
      if (firstSelected) {
        setFirstSelected(false);
        return [tag]; // 처음 클릭이면 이 tag만
      }

      // 이미 선택돼있으면 제거, 없으면 추가
      return prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
    });
  };

  return (
    <div className="flex flex-col divide-y filter">
      <div className="flex flex-wrap">
        {tagsSet.map((tag) => (
          <button
            key={tag}
            className="flex flex-row pr-4 pl-4 pd-2 border rounded-[30px] border-black hover:bg-gray-200"
            onClick={() => tagClicked(tag)}
          >
            {tag}
          </button>
        ))}
        <a
          className=" pr-4 pl-4 pd-2 border rounded-[30px] border-black hover:bg-gray-200"
          onClick={clearTags}
        >
          X
        </a>
      </div>
      <div className="mb-4" />
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
