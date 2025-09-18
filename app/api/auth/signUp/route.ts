import { NextResponse } from 'next/server';
import clientPromise from '@/app/_lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password || password.length < 6) {
      return NextResponse.json(
        { error: 'Invalid input. Please check your data.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test'); // <-- IMPORTANT: Replace with your DB name
    const usersCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 } // 409 Conflict
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Insert new user into the database
    const result = await usersCollection.insertOne({
      name,
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    console.log('User created:', result.insertedId);

    // Return a success response
    return NextResponse.json(
      { message: 'User created successfully!' },
      { status: 201 } // 201 Created
    );

  } catch (error) {
    console.error('Sign Up Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}