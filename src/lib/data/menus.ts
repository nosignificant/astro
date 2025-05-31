export interface MenuItem {
  name: string;
  url: string;
  description: string;
}

export const Menus = [
  { name: 'nosignificant', url: '/home', description: 'home입니다.' },
  { name: 'study', url: '/study', description: 'js, frontend 스터디 기록' },
  { name: 'note', url: '/note', description: '감상문, 메모, 기록' },
  { name: 'work', url: '/work', description: '만드는중' },
];
