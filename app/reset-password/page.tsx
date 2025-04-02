"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

const ResetPasswordPage: FC = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setMessage("Error resetting password: " + error.message);
    } else {
      setMessage("Password reset successfully. You can now log in.");
      router.push("/login");
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
          <h1 className="text-2xl font-bold text-[#4C1D95]">Reset Password</h1>
        </div>
        {message && <p className="mt-2 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-md bg-white/20 text-[#4C1D95] focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              minLength={6}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4C1D95]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "Resetting password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
