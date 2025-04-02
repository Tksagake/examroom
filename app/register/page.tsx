"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const RegisterPage: FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Validate all fields
  const validateForm = () => {
    if (!formData.email.includes("@")) {
      return "Valid email is required";
    }
    if (formData.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }
    if (formData.fullName.length < 2) {
      return "Full name is required";
    }
    return null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.user?.identities?.length === 0) {
        throw new Error("User already registered");
      }

      setMessage("Check your email for the confirmation link!");
      setFormData({ email: "", password: "", confirmPassword: "", fullName: "" });

    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FED2E2] to-[#E9A5F1]">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-md w-full">
      <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Vivace Logo" className="w-32 h-28 object-contain" />
          <h2 className="text-3xl font-bold text-[#4C1D95] ml-4">VivaceKenya Exam Portal</h2>
        </div>
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-bold text-[#4C1D95]">Create an Account</h1>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#4C1D95] mb-1">
              Full Name
            </label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-white/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C1D95] mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-white/20"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C1D95] mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-white/20"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4C1D95] mb-1">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md bg-white/20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#7C3AED] text-white rounded-md hover:bg-[#6D28D9] disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>

        <div className="my-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white/10 text-[#4C1D95]">OR</span>
          </div>
        </div>

        <div className="grid gap-3">
          <button
            onClick={() => handleOAuthLogin("google")}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-white text-gray-700 rounded-md border hover:bg-gray-50"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          <button
            onClick={() => handleOAuthLogin("github")}
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 py-2 px-4 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            <GitHubIcon />
            Continue with GitHub
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-[#6D28D9]">
          Already have an account?{" "}
          <a href="/login" className="font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

// SVG Components
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export default RegisterPage;