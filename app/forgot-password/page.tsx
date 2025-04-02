"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const ForgotPasswordPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setMessage("Error sending reset email: " + error.message);
    } else {
      setMessage("Password reset email sent. Check your inbox.");
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
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-2xl font-bold text-[#4C1D95]">Forgot Password</h1>
        </div>

        <h3 className="text-2xl font-bold text-[#4C1D95] text-center mb-6">Enter your email so we can send you a reset link</h3>
        {message && <p className="mt-2 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#C4B5FD] text-white rounded-md hover:bg-[#6F67A8] transition-colors"
            disabled={loading}
          >
            {loading ? "Sending..." : "Request Sent"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
