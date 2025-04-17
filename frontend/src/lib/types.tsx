import { JSX } from "react";

export type TYBlogPost = {
  id: number;
  slug: string;
  title: string;
  href: string;
  description: string;
  content_html?: string;
  updated_at: string;
  created_at: string;
  tags: TYTag[];
  thumbnail: string;
  author: {
    name: string;
    role: string;
    href: string;
    profile_picture: string;
  };
};

export type TYEventPost = {
  id: number;
  slug: string;
  title: string;
  href: string;
  description: string;
  content_html?: string;
  updated_at: string;
  created_at: string;
  tags: TYTag[];
  thumbnail: string;
  location: string;
  start_datetime: string;
  end_datetime: string;
  is_done: boolean;
  author?: {
    name: string;
    role: string;
    href: string;
    profile_picture: string;
  };
};

export type TYCandidate = {
  id: number;
  slug: string;
  event: number;
  full_name: string;
  photo: string;
  bio: string;
  vote_count: number;
  vote_number: number;
  event_slug: string;
  created_at: string; // ISO datetime string
};

export type TYTag = {
  id: number;
  name: string;
  slug: string;
};

export type TYPaginate<T> = {
  map(arg0: (_: any) => JSX.Element): import("react").ReactNode;
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type TYComment = {
  id: number;
  blog: TYBlogPost; // Optionally, you can include the related BlogPost object
  full_name: string;
  user_email: string;
  reply_email: string | null;
  comment_msg: string;
  created_at: string;
  setReply: React.Dispatch<
    React.SetStateAction<{ content: string; id: number } | null>
  >;
};
