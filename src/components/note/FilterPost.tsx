export default function FilterPost({ postFilter }) {
  return (
    <div className="divide-y">
      {postFilter().map(({ url, title, date, tags }) => (
        <div key={url} className="entry-row hover:bg-white">
          <a href={url} className="flex-1 truncate ">
            {title}
            <div className="flex flex-row">
              {tags.map((tag) => (
                <div key={tag} className="text-gray-500 text-sm pr-2 Orbit">
                  {tag}
                </div>
              ))}
            </div>
          </a>
          <div className="text-gray-500 hidden sm:block pr-4 Orbit">{date}</div>
        </div>
      ))}
    </div>
  );
}
