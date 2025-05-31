export type FolderGroup = {
  folder: string;
  parentUrl: string;
  children: { title: string; url: string; isLink: boolean; jsurl: string }[];
};

export function studyPosts() {
  const folderMap: Record<string, FolderGroup> = {};

  Object.entries(
    import.meta.glob('../../content/study/**/*.md', { eager: true }),
  ).forEach(([path, module]: [string, any]) => {
    const rawSlug = path
      .replace('../../content/study/', '')
      .replace(/\.md$/, '');
    const parts = rawSlug.split('/');

    const slug = parts[parts.length - 1];
    const folderName = parts.length > 1 ? parts[parts.length - 2] : '';
    const isFoldered = folderName && slug !== folderName;

    // frontmatter에서 isLink 가져오기
    const isLink = module.frontmatter?.isLink || false;

    if (!folderMap[folderName]) {
      folderMap[folderName] = {
        folder: folderName,
        parentUrl: `/study/${folderName}/${folderName}`,
        children: [],
      };
    }

    if (slug !== folderName) {
      folderMap[folderName].children.push({
        title: slug,
        url: `/study/${folderName}/${slug}`,
        isLink: isLink,
        jsurl: `/study/${folderName}/${slug}/forJS`,
      });
    }
  });

  console.log(Object.values(folderMap));
  return Object.values(folderMap);
}
