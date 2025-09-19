"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext"; 

type BlogPost = {
  _id: string;
  title: string;
  content: string;
  image?: string;
  author: string;
};

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/blogs/${params.id}`)
      .then(res => res.json())
      .then(data => setFormData(data))
      .catch(() => setError("Failed to load blog"))
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/blogs/${formData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, author: user.email }),
      });

      if (response.ok) {
        router.push("/dashboard");
      } else {
        const data = await response.json();
        setError(data.error || "Failed to update blog");
      }
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="p-8">Loading blog post...</p>;
  if (error) return <p className="p-8 text-red-600">{error}</p>;
  if (!formData) return null;

  return (
    <div className="min-h-screen p-8 bg-[#fdfaf6] text-[#242322]">
      <h1 className="text-2xl font-bold mb-6">Edit Blog Post ✏️</h1>
      <form onSubmit={handleUpdate} className="grid gap-4 max-w-2xl">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 border rounded-lg"
        />
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={10}
          className="p-3 border rounded-lg"
        />
        <input
          type="text"
          name="image"
          value={formData.image || ""}
          onChange={handleChange}
          className="p-3 border rounded-lg"
        />
        <button
          type="submit"
          disabled={loading}
          className="py-2 bg-[#BCA067] text-white rounded-lg hover:bg-[#a88b52]"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}
