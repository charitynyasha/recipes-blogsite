import clientPromise from "@/app/_lib/mongodb";
import type { WithId, Document } from "mongodb";

export type BlogListItem = {
  _id: string;
  title: string;
  description: string;
  category: string;
  time: string;
  people: string;
  level: string;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  isDraft?: boolean;
  likes?: number;
  comments?: Array<unknown>;
};

export async function getBlogs(includeDrafts = false): Promise<BlogListItem[]> {
  const client = await clientPromise;
  const db = client.db("test");

  const query = includeDrafts ? {} : { isDraft: false };
  const docs = await db
    .collection("blogposts")
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return (docs as Array<WithId<Document>>).map((post) => ({
    _id: String(post._id),
    title: String(post.title ?? "Untitled"),
    description: String(post.description ?? ""),
    category: String(post.category ?? ""),
    time: String(post.time ?? "15 MIN"),
    people: String(post.people ?? "2 PEOPLE"),
    level: String(post.level ?? "EASY"),
    coverImage: (post.coverImage as string | null) ?? null,
    createdAt: post.createdAt
      ? new Date(
          post.createdAt as unknown as string | number | Date
        ).toISOString()
      : new Date().toISOString(),
    updatedAt: post.updatedAt
      ? new Date(
          post.updatedAt as unknown as string | number | Date
        ).toISOString()
      : new Date().toISOString(),
    publishedAt: post.publishedAt
      ? new Date(
          post.publishedAt as unknown as string | number | Date
        ).toISOString()
      : null,
    isDraft: Boolean(post.isDraft),
    likes: (post.likes as number) ?? 0,
    comments: (post.comments as Array<unknown>) ?? [],
  }));
}
