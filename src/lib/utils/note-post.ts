import { format } from 'date-fns';

export function notePosts() {
  const posts = Object.entries(
    import.meta.glob('../../content/note/**/*.md', { eager: true }),
  )
    .map(([path, module]: [string, any]) => {
      const slug = path.replace('../../content/note/', '').replace(/\.md$/, '');
      const rawDate = module.frontmatter.date;
      const dateObj = new Date(rawDate);

      return {
        title: slug,
        url: `/note/${slug}`,
        date: dateObj,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((post) => ({
      ...post,
      date: format(post.date, 'yyyy-MM-dd'),
    }));

  return posts;
}
