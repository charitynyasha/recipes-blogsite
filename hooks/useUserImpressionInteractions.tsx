"use client";
import { useState } from "react";

export function useUserImpressionInteractions(item: any) {
  const [likesCount, setLikesCount] = useState(item.likesCount ?? 0);
  const [comments, setComments] = useState(item.comments ?? []);
  const [pending, setPending] = useState(false);

  async function like() {
    setLikesCount((c) => c + 1); // optimistic
    try {
      const res = await fetch(`/api/userImpressions/${item._id}/like`, { method: "POST" });
      if (!res.ok) throw new Error("Failed to like");
      const data = await res.json();
      setLikesCount(data.likesCount ?? likesCount);
    } catch {
      setLikesCount((c) => Math.max(c - 1, 0)); // rollback
    }
  }

  async function postComment(text: string, author?: string) {
    if (!text.trim()) return;
    const newComment = { text, author: author ?? null, createdAt: new Date().toISOString() };
    setComments((prev) => [...prev, newComment]); // optimistic
    setPending(true);

    try {
      const res = await fetch(`/api/userImpressions/${item._id}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, author }),
      });
      if (!res.ok) throw new Error("Failed to comment");
      const data = await res.json();
      setComments(data.comments ?? comments);
    } finally {
      setPending(false);
    }
  }

  return { likesCount, comments, like, postComment, pending };
}
