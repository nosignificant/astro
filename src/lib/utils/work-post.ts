export default function workPosts() {
  const posts = Object.entries(
    import.meta.glob('../../content/work/**/*.md', { eager: true }),
  )
    .map(([path, module]: [string, any]) => {
      const slug = path.replace('../../content/work/', '').replace(/\.md$/, '');

      const rawDate = module.frontmatter.date;
      const dateObj = new Date(rawDate);
      const tags: string[] = Array.isArray(module.frontmatter.tags)
        ? module.frontmatter.tags
        : [];
      return { title: slug, url: `/work/${slug}`, date: dateObj, tags: tags };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map((post) => ({
      ...post,
      date: format(post.date, 'yyyy-MM-dd'),
    }));
  return posts;
}
