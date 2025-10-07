'use client';

import { Blog } from '@/types/blog';
import { 
  EyeIcon, 
  HeartIcon, 
  ChatBubbleLeftIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

interface BlogCardProps {
  blog: Blog;
  onEdit: (blog: Blog) => void;
  onDelete: (id: string) => void;
}

export default function BlogCard({ blog, onEdit, onDelete }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      {/* Cover Image */}
      {blog.image && (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        {/* Status and Category */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            blog.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {blog.status}
          </span>
          <span className="text-sm text-gray-500">{blog.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="text-xs text-gray-500">+{blog.tags.length - 3} more</span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <EyeIcon className="w-4 h-4" />
            {blog.views}
          </div>
          <div className="flex items-center gap-1">
            <HeartIcon className="w-4 h-4" />
            {blog.likes}
          </div>
          <div className="flex items-center gap-1">
            <ChatBubbleLeftIcon className="w-4 h-4" />
            {blog.comments}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-900">{blog.author}</p>
            <p className="text-xs text-gray-500">
              {formatDate(blog.date)}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(blog)}
              className="p-2 text-[#0000EE] hover:bg-blue-50 rounded-lg transition-colors"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(blog._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
