"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchUserAction } from '@/actions';

export default function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const user = await fetchUserAction();
      console.log(user)
      setCurrentUser(user);
    }
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="w-full bg-blue-600 py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-white font-bold">Welcome User</h1>
          {currentUser ? (
            <>
              <h3 className="text-white">{currentUser.username}</h3>
              <h3 className="text-white">{currentUser.email}</h3>
            </>
          ) : (
            <p className="text-white">Please log in or sign up</p>
          )}
        </div>
      </header>
      <main className="flex flex-col items-center flex-1 container mx-auto px-6 py-12">
        <Image
          src="/authentication.png" // Add your image in the public folder
          alt="Authentication Illustration"
          width={400}
          height={300}
          className="mb-8"
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Welcome to the Authentication App
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Secure your app with our robust authentication system. Login to access your account or sign up to create a new one.
        </p>
        {currentUser ? (
          <div className="text-gray-800 font-semibold mb-8">
            <p>You are logged in as {currentUser?.data?.username} </p>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link href="/login">
              <div className="px-6 py-3 bg-blue-500 text-white rounded-sm font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">
                Log In
              </div>
            </Link>
            <Link href="/sign-up">
              <div className="px-6 py-3 bg-green-500 text-white rounded-sm font-semibold hover:bg-green-600 focus:outline-none focus:bg-green-600 transition duration-300">
                Sign Up
              </div>
            </Link>
          </div>
        )}
      </main>
      <footer className="w-full bg-gray-800 py-4">
        <div className="container mx-auto text-center text-gray-400">
          &copy; {new Date().getFullYear()} Authentication App. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
