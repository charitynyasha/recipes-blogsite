// components/dashboard/RecentActivity.tsx
interface BlogPost {
  _id: string
  title: string
  createdAt: string
  isDraft: boolean
}

interface RecentActivityProps {
  blogPosts: BlogPost[]
}

export default function RecentActivity({ blogPosts }: RecentActivityProps) {
  const recentPosts = blogPosts
    .sort((a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  return (
    <div className="bg-white shadow-sm rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentPosts.map((post: BlogPost) => (
            <div key={post._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  post.isDraft ? 'bg-yellow-400' : 'bg-green-400'
                }`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{post.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()} • 
                    <span className={`ml-1 ${
                      post.isDraft ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {post.isDraft ? 'Draft' : 'Published'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {recentPosts.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </div>
  )
}