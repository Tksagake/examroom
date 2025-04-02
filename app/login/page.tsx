"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const LoginPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      // Fetch user role from Supabase
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single();

      if (userError) {
        setError(userError.message);
        setLoading(false);
        return;
      }

      if (userData?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/dashboard");
      }
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#E9A5F1] to-[#8F87F1] text-white">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="Vivace Logo" className="w-32 h-28 object-contain" />
          <h2 className="text-3xl font-bold text-[#4C1D95] ml-4">VivaceKenya Exam Portal</h2>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-white/20 text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-white/20 text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] text-white rounded-md hover:bg-[#6F67A8] transition-colors"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </form>
        <p className="mt-4 text-center text-[#6D28D9]">
          <a href="/forgot-password" className="hover:underline">Forgot your password?</a>
        </p>
        <p className="mt-4 text-center text-[#6D28D9]">
          Don&apos;t have an account?{" "}
          <a href="/register" className="hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
