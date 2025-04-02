"use client";

import { FC, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import StudentNavBar from "../components/StudentNavbar";

const Dashboard: FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // Check if the user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login"); // Redirect if not logged in
      } else {
        setUserEmail(user.email ?? null);
      }
    };
    fetchUser();
  }, [router]);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF] text-black">
      <h1 className="text-4xl font-bold text-[#8F87F1]">Dashboard</h1>
      <StudentNavBar />
      <p className="mt-4 text-lg">Welcome, {userEmail}!</p>

      <div className="mt-8 flex flex-col space-y-4">
        <button
          onClick={() => router.push("/exams")}
          className="px-6 py-3 bg-[#C68EFD] text-white rounded-md hover:bg-[#E9A5F1]"
        >
          View Exams
        </button>
        <button
          onClick={() => router.push("/assignments")}
          className="px-6 py-3 bg-[#E9A5F1] text-white rounded-md hover:bg-[#FED2E2]"
        >
          View Assignments
        </button>
        <button
          onClick={() => router.push("/performance")}
          className="px-6 py-3 bg-[#FED2E2] text-black rounded-md hover:bg-[#C68EFD]"
        >
          View Performance Report
        </button>
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-800"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
