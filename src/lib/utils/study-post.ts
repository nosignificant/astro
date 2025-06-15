import { format } from 'date-fns';

export type StudyGroup = {
  folder: string;
  parentUrl: string;
  folderStartDate: string;
  children: {
    title: string;
    url: string;
    isFoldered: boolean;
    isLink: boolean;
    jsurl: string;
    date: string;
  }[];
};

export function studyPosts(): StudyGroup[] {
  const folderMap: Record<
    string,
    {
      folder: string;
      parentUrl: string;
      children: {
        title: string;
        url: string;
        isFoldered: boolean;
        isLink: boolean;
        jsurl: string;
        date: Date;
      }[];
    }
  > = {};

  const orphanPosts: {
    title: string;
    url: string;
    isFoldered: boolean;
    isLink: boolean;
    jsurl: string;
    date: Date;
  }[] = [];

  // slug split
  Object.entries(
    import.meta.glob('../../content/study/**/*.md', { eager: true }),
  ).forEach(([path, module]: [string, any]) => {
    const rawSlug = path
      .replace('../../content/study/', '')
      .replace(/\.md$/, '');
    const parts = rawSlug.split('/');

    const slug = parts[parts.length - 1];

    // 경로가 2번 이상 나뉘면 폴더 명 지정
    const folderName = parts.length > 1 ? parts[parts.length - 2] : '';

    //
    const isFoldered = parts.length > 1 && slug !== folderName;
    const isRootFile = parts.length === 1;
    const rawDate = module.frontmatter.date;
    const dateObj = new Date(rawDate);
    const isLink = module.frontmatter?.isLink || false;

    if (isFoldered) {
      if (!folderMap[folderName]) {
        folderMap[folderName] = {
          folder: folderName,
          parentUrl: `/study/${folderName}/${folderName}`,
          children: [],
        };
      }

      folderMap[folderName].children.push({
        title: slug,
        url: `/study/${folderName}/${slug}`,
        isFoldered,
        isLink,
        jsurl: `/study/${folderName}/${slug}/forJS`,
        date: dateObj,
      });
    } else if (isRootFile) {
      // 루트에 있는 단독 파일만 orphan에 넣는다 (폴더 대표 파일은 제외!)
      orphanPosts.push({
        title: slug,
        url: `/study/${slug}`,
        isFoldered: false,
        isLink,
        jsurl: `/study/${slug}/forJS`,
        date: dateObj,
      });
    }
    // ❌ slug === folderName 인 대표 파일은 처리하지 않는다.
  });

  // Group 형태로 통합
  const groups: StudyGroup[] = [];

  for (const group of Object.values(folderMap)) {
    group.children.sort((a, b) => b.date.getTime() - a.date.getTime());

    groups.push({
      folder: group.folder,
      parentUrl: group.parentUrl,
      folderStartDate: format(group.children[0].date, 'yyyy-MM-dd'),
      children: group.children.map((child) => ({
        ...child,
        date: format(child.date, 'yyyy-MM-dd'),
      })),
    });
  }

  // 단일 파일들도 그룹처럼 넣기
  orphanPosts.forEach((post) => {
    groups.push({
      folder: post.title,
      parentUrl: post.url,
      folderStartDate: format(post.date, 'yyyy-MM-dd'),
      children: [],
    });
  });

  // 최종 정렬: 그룹 전체를 날짜 기준 내림차순
  groups.sort(
    (a, b) =>
      new Date(b.folderStartDate).getTime() -
      new Date(a.folderStartDate).getTime(),
  );

  return groups;
}
