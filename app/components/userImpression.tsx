"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FaRegThumbsUp } from "react-icons/fa";
import { useUserImpressionInteractions } from "@/hooks/useUserImpressionInteractions";
import { UserImpression } from "@/types/userImpression"; // Assuming you have a type for this

interface UserImpressionCardProps {
  item: UserImpression;
}

export default function UserImpressionCard({ item }: UserImpressionCardProps) {
  const { likesCount, comments, like, postComment, pending } =
    useUserImpressionInteractions(item);
  const [text, setText] = useState("");

  return (
    <div className="border rounded-xl p-4 text-white bg-slate-800">
      <div className="flex">
        <Image
          src={item.imgSrc}
          alt={item.title}
          width={144}
          height={96}
          className="object-cover rounded-md mr-4"
        />
        <div>
          <h3 className="text-xl font-bold">{item.title}</h3>
          <p className="text-sm text-white/80 max-w-[320px]">{item.desc}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-4">
        <button
          onClick={like}
          className="flex items-center gap-2 px-3 py-1 rounded-md border hover:bg-white/5"
        >
          <FaRegThumbsUp /> {likesCount}
        </button>
      </div>

      <div className="mt-3">
        <h4 className="font-semibold">Comments</h4>
        <ul className="mt-2 text-sm space-y-1">
          {comments.length === 0 ? (
            <li className="text-white/60">No comments yet</li>
          ) : (
            comments.map((c: { author?: string; text: string }, i: number) => (
              <li key={i} className="text-white/90">
                <span className="text-sm text-white/70">
                  {c.author ? `${c.author}: ` : ""}
                </span>
                {c.text}
              </li>
            ))
          )}
        </ul>

        <div className="mt-2 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 rounded-md p-2 text-black"
          />
          <button
            disabled={pending}
            onClick={() => {
              postComment(text);
              setText("");
            }}
            className="px-3 py-2 rounded-md bg-[#BCA067] text-black disabled:opacity-60"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
