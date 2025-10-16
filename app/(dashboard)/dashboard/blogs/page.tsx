import BlogTable from "@/app/(dashboard)/components/dashboard/BlogTable";
import { getBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogPosts = await getBlogs(true);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white playfair-display">My Blogs</h1>
        <p className="text-white montserrat text-lg">Manage, edit, and review your posts.</p>
      </div>
      {/* Reuse the existing table component for a consistent dashboard look */}
      <BlogTable blogPosts={blogPosts as any} />
    </div>
  );
}
