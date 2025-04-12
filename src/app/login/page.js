'use client';

import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-center text-gray-400 font-bold mb-4">Login</h2>

        {/* Google Sign-In Button */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}

          className="w-full p-3 bg-red-500 text-white rounded-lg mt-4"
        >
          Continue with Google
        </button>

        {/* GitHub Sign-In Button */}
        <button
          onClick={() => signIn('github', {callbackUrl:'/'})}
          className="w-full p-3 bg-gray-800 text-white rounded-lg mt-4"
        >
          Continue with GitHub
        </button>

       
      </div>
    </div>
  );
};

export default Login;
