// hooks/useUserImpressionInteractions.ts
import { useState, useEffect, useCallback } from "react";
import { UserImpression, Comment } from "@/types/userImpression";

export function useUserImpressionInteractions(item: UserImpression) {
  const [likesCount, setLikesCount] = useState(item.likes || 0);
  const [comments, setComments] = useState<Comment[]>(item.comments || []);
  const [pending, setPending] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Load liked state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("likedItems");
    if (stored) {
      const likedItems = JSON.parse(stored);
      setIsLiked(likedItems.includes(item._id));
    }
  }, [item._id]);

  // Like/Unlike function
  const like = useCallback(async () => {
    if (pending) return;

    setPending(true);
    const action = isLiked ? "unlike" : "like";

    try {
      const response = await fetch(`/api/foodItem/${item._id}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success) {
          setLikesCount(data.likes);
          setIsLiked(!isLiked);

          // Update localStorage
          const stored = localStorage.getItem("likedItems");
          const likedItems = stored ? JSON.parse(stored) : [];

          if (action === "like") {
            likedItems.push(item._id);
          } else {
            const index = likedItems.indexOf(item._id);
            if (index > -1) {
              likedItems.splice(index, 1);
            }
          }

          localStorage.setItem("likedItems", JSON.stringify(likedItems));
        } else {
          console.log(data.message);
        }
      } else {
        const errorData = await response.json();
        console.error("Error response:", errorData);
      }
    } catch (error) {
      console.error("Error updating like:", error);
    } finally {
      setPending(false);
    }
  }, [item._id, isLiked, pending]);

  // Post comment function
  const postComment = useCallback(
    async (text: string, author?: string) => {
      if (!text.trim()) return;
      if (pending) return;

      setPending(true);

      try {
        const response = await fetch(`/api/foodItem/${item._id}/comment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: author || "Anonymous",
            text: text.trim(),
          }),
        });

        if (response.ok) {
          const data = await response.json();

          if (data.success) {
            setComments(data.comments);
          }
        } else {
          const errorData = await response.json();
          console.error("Error response:", errorData);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      } finally {
        setPending(false);
      }
    },
    [item._id, pending]
  );

  return {
    likesCount,
    comments,
    isLiked,
    like,
    postComment,
    pending,
  };
}