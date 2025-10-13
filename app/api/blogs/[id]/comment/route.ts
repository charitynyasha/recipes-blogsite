// app/api/blog/[id]/comment/route.ts
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/app/_lib/mongodb'
import { ObjectId } from 'mongodb'

interface Comment {
  username: string
  text: string
  timestamp: string
}

interface BlogPost {
  _id?: ObjectId
  title: string
  description: string
  body: string
  tags: string[]
  category: string
  time: string
  people: string
  level: string
  coverImage: string | null
  author: string
  isDraft: boolean
  likes: number
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
  publishedAt: Date | null
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { username, text } = await request.json()
    const { id: postId } = await params

    if (!ObjectId.isValid(postId)) {
      return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 })
    }

    if (!username?.trim() || !text?.trim()) {
      return NextResponse.json(
        { error: 'Username and comment text are required' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('test') // Replace with your DB name

    const comment: Comment = {
      username: username.trim(),
      text: text.trim(),
      timestamp: new Date().toISOString()
    }

    // Fix 1: Use a proper type for the update operation
    const result = await db.collection<BlogPost>('blogposts').updateOne(
      { _id: new ObjectId(postId) },
      { 
        $push: { 
          comments: comment 
        }
      }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const updatedPost = await db.collection<BlogPost>('blogposts').findOne(
      { _id: new ObjectId(postId) }
    )

    return NextResponse.json({ 
      comments: updatedPost?.comments || [],
      success: true 
    })
  } catch (error) {
    console.error('Error adding comment:', error)
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    )
  }
}