import { NextResponse } from 'next/server';
import clientPromise from '@/app/_lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('test'); // <-- IMPORTANT: Replace with your DB name
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 } // 401 Unauthorized
      );
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      );
    }
    
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
const { password: unusedPassword, ...userWithoutPassword } = user;



    // Here you would typically create a session or JWT token
    // For now, we'll just return a success message and user data
    return NextResponse.json({ 
        message: 'Signed in successfully!',
        user: userWithoutPassword
    }, { status: 200 });

  } catch (error) {
    console.error('Sign In Error:', error);
    return NextResponse.json(
      { error: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}