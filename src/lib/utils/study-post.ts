import { format } from 'date-fns';

export type FolderGroup = {
  folder: string;
  parentUrl: string;
  children: {
    isFoldered: boolean;
    title: string;
    url: string;
    isLink: boolean;
    date: Date;
    jsurl: string;
  }[];
};

export function studyPosts() {
  const folderMap: Record<string, FolderGroup> = {};

  Object.entries(
    import.meta.glob('../../content/study/**/*.md', { eager: true }),
  ).map(([path, module]: [string, any]) => {
    //절대경로에서 잡것 떼기
    const rawSlug = path
      .replace('../../content/study/', '')
      .replace(/\.md$/, '');
    const parts = rawSlug.split('/');

    const slug = parts[parts.length - 1]; //젤 뒷부분
    const folderName = parts.length > 1 ? parts[parts.length - 2] : ''; //젤 뒷부분에서 한칸 앞, 폴더 이름
    const isFoldered = (folderName && slug !== folderName) || false;
    const rawDate = module.frontmatter.date;
    const dateObj = new Date(rawDate);

    //isLink가 없을 때 false
    const isLink = module.frontmatter?.isLink || false;

    if (!folderMap[folderName]) {
      folderMap[folderName] = {
        folder: folderName,
        parentUrl: folderName
          ? `/study/${folderName}/${folderName}`
          : `/study/${slug}`,
        children: [],
      };
    }

    if (slug !== folderName) {
      folderMap[folderName].children.push({
        title: slug,
        url: folderName ? `/study/${folderName}/${slug}` : `/study/${slug}`,
        isLink: isLink,
        isFoldered: isFoldered,
        jsurl: folderName
          ? `/study/${folderName}/${slug}/forJS`
          : `/study/${slug}/forJS`,
        date: dateObj,
      });
    }
  });

  Object.values(folderMap).forEach((group) => {
    group.children.sort((a, b) => b.date.getTime() - a.date.getTime());
  });

  console.log(
    Object.values(folderMap).flatMap((group) =>
      group.children.map((child) => ({
        title: child.title,
        isFoldered: child.isFoldered,
      })),
    ),
  );

  return Object.values(folderMap).map((group) => ({
    ...group,
    children: group.children.map((child) => ({
      ...child,
      date: format(child.date, 'yyyy-MM-dd'), // ← 이 시점에서 string으로 변환
    })),
  }));
}
