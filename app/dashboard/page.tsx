import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Dashboard: FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login"); // Redirect if not logged in
      } else {
        setUserEmail(user.email ?? null );
      }
    };
    fetchUser();
  }, [navigate]);

  // Logout function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF] text-black">
      <h1 className="text-4xl font-bold text-[#8F87F1]">Dashboard</h1>
      <p className="mt-4 text-lg">Welcome, {userEmail}!</p>

      <div className="mt-8 flex flex-col space-y-4">
        <button
          onClick={() => navigate("/exams")}
          className="px-6 py-3 bg-[#C68EFD] text-white rounded-md hover:bg-[#E9A5F1]"
        >
          View Exams
        </button>
        <button
          onClick={() => navigate("/assignments")}
          className="px-6 py-3 bg-[#E9A5F1] text-white rounded-md hover:bg-[#FED2E2]"
        >
          View Assignments
        </button>
        <button
          onClick={() => navigate("/performance")}
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
