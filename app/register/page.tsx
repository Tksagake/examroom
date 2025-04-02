"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const RegisterPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      alert("Registration successful! Check your email for verification.");
      router.push("/login"); // Redirect after sign-up
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#FED2E2] to-[#E9A5F1] text-white">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Vivace Logo" className="w-32 h-28 object-contain" />
          <h2 className="text-3xl font-bold text-[#4C1D95] ml-4">VivaceKenya Exam Portal</h2>
        </div>
        {error && <p className="mt-2 text-red-600 text-center">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-white/20 text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              required
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password (6+ characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-white/20 text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              minLength={6}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] text-white rounded-md hover:bg-[#6F67A8] transition-colors"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-[#6D28D9]">
          Already have an account? <a href="/login" className="hover:underline">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
