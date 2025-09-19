"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
  draft: boolean;
  views: number;
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    drafts: 0,
    published: 0,
    views: 0,
  });
useEffect(() => {
  if (!user) {
    router.push("/signIn");
    return;
  }

  async function loadPosts() {
    try {
      const res = await fetch(`/api/blogs?author=${encodeURIComponent(user.email)}`);

      if (!res.ok) {
        const text = await res.text();
        console.error("Load posts failed:", res.status, text);
        throw new Error(`Status ${res.status}`);
      }

      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  }

  loadPosts();
}, [user]);

  useEffect(() => {
    if (!user) {
      router.push("/signIn");
      return;
    }

    fetch(`/api/blogs?author=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then((data: BlogPost[]) => {
        setPosts(data);
        const drafts = data.filter(p => p.draft).length;
        const published = data.filter(p => !p.draft).length;
        const views = data.reduce((sum, p) => sum + (p.views || 0), 0);
        setAnalytics({ drafts, published, views });
      })
      .catch(err => console.error("Failed to load posts", err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/blogs/${id}`, { method: "DELETE" });
    setPosts(prev => prev.filter(post => post._id !== id));
    setAnalytics(prev => ({
      drafts: prev.drafts - (posts.find(p => p._id === id)?.draft ? 1 : 0),
      published: prev.published - (posts.find(p => p._id === id && !p.draft) ? 1 : 0),
      views: prev.views,
    }));
  };

  if (!user) return null;

  return (
    <div className="min-h-screen p-8 bg-black/95 text-[#fdfaf6] mt-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Welcome, {user.name || user.email} 👩‍🍳
        </h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#BCA067] text-white rounded-lg hover:bg-[#a88b52]"
        >
          Logout
        </button>
      </div>

      {/* Analytics */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-semibold text-black">{analytics.drafts}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-2xl font-semibold text-black">{analytics.published}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-sm text-gray-500">Total Views</p>
          <p className="text-2xl font-semibold text-black">{analytics.views}</p>
        </div>
      </section>

      {/* Posts Grid (includes New Post card) */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Your Blog Posts</h2>

        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* New Post Card */}
            <div
              onClick={() => router.push("/dashboard/create-blog")}
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-50"
            >
              <div className="text-4xl text-gray-400 mb-2">＋</div>
              <p className="text-lg font-medium text-gray-600">
                Create New Post
              </p>
            </div>

            {/* Existing Posts */}
            {posts.map(post => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow flex flex-col overflow-hidden"
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-700 flex-1">
                    {post.content.slice(0, 100)}...
                  </p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        post.draft
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {post.draft ? "Draft" : "Published"}
                    </span>
                    <span>👀 {post.views}</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/edit-blog/${post._id}`)
                      }
                      className="flex-1 py-2 bg-[#BCA067] text-white rounded hover:bg-[#a88b52]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="flex-1 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
