// components/dashboard/BlogTable.tsx
"use client";
import { useState } from "react";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

// Comments are not rendered in this table; keep type flexible
type BlogRowComment = unknown;

interface BlogPost {
  _id: string;
  title: string;
  category: string;
  isDraft: boolean;
  createdAt: string;
  likes: number;
  comments?: BlogRowComment[];
}

interface BlogTableProps {
  blogPosts: BlogPost[];
}

export default function BlogTable({ blogPosts }: BlogTableProps) {
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

  const handleDelete = async (postId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== postId));
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm shadow-sm rounded-2xl border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Recent Blog Posts
        </h2>
      </div>
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <colgroup>
              <col className="w-5/12" />
              <col className="w-2/12" />
              <col className="w-2/12" />
              <col className="w-2/12" />
              <col className="w-1/12" />
            </colgroup>
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {posts.map((post) => (
                <tr
                  key={post._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 align-middle h-16">
                    <div
                      className="text-sm font-medium text-gray-900 truncate"
                      title={post.title}
                    >
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="text-sm text-gray-600 capitalize">
                      {post.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ring-inset ${
                        post.isDraft
                          ? "bg-yellow-50 text-yellow-800 ring-yellow-200"
                          : "bg-green-50 text-green-800 ring-green-200"
                      }`}
                    >
                      {post.isDraft ? "Draft" : "Published"}
                    </span>
                  </td>
                  <td className="px-6 py-4 align-middle text-sm text-gray-600">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div className="flex items-center gap-3">
                      <button
                        className="p-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                        aria-label="View"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 rounded-md text-green-600 hover:bg-green-50 transition-colors"
                        aria-label="Edit"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
                        aria-label="Delete"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {posts.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No blog posts yet. Create your first one!
          </div>
        )}
      </div>
    </div>
  );
}
