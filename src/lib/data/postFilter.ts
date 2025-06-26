import { format } from 'date-fns';

export function postFilter(category: string) {
  let allPosts = Object.entries(
    import.meta.glob('../../content/**/*.md', { eager: true }),
  )
    .filter(([path, _module]) => path.includes(`/${category}/`))
    .map(([path, module]: [string, any]) => {
      const slug = path
        .replace(`../../content/${category}/`, '')
        .replace(/\.md$/, '');
      const frontmatter = module.frontmatter;
      return {
        title: slug,
        url: `/${category}/${slug}`,
        frontmatter: frontmatter,
      };
    });

  allPosts = filterDate(allPosts);
  allPosts = postTags(allPosts);
  console.log('is this working', ...allPosts);
  return allPosts;
}

function filterDate(
  allPosts: { title: string; url: string; frontmatter: any }[],
) {
  return allPosts
    .map((post) => ({
      ...post,
      date: new Date(post.frontmatter.date),
      formattedDate: format(new Date(post.frontmatter.date), 'yyyy-MM-dd'),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

function postTags(
  allPosts: { title: string; url: string; frontmatter: any }[],
) {
  return allPosts.map((post) => ({
    ...post,
    tags: Array.isArray(post.frontmatter.tags) ? post.frontmatter.tags : [],
  }));
}
