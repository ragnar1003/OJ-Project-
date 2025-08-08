import { Link } from "react-router-dom";

import createAccountImage from "./assets/create-account-6333606-5230166.png"; 

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500 mb-6 leading-tight">
          Welcome to Algobaazi
        </h1>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Hone your coding skills, solve challenging problems, and compete with a community of developers. Whether you're a beginner or a pro, Algobaazi is your playground for algorithmic excellence.
        </p>

        
        <div className="flex items-center justify-center bg-gray-800/50 rounded-2xl p-10 mb-12 shadow-lg">
         
          <div className="flex-1 text-left pr-10">
            <h2 className="text-3xl font-bold mb-4">Create Your Account</h2>
            <p className="text-gray-300 mb-6">
              Sign up to track your progress, save your solutions, and get personalized AI-powered feedback to improve your code.
            </p>
            <Link 
              to="/register"
              className="inline-block bg-indigo-500 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-indigo-600 transition-transform transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </div>
          
          
          <div className="flex-1">
            <img 
              src={createAccountImage} 
              alt="Coder working on a laptop"
              className="w-full max-w-sm mx-auto"
            />
          </div>
        </div>

        
        <div className="flex justify-center space-x-6">
          <Link
            to="/problems"
            className="bg-indigo-600/80 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-indigo-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            View Problems
          </Link>
          <Link
            to="/compiler"
            className="bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-600 transition-transform transform hover:scale-105 shadow-lg"
          >
            Go to Compiler
          </Link>
        </div>
      </div>
    </div>
  );
}