export interface PostProps {
  id?: number;
  documentId?: string;
  name?: string;
  text?: string;
  url?: string;
  education?: string;
  phone?: string;
  email?: string;
  position?: string;
  semester?: number;
  room_number?: string;
  credits?: number;
  subject?: string;
  format?: string;
  mandatory?: boolean;
  grade?: number;
  author?: string;
  nickname?: string;
  poster?: MediaProps;
  thumbnail?: MediaProps;
  media?: MediaProps[];
  photo?: MediaProps[];
  website?: WebsiteProps[];
  category?: string;
  dynamic?: {
    id: number;
    __component: string;
    image_block?: MediaProps[];
    text_block?: string;
  }[];
  tags?:{
    name: string;
    documentId: string;
  }[];
  startDate: string;
  endDate: string;
  location?: string;
  publishedAt: string | null;
  users?: UserDataProps[];
}

export interface MediaProps {
  id: number;
  formats: {
    large?: {
      url: string
      width?: number;
      height?: number;
    };
    small?: {
      url: string
      width?: number;
      height?: number;
    };
    medium?: {
      url: string
      width?: number;
      height?: number;
    };
    thumbnail?: {
      url: string
      width?: number;
      height?: number;
    };
  };
  alternativeText?: string;
}

export interface WebsiteProps {
  id: number;
  name?: string;
  url?: string;
}

export interface UserDataProps {
  id: number;
  documentId: string;
  realname: string;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  role: {
    id: number;
    name: string;
  };
  events?: PostProps[];
  exhibitions?: PostProps[];
  notices?: PostProps[];
  kookmins?: PostProps[];
}

export interface Day {
  day: number,
  inactive?: boolean,
  today?: boolean,
}

export type FilterKey = 'mandatory' | 'credits' | 'subject' | 'format';

export type EventMap = {
  name: string; 
  documentId: string;
  category: string,
  startDate: string,
  endDate: string
}

export type CreateForm = {
  name: string,
  author: string,
  nickname?: string | "",
  category: string,
  tags: string[],
  startDate: string;
  endDate?: string | null;
  location?: string | null;
  website: {
      name: string | null,
      url: string | null,
  }[],
  websiteUrl?: string | null;
  dynamic: ({
      __component: string;
      image_block?: File[];
  } | {
      __component: string;
      text_block?: string | null;
  })[];
  isApproved: boolean;
}