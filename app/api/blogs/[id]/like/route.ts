// app/api/blog/[id]/like/route.ts
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/app/_lib/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { action } = await request.json()
    const postId = params.id

    const client = await clientPromise
    const db = client.db("test") // Replace with your DB name

    const update = action === 'like' 
      ? { $inc: { likes: 1 } }
      : { $inc: { likes: -1 } }

    await db.collection('blogPosts').updateOne(
      { _id: new ObjectId(postId) },
      update
    )

    const updatedPost = await db.collection('blogPosts').findOne(
      { _id: new ObjectId(postId) }
    )

    return NextResponse.json({ likes: updatedPost?.likes || 0 })
  } catch (error) {
    console.error('Error updating like:', error)
    return NextResponse.json(
      { error: 'Failed to update like' },
      { status: 500 }
    )
  }
}