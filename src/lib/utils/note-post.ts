import { format } from 'date-fns';

export type NotePost = {
  title: string;
  url: string;
  date: string;
  tags: string[];
};

export function notePosts(): { posts: NotePost[]; tagsSet: string[] } {
  const tagsSet = new Set<string>();
  const posts = Object.entries(
    import.meta.glob('../../content/note/**/*.md', { eager: true }),
  )
    .map(([path, module]: [string, any]) => {
      const slug = path.replace('../../content/note/', '').replace(/\.md$/, '');
      const rawDate = module.frontmatter.date;
      const dateObj = new Date(rawDate);
      const tags: string[] = Array.isArray(module.frontmatter.tags)
        ? module.frontmatter.tags
        : [];
      tags.forEach((tag) => tagsSet.add(tag));
      return {
        title: slug,
        url: `/note/${slug}`,
        date: dateObj,
        tags: tags,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .map((post) => ({
      ...post,
      date: format(post.date, 'yyyy-MM-dd'),
    }));

  return {
    posts,
    tagsSet: Array.from(tagsSet),
  };
}
