import { notePosts } from "../lib/utils/note-post";
import { useState } from "react";

let firstSelected = true;
let filterTag = [];

export default function Filter() {
  const { posts, tagsSet } = notePosts();
  const [selectedTag, setSelectedTag] = useState(tagsSet);

  function clearTags() {
    firstSelected = true;
    setSelectedTag(tagsSet);
  }

  function postFilter() {
    const filteredPosts = posts.filter((post) =>
      selectedTag.some((tag) => post.tags.includes(tag))
    );
    console.log("selected tag", [...selectedTag]);
    console.log("filtered post", [...filteredPosts]);
    return filteredPosts;
  }

  const tagClicked = (tag: string) => {
    if (firstSelected) {
      setSelectedTag([]);
      firstSelected = false;
      console.log(firstSelected);
    }
    filterTag.push(tag);
    setSelectedTag(filterTag);
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
