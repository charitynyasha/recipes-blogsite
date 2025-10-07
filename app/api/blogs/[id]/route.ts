// app/api/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/app/_lib/mongodb'
import { ObjectId } from 'mongodb'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id

    const client = await clientPromise
    const db = client.db('your-database-name')

    const result = await db.collection('blogposts').deleteOne({
      _id: new ObjectId(postId)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}