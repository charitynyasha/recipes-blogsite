import clientPromise from "@/app/_lib/mongodb";

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

  return docs.map((post: any) => ({
    _id: post._id.toString(),
    title: post.title,
    description: post.description,
    category: post.category,
    time: post.time,
    people: post.people,
    level: post.level,
    coverImage: post.coverImage,
    createdAt: post.createdAt?.toISOString?.() ?? new Date().toISOString(),
    updatedAt: post.updatedAt?.toISOString?.() ?? new Date().toISOString(),
    publishedAt: post.publishedAt ? post.publishedAt.toISOString() : null,
  }));
}
