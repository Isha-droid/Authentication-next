// components/SignUp.js
"use client"
import React, { useState, useEffect } from 'react';
import {registerUserAction }from '@/actions';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const router = useRouter()

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { username, email, password } = formData;
    setIsFormValid(username !== '' && email !== '' && password !== '');
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', JSON.stringify(formData));
    // Here you can handle the form submission, e.g., sending data to an API
    const result = await registerUserAction(formData);
    alert(result.message);
    console.log(result);
    if (result?.success) {
        router.push("/");
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg transform transition-all hover:scale-105">
        <h3 className="text-3xl font-bold mb-8 text-center text-gray-800">Create an Account</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-300 ease-in-out"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 px-6 rounded-md text-white ${isFormValid ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-400 cursor-not-allowed'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform ${isFormValid ? 'hover:-translate-y-1' : ''}`}
            disabled={!isFormValid}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
