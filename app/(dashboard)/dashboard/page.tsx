// app/(dashboard)/dashboard/page.tsx
import Layout from "../components/dashboard/Layout";
import GreetingCard from "../components/dashboard/GreetingCard";
import RecentActivity from "../components/dashboard/RecentActivity";
import BlogTable from "../components/dashboard/BlogTable";
import { StatsGrid } from "../components/dashboard/StatsCards";
import {
  EyeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  body: string;
  tags: string[];
  category: string;
  coverImage: string | null;
  author: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  time: string;
  people: string;
  level: string;
  isDraft: boolean;
  updatedAt: string;
  publishedAt: string | null;
}

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

// Function to fetch blog data from API
const getBlogData = async (): Promise<BlogPost[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/blogs?includeDrafts=true`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
};

// ✅ Add this line to force dynamic rendering
export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const blogPosts = await getBlogData();

  // Calculate real stats from the data with proper types
  const publishedBlogs = blogPosts.filter(
    (post: BlogPost) => !post.isDraft
  ).length;
  const draftBlogs = blogPosts.filter((post: BlogPost) => post.isDraft).length;
  const totalComments = blogPosts.reduce(
    (total: number, post: BlogPost) => total + (post.comments?.length || 0),
    0
  );

  const statsData = [
    {
      title: "Total Views",
      value: "12,543",
      change: "+12% from last month",
      changeType: "increase" as const,
      color: "bg-blue-100 text-[#0000EE]",
      icon: <EyeIcon className="w-6 h-6" />,
    },
    {
      title: "Published Blogs",
      value: publishedBlogs.toString(),
      change: "+2 this week",
      changeType: "increase" as const,
      color: "bg-green-100 text-green-600",
      icon: <DocumentTextIcon className="w-6 h-6" />,
    },
    {
      title: "Drafts",
      value: draftBlogs.toString(),
      color: "bg-yellow-100 text-[#BCA067]",
      icon: <PencilSquareIcon className="w-6 h-6" />,
    },
    {
      title: "Comments",
      value: totalComments.toString(),
      change: "+15 today",
      changeType: "increase" as const,
      color: "bg-purple-100 text-purple-600",
      icon: <ChatBubbleLeftIcon className="w-6 h-6" />,
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        <GreetingCard userName="There" />
        <StatsGrid stats={statsData} />

        <div className="grid grid-cols-1 gap-8">
          <div>
            <BlogTable blogPosts={blogPosts} />
          </div>
          <div>
            <RecentActivity blogPosts={blogPosts} />
          </div>
        </div>
      </div>
    </Layout>
  );
}