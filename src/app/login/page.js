// components/LoginForm.js
"use client"
import { loginUserAction } from '@/actions';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const LoginForm = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  // useRouter hook to access Next.js router
  const router = useRouter();

  // Function to handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    
    // You can add further logic here, like sending the data to an API for authentication
    const result = await loginUserAction(formData);
    console.log(result);

    // Check if login was successful, then navigate to homepage
    if (result?.success) {
      router.push("/");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="max-w-xs bg-white p-8 rounded-lg shadow-md w-full sm:w-80">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
            value={formData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-gray-500"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-sm font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-between items-center mt-6">
          <div className="border-b border-gray-300 w-1/5"></div>
          <div className="text-xs text-center text-gray-500 uppercase">or</div>
          <div className="border-b border-gray-300 w-1/5"></div>
        </div>
        <Link href="/sign-up" passHref>
          <div className="block text-center mt-2 text-xs text-gray-500 hover:text-black">
            Sign up for Instagram
          </div>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
