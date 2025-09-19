"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

export default function CreateBlogPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not signed in
  if (!user) {
    router.push("/signIn");
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, author: user.email })
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || `Failed to publish (code ${response.status})`);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      console.error("Network/runtime error:", err);
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-[#fdfaf6] text-[#242322]">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog Post 📝</h1>

      {error && <p className="mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-4 max-w-2xl">
        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 border rounded-lg"
        />

        <textarea
          name="content"
          placeholder="Write your blog content here..."
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="p-3 border rounded-lg"
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={formData.image}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="py-2 bg-[#BCA067] text-white rounded-lg hover:bg-[#a88b52] disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Blog"}
        </button>
      </form>
    </div>
  );
}
