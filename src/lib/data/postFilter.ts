import { format } from 'date-fns';

export function postFilter(category: string) {
  const allPosts = Object.entries(
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
  return allPosts;
}

function filterDate(allPosts: { title: string; frontmatter: any }[]) {
  return allPosts
    .map((post) => ({
      ...post,
      date: new Date(post.frontmatter.date),
      formattedDate: format(new Date(post.frontmatter.date), 'yyyy-MM-dd'),
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
