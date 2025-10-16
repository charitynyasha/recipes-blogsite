import BlogTable from "@/app/(dashboard)/components/dashboard/BlogTable";
import { getBlogs, type BlogListItem } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogPosts: BlogListItem[] = await getBlogs(true);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Blogs</h1>
        <p className="text-white">Manage, edit, and review your posts.</p>
      </div>
      {/* Reuse the existing table component for a consistent dashboard look */}
      <BlogTable
        blogPosts={blogPosts.map((p) => ({
          _id: p._id,
          title: p.title,
          category: p.category,
          isDraft: Boolean(p.isDraft),
          createdAt: p.createdAt,
          likes: p.likes ?? 0,
          comments: Array.isArray(p.comments) ? (p.comments as unknown[]) : [],
        }))}
      />
    </div>
  );
}
