// app/(dashboard)/dashboard/page.tsx
import Layout from '../components/dashboard/Layout'
import GreetingCard from '../components/dashboard/GreetingCard'
import RecentActivity from '../components/dashboard/RecentActivity'
import BlogTable from '../components/dashboard/BlogTable'
import {
  EyeIcon,
  DocumentTextIcon,
  PencilSquareIcon,
  ChatBubbleLeftIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'

interface BlogPost {
  _id: string
  title: string
  description: string
  body: string
  tags: string[]
  category: string
  coverImage: string | null
  author: string
  createdAt: string
  likes: number
  comments: any[]
  time: string
  people: string
  level: string
  isDraft: boolean
  updatedAt: string
  publishedAt: string | null
}

// Function to fetch blog data from API
const getBlogData = async (): Promise<BlogPost[]> => {
  try {
    const res = await fetch('http://localhost:3000/api/blogs?includeDrafts=true', {
      cache: 'no-store'
    })
    
    if (!res.ok) return []
    return res.json()
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return []
  }
}

export default async function Dashboard() {
  const blogPosts = await getBlogData()
  
  // Calculate real stats from the data with proper types
  const publishedBlogs = blogPosts.filter((post: BlogPost) => !post.isDraft).length
  const draftBlogs = blogPosts.filter((post: BlogPost) => post.isDraft).length
  const totalComments = blogPosts.reduce((total: number, post: BlogPost) => total + (post.comments?.length || 0), 0)
  const totalLikes = blogPosts.reduce((total: number, post: BlogPost) => total + (post.likes || 0), 0)

  const stats = [
    {
      title: 'Total Views',
      value: '12,543', // You might want to add view tracking to your blog posts
      change: '+12% from last month',
      changeType: 'increase' as const,
      color: 'bg-blue-100 text-[#0000EE]',
      icon: <EyeIcon className="w-6 h-6" />
    },
    {
      title: 'Published Blogs',
      value: publishedBlogs.toString(),
      change: '+2 this week', // You could calculate this by comparing with last week
      changeType: 'increase' as const,
      color: 'bg-green-100 text-green-600',
      icon: <DocumentTextIcon className="w-6 h-6" />
    },
    {
      title: 'Drafts',
      value: draftBlogs.toString(),
      color: 'bg-yellow-100 text-[#BCA067]',
      icon: <PencilSquareIcon className="w-6 h-6" />
    },
    {
      title: 'Comments',
      value: totalComments.toString(),
      change: '+15 today', // You could calculate this by checking today's comments
      changeType: 'increase' as const,
      color: 'bg-purple-100 text-purple-600',
      icon: <ChatBubbleLeftIcon className="w-6 h-6" />
    }
  ]

  return (
    <Layout>
      <div className="space-y-8">
        <GreetingCard userName="John Doe" />
        
        <div className="grid grid-cols-1 gap-8">
          <div className="">
            {/* Pass the real blog data to BlogTable */}
            <BlogTable blogPosts={blogPosts} />
          </div>
          <div>
            {/* Pass the real blog data to RecentActivity */}
            <RecentActivity blogPosts={blogPosts} />
          </div>
        </div>
      </div>
    </Layout>
  )
}