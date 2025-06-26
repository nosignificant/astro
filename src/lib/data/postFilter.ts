import { format } from 'date-fns';

export function postFilter(category: string) {
  const tagsSet = new Set<string>();

  let allPosts = Object.entries(
    import.meta.glob('../../content/**/*.md', { eager: true }),
  )
    .filter(([path, _module]) => path.includes(`/${category}/`))
    .map(([path, module]: [string, any]) => {
      const slug = path
        .replace(`../../content/${category}/`, '')
        .replace(/\.md$/, '');
      const rawDate = module.frontmatter.date;
      const dateObj = new Date(rawDate);
      const tags: string[] = Array.isArray(module.frontmatter.tags)
        ? module.frontmatter.tags
        : [];
      tags.forEach((tag) => tagsSet.add(tag));
      return {
        title: slug,
        url: `/${category}/${slug}`,
        date: dateObj,
        tags: tags,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((post) => ({
      ...post,
      date: format(post.date, 'yyyy-MM-dd'),
    }));

  const sortedTags = Array.from(tagsSet).sort();

  return {
    allPosts,
    tagsSet: sortedTags,
  };
}

function filterDate(
  allPosts: { title: string; url: string; frontmatter: any; tags: string[] }[],
) {
  return allPosts
    .map((post) => ({
      ...post,
      date: new Date(post.frontmatter.date),
      formattedDate: format(new Date(post.frontmatter.date), 'yyyy-MM-dd'),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
