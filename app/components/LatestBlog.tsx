import { EyeIcon, CalendarIcon, TagIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

type BlogPostCardProps = {
  id: string;
  title: string;
  description: string;
  body: string;
  coverImage: string | null;
  tags: string[];
  category: string;
  author: string;
  createdAt: Date;
  views: number;
};

export default function BlogPostCard({
  title,
  description,
  coverImage,
  tags,
  category,
  author,
  createdAt,
  views,
}: BlogPostCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200">
      {/* Cover Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
            <svg
              className="w-20 h-20 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {category && (
          <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-md"
              >
                <TagIcon className="w-3 h-3" />
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <CalendarIcon className="w-4 h-4" />
              {formatDate(createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <EyeIcon className="w-4 h-4" />
              {views}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-700">By {author}</span>
        </div>
      </div>
    </div>
  );
}
