'use client'
import { useState } from 'react'
import Layout from '@/app/components/Layout'
import { StatsGrid } from '@/app/components/dashboard/StatsCards' 
import {
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon
} from '@heroicons/react/24/outline'

const analyticsStats = [
  {
    title: 'Page Views',
    value: '45,231',
    change: '+12% from last month',
    changeType: 'increase' as const,
    color: 'bg-blue-100 text-[#0000EE]',
    icon: <EyeIcon className="w-6 h-6" />
  },
  {
    title: 'Likes',
    value: '1,429',
    change: '+8% from last month',
    changeType: 'increase' as const,
    color: 'bg-red-100 text-red-600',
    icon: <HeartIcon className="w-6 h-6" />
  },
  {
    title: 'Comments',
    value: '342',
    change: '-2% from last month',
    changeType: 'decrease' as const,
    color: 'bg-green-100 text-green-600',
    icon: <ChatBubbleLeftIcon className="w-6 h-6" />
  },
  {
    title: 'Shares',
    value: '89',
    change: '+25% from last month',
    changeType: 'increase' as const,
    color: 'bg-purple-100 text-purple-600',
    icon: <ShareIcon className="w-6 h-6" />
  }
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('30d')

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0000EE]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
        </div>

        <StatsGrid stats={analyticsStats} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Views Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Views Over Time</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Chart placeholder - integrate with your preferred charting library</p>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Posts by Category</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Pie chart placeholder - integrate with your preferred charting library</p>
            </div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Posts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { title: 'Summer Pasta Recipes', views: 2156, engagement: '8.5%' },
                { title: 'Italian Cooking Basics', views: 1834, engagement: '7.2%' },
                { title: 'Healthy Breakfast Ideas', views: 1642, engagement: '6.8%' },
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <h4 className="font-medium text-gray-900">{post.title}</h4>
                    <p className="text-sm text-gray-500">{post.views} views • {post.engagement} engagement</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-[#0000EE]">{post.views}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}