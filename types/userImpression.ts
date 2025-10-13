import { Comment } from "./food";

export interface UserImpression {
  _id: string;
  title: string;
  desc: string;
  imgSrc: string;
  likes?: number;
  comments?: Comment[];
  [key: string]: any;
}

export type { Comment };
