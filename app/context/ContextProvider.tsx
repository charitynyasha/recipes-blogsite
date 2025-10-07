"use client"
import { createContext, useContext, useState, ReactNode } from 'react'

type BlogPost = {
  id: string
  title: string
  description: string
  body: string
  tags: string[]
  category: string
  coverImage: string | null
  isDraft: boolean
  author: string
  createdAt: Date
  views: number
}

type BlogContextType = {
  blogs: BlogPost[]
  addBlog: (blog: Omit<BlogPost, 'id' | 'createdAt' | 'views'>) => void
  getPublishedBlogs: () => BlogPost[]
  getDraftBlogs: () => BlogPost[]
}

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export function BlogProvider({ children }: { children: ReactNode }) {
  const [blogs, setBlogs] = useState<BlogPost[]>([])

  const addBlog = (blog: Omit<BlogPost, 'id' | 'createdAt' | 'views'>) => {
    const newBlog: BlogPost = {
      ...blog,
      id: Date.now().toString(),
      createdAt: new Date(),
      views: 0
    }
    setBlogs(prev => [newBlog, ...prev])
  }

  const getPublishedBlogs = () => {
    return blogs.filter(blog => !blog.isDraft)
  }

  const getDraftBlogs = () => {
    return blogs.filter(blog => blog.isDraft)
  }

  return (
    <BlogContext.Provider value={{ blogs, addBlog, getPublishedBlogs, getDraftBlogs }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider')
  }
  return context
}