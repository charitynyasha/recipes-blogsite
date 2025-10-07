"use client";

import { useState } from "react";

interface Comment {
  author?: string;
  text: string;
}

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comments: Comment[];
  onPost: (text: string) => void;
}

export default function CommentModal({
  isOpen,
  onClose,
  comments,
  onPost,
}: CommentModalProps) {
  const [text, setText] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      {/* Modal Container */}
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="font-semibold text-lg">Comments</h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Comments List */}
        <div className="p-4 max-h-64 overflow-y-auto space-y-2">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-sm">No comments yet</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className="text-sm">
                <span className="font-semibold">{c.author ?? "Anonymous"}: </span>
                {c.text}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 p-4 border-t">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-md border px-3 py-2 text-sm focus:outline-none"
          />
          <button
            disabled={!text.trim()}
            onClick={() => {
              onPost(text);
              setText("");
            }}
            className="bg-[#BCA067] text-black px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
