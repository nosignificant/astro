import { notePosts } from '../../lib/utils/note-post';
import { useState, useEffect } from 'react';
import FilterPost from './FilterPost';

export default function Filter() {
  const { posts, tagsSet } = notePosts();
  const [selectedTag, setSelectedTag] = useState<string[]>(tagsSet); // 초기에는 전체 보이게
  const [firstSelected, setFirstSelected] = useState(true);

  useEffect(() => {
    if (!firstSelected && selectedTag.length === 0) {
      setSelectedTag(tagsSet);
      setFirstSelected(true);
    }
  }, [firstSelected, selectedTag]);

  function clearTags() {
    setFirstSelected(true);
    setSelectedTag(tagsSet); // 전체 보기
  }

  function postFilter() {
    const filteredPosts = posts.filter((post) =>
      selectedTag.some((tag) => post.tags.includes(tag)),
    );
    //console.log("selected tag", [...selectedTag]);
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
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-1 ">
        {tagsSet.map((tag) => {
          const isSelected = selectedTag.includes(tag) && !firstSelected;
          return (
            <button
              key={tag}
              className={`flex flex-row pr-4 pl-4 rounded-[30px] border Orbit
        ${isSelected ? 'border-black bg-black text-white' : 'border-black hover:bg-black hover:text-white'}`}
              onClick={() => tagClicked(tag)}
            >
              {tag}
            </button>
          );
        })}
        <a
          className=" text-[0.7rem] text-gray-700 pr-2 pl-2 pt-1"
          onClick={clearTags}
        >
          필터 초기화
        </a>
      </div>
      <div className="mb-4" />
      <FilterPost postFilter={postFilter} />
    </div>
  );
}
