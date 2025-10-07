'use client'
import React, { useState } from 'react'
import { CiAlarmOn } from "react-icons/ci"
import { BiDish } from "react-icons/bi"
import { FaRegThumbsUp, FaThumbsUp } from "react-icons/fa"
import { FaPlayCircle, FaRegComment } from "react-icons/fa"
import { AiOutlineSend } from "react-icons/ai"
import { IoClose } from "react-icons/io5"

const FoodItems = ({ initialFoodItems }) => {
  const [foodItems, setFoodItems] = useState(initialFoodItems)
  const [selectedItem, setSelectedItem] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [username, setUsername] = useState("")
  const [likedItems, setLikedItems] = useState(new Set())

  const handleLike = async (itemId) => {
    const isLiked = likedItems.has(itemId)
    
    try {
      const response = await fetch(`/api/foodItem/${itemId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: isLiked ? 'unlike' : 'like' })
      })

      if (response.ok) {
        const data = await response.json()
        setFoodItems(items =>
          items.map(item =>
            item._id === itemId ? { ...item, likes: data.likes } : item
          )
        )
        
        setLikedItems(prev => {
          const newSet = new Set(prev)
          if (isLiked) {
            newSet.delete(itemId)
          } else {
            newSet.add(itemId)
          }
          return newSet
        })
      }
    } catch (error) {
      console.error('Error updating like:', error)
    }
  }

  const handleAddComment = async (itemId) => {
    if (!commentText.trim() || !username.trim()) return

    try {
      const response = await fetch(`/api/foodItem/${itemId}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          text: commentText.trim()
        })
      })

      if (response.ok) {
        const data = await response.json()
        setFoodItems(items =>
          items.map(item =>
            item._id === itemId ? { ...item, comments: data.comments } : item
          )
        )
        setCommentText("")
      }
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const openCommentModal = (itemId) => {
    setSelectedItem(itemId)
  }

  const closeCommentModal = () => {
    setSelectedItem(null)
    setCommentText("")
  }

  const selectedFoodItem = foodItems.find(item => item._id === selectedItem)

  return (
    <>
      <div className="grid justify-center items-center gap-4 col-span-4">
        {foodItems.map((item, index) => {
          const showPlayButton = index === 3 || index === 5 || index === 7
          const isLiked = likedItems.has(item._id)
          const likesCount = item.likes || 0
          const commentsCount = item.comments?.length || 0

          return (
            <React.Fragment key={item._id}>
              <div className="flex flex-col border-t-2 border-b-4 border-x-2 border-[#BCA067] rounded-3xl col-span-4 w-full">
                <div className="flex h-[340px] gap-6">
                  <div className="w-1/2 flex flex-col justify-center items-start mt-10 text-white p-3">
                    <div>
                      <h4>{item.type}</h4>
                    </div>
                    <div className="flex gap-4 mb-5 ml-2 w-full">
                      <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
                        <CiAlarmOn className="text-[#BCA067]" />
                        <span>{item.time}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
                        <BiDish className="text-[#BCA067]" />
                        <span>{item.people}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2 text-[12px] font-medium">
                        <FaRegThumbsUp className="text-[#BCA067]" />
                        <span>{item.level}</span>
                      </div>
                    </div>
                    <h2 className="mb-4 ml-2 text-[30px] font-extrabold w-full inline-block playfair-display">
                      {item.title}
                    </h2>
                    <p className="mb-4 ml-2 text-[16px] max-w-[340px] montserrat text-white/90">
                      {item.desc}
                    </p>
                  </div>
                  <div className="w-1/2 my-5 mr-5 ml-0 rounded-3xl overflow-hidden border-2 border-[#BCA067] relative">
                    <img
                      src={item.imgSrc}
                      alt={item.title}
                      className="w-[100%] h-[100%] object-cover object-center"
                    />
                    {showPlayButton && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FaPlayCircle className="text-[#BCA067] text-6xl hover:opacity-100 transition-opacity cursor-pointer drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Interaction Section */}
                <div className="border-t border-[#BCA067]/30 px-6 py-3">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => handleLike(item._id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        isLiked
                          ? 'text-[#BCA067] bg-[#BCA067]/10'
                          : 'text-white/70 hover:bg-white/5'
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
                      onClick={() => openCommentModal(item._id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/70 hover:bg-white/5 transition-all"
                    >
                      <FaRegComment className="text-[18px]" />
                      <span className="text-sm font-medium">Comment</span>
                      <span className="text-sm font-medium">({commentsCount})</span>
                    </button>
                  </div>
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Comment Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border-2 border-[#BCA067]">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#BCA067]/30">
              <h3 className="text-xl font-bold text-white playfair-display">
                {selectedFoodItem?.title}
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
              {selectedFoodItem?.comments && selectedFoodItem.comments.length > 0 ? (
                selectedFoodItem.comments.map((comment, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#BCA067] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 bg-white/5 rounded-2xl p-3">
                      <div className="font-semibold text-white text-sm mb-1">
                        {comment.username}
                      </div>
                      <div className="text-white/80 text-sm">{comment.text}</div>
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
                    if (e.key === 'Enter' && commentText.trim() && username.trim()) {
                      handleAddComment(selectedItem)
                    }
                  }}
                  className="flex-1 px-4 py-2 bg-white/5 border border-[#BCA067]/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-[#BCA067]"
                />
                <button
                  onClick={() => handleAddComment(selectedItem)}
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
  )
}

export default FoodItems