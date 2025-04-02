"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Shield, BookOpen, Cog, Activity } from 'lucide-react';

const LandingPage = () => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const features = [
    { title: 'Access Exams Anytime', icon: BookOpen, description: 'Convenient access to your exams and assignments.' },
    { title: 'Track Your Progress', icon: Shield, description: 'Monitor your performance and improvements over time.' },
    { title: 'Manage Assignments', icon: Users, description: 'Efficiently handle your assignments and submissions.' },
    { title: 'Customizable Dashboard', icon: Cog, description: 'Tailor your dashboard to suit your needs.' },
    { title: 'Unlimited Access', icon: Activity, description: 'Access your exams and assignments from anywhere.' },
  ];

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar - Fixed with high z-index */}
      <nav className="bg-white dark:bg-purple-400 text-[#6F67A8] dark:text-gray-200 p-4 flex justify-between items-center shadow-lg w-full fixed top-0 left-0 z-50 h-20">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Vivace Logo" className="w-32 h-12 object-contain" />
        </div>
        <div className="space-x-4 flex items-center">
          <button
            onClick={() => router.push("/login")}
            className="bg-[#a796cb] dark:bg-purple-950 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#957da3] dark:hover:bg-[#E9A5F1] transition-colors"
          >
            Log In
          </button>
          <button
            onClick={() => router.push("/register")}
            className="bg-[#6F67A8] dark:bg-purple-950 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#5F5798] dark:hover:bg-[#FED2E2] transition-colors"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section - Adjusted for navbar height */}
      <header className="bg-[#6F67A8] dark:bg-gray-800 text-white pt-24 pb-20 relative mt-20"> {/* Added mt-20 and adjusted pt-24 */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjB0aGVvcnl8ZW58MHx8MHx8fDA%3D"
            alt="Music"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to VivaceKenya Exam Portal</h1>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Get access to your exams, assignments, and progress tracking.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-[#C68EFD] dark:bg-[#957da3] text-[#6F67A8] dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
          >
            Log In
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#6F67A8] dark:text-gray-200">Our Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 border rounded-lg hover:shadow-lg transition duration-300 bg-gray-100 dark:bg-gray-800">
                <feature.icon className="h-12 w-12 text-[#957da3] dark:text-[#C68EFD] mb-4 mx-auto" />
                <h3 className="text-2xl font-semibold mb-2 text-[#6F67A8] dark:text-gray-200 text-center">{feature.title}</h3>
                <p className="text-gray-700 dark:text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#6F67A8] dark:bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Vivace Exams</h3>
              <p className="text-gray-300">Empowering Students. Enhancing Learning.</p>
            </div>
            <div>
              <h3 className="font-semibold text-xl mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/exams" className="text-gray-300 hover:text-[#957da3] dark:hover:text-[#C68EFD] transition-colors">Exams</a></li>
                <li><a href="/about" className="text-gray-300 hover:text-[#957da3] dark:hover:text-[#C68EFD] transition-colors">About Us</a></li>
                <li><a href="/contact" className="text-gray-300 hover:text-[#957da3] dark:hover:text-[#C68EFD] transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="text-gray-300">info@vivaceke.co.ke</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-300">+254-702-501-135</span>
                </li>
                <li className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-300">Giwa House, Moi Avenue, Nairobi</span>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-[#957da3] dark:hover:text-[#C68EFD] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-[#957da3] dark:hover:text-[#C68EFD] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-300 hover:text-[#957da3] dark:hover:text-[#C68EFD] transition">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">© 2025 Vivace Exams. All rights reserved. Powered by DiversiWorks Times Group.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;