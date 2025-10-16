// components/BlogCarousel.tsx
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { CiAlarmOn } from "react-icons/ci";
import { BiDish } from "react-icons/bi";
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegComment,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { IoClose } from "react-icons/io5";

interface Comment {
  username: string;
  text: string;
  timestamp: string;
}

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  body?: string;
  tags?: string[];
  category: string;
  coverImage: string | null;
  author?: string;
  createdAt: string;
  likes?: number;
  comments?: Comment[];
  time?: string;
  people?: string;
  level?: string;
  isDraft?: boolean;
}

interface BlogCarouselProps {
  posts?: BlogPost[];
}

const BlogCarousel: React.FC<BlogCarouselProps> = ({ posts = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState("");

  // Filter out draft posts - only show published posts
  const safePosts = Array.isArray(posts) ? posts : [];
  const publishedPosts = safePosts.filter((post) => !post.isDraft);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === publishedPosts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? publishedPosts.length - 1 : prevIndex - 1
    );
  };

  const handleLike = async (postId: string) => {
    const isLiked = likedPosts.has(postId);

    try {
      const response = await fetch(`/api/blogs/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: isLiked ? "unlike" : "like" }),
      });

      if (response.ok) {
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          if (isLiked) {
            newSet.delete(postId);
          } else {
            newSet.add(postId);
          }
          return newSet;
        });
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!commentText.trim() || !username.trim()) return;

    try {
      const response = await fetch(`/api/blogs/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.trim(),
          text: commentText.trim(),
        }),
      });

      if (response.ok) {
        setCommentText("");
        setSelectedPost(null);
        setUsername("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const openCommentModal = (postId: string) => {
    setSelectedPost(postId);
  };

  const closeCommentModal = () => {
    setSelectedPost(null);
    setCommentText("");
    setUsername("");
  };

  const selectedBlogPost = publishedPosts.find(
    (post) => post._id === selectedPost
  );

  if (!publishedPosts || publishedPosts.length === 0) {
    return (
      <div className="text-center text-white/70 py-12 border-2 border-[#BCA067] border-dashed rounded-2xl">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-lg mb-2">No blog posts published yet</p>
        <p className="text-sm text-white/50">
          Check back later for amazing culinary stories and tips!
        </p>
      </div>
    );
  }

  const currentPost = publishedPosts[currentIndex] ?? publishedPosts[0];
  const isLiked = likedPosts.has(currentPost._id);
  const likesCount = currentPost.likes || 0;
  const commentsCount = currentPost.comments?.length || 0;

  return (
    <>
      <div className="relative w-full">
        {/* Carousel Item */}
        <div className="flex flex-col border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl w-full bg-white/5 backdrop-blur-sm">
          <div className="flex flex-col lg:flex-row h-auto lg:h-[400px] gap-6">
            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-start p-6 lg:p-8 text-white">
              <div>
                <h4 className="text-[#BCA067] font-semibold uppercase tracking-wide text-sm">
                  {currentPost.category}
                </h4>
              </div>
              <div className="flex gap-4 mb-4 mt-2 w-full">
                <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
                  <CiAlarmOn className="text-[#BCA067]" />
                  <span>{currentPost.time || "15 MIN"}</span>
                </div>
                <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
                  <BiDish className="text-[#BCA067]" />
                  <span>{currentPost.people || "4 PEOPLE"}</span>
                </div>
                <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
                  <FaRegThumbsUp className="text-[#BCA067]" />
                  <span>{currentPost.level || "MEDIUM"}</span>
                </div>
              </div>
              <h2 className="mb-4 text-[24px] lg:text-[30px] font-extrabold w-full inline-block playfair-display">
                {currentPost.title}
              </h2>
              <p className="mb-4 text-[14px] lg:text-[16px] max-w-full lg:max-w-[400px] montserrat text-white/90">
                {currentPost.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(currentPost?.tags) ? currentPost.tags : []).map(
                  (tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#BCA067]/20 text-[#BCA067] rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Image Content */}
            <div className="w-full lg:w-1/2 p-4 lg:p-6">
              <div className="rounded-2xl overflow-hidden border-2 border-[#BCA067] relative h-64 lg:h-full">
                {currentPost.coverImage ? (
                  <Image
                    src={currentPost.coverImage}
                    alt={currentPost.title}
                    fill
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <span className="text-white/50">No Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Social Interaction Section */}
          <div className="border-t border-[#BCA067]/30 px-6 py-4">
            <div className="flex items-center gap-6">
              <button
                onClick={() => handleLike(currentPost._id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isLiked
                    ? "text-[#BCA067] bg-[#BCA067]/10"
                    : "text-white/70 hover:bg-white/5"
                }`}
              >
                {isLiked ? (
                  <FaThumbsUp className="text-[18px]" />
                ) : (
                  <FaRegThumbsUp className="text-[18px]" />
                )}
                <span className="text-sm font-medium">Like</span>
                <span className="text-sm font-medium">({likesCount})</span>
              </button>

              <button
                onClick={() => openCommentModal(currentPost._id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-all"
              >
                <FaRegComment className="text-[18px]" />
                <span className="text-sm font-medium">Comment</span>
                <span className="text-sm font-medium">({commentsCount})</span>
              </button>

              <div className="ml-auto text-sm text-white/50">
                By {currentPost.author} •{" "}
                {new Date(currentPost.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {publishedPosts.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all z-10"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </>
        )}

        {/* Dots Indicator */}
        {publishedPosts.length > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            {publishedPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-[#BCA067]" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Comment Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border-2 border-[#BCA067]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#BCA067]/30">
              <h3 className="text-xl font-bold text-white playfair-display">
                {selectedBlogPost?.title}
              </h3>
              <button
                onClick={closeCommentModal}
                className="text-white/70 hover:text-white transition-colors"
              >
                <IoClose className="text-2xl" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedBlogPost?.comments &&
              selectedBlogPost.comments.length > 0 ? (
                selectedBlogPost.comments.map((comment, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#BCA067] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 bg-white/5 rounded-2xl p-3">
                      <div className="font-semibold text-white text-sm mb-1">
                        {comment.username}
                      </div>
                      <div className="text-white/80 text-sm">
                        {comment.text}
                      </div>
                      <div className="text-white/40 text-xs mt-2">
                        {new Date(comment.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-white/50 py-8">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-[#BCA067]/30">
              {!username && (
                <input
                  type="text"
                  placeholder="Enter your name..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 mb-2 bg-white/5 border border-[#BCA067]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#BCA067]"
                />
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => {
                    if (
                      e.key === "Enter" &&
                      commentText.trim() &&
                      username.trim()
                    ) {
                      handleAddComment(selectedPost);
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-white/5 border border-[#BCA067]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#BCA067]"
                />
                <button
                  onClick={() => handleAddComment(selectedPost)}
                  disabled={!commentText.trim() || !username.trim()}
                  className="px-4 py-2 bg-[#BCA067] text-white rounded-lg hover:bg-[#a08a54] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <AiOutlineSend className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BlogCarousel;
