import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const Navbar: FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/login");
        return;
      }

      // Fetch user role from Supabase (assuming it's stored in "profiles" table)
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!error && data) setUserRole(data.role);
    };

    fetchUserRole();
  }, [navigate]);

  return (
    <nav className="bg-[#8F87F1] text-white p-4 flex justify-between items-center">
      <Link to="/dashboard" className="text-2xl font-bold">Vivace Exams</Link>

      <div className="flex space-x-4">
        <Link to="/exams" className="hover:text-[#FED2E2]">Exams</Link>
        <Link to="/assignments" className="hover:text-[#FED2E2]">Assignments</Link>
        <Link to="/results" className="hover:text-[#FED2E2]">Results</Link>
        {userRole === "admin" && (
          <>
            <Link to="/admin/exams" className="hover:text-[#FED2E2]">Manage Exams</Link>
            <Link to="/admin/assignments" className="hover:text-[#FED2E2]">Manage Assignments</Link>
            <Link to="/admin/users" className="hover:text-[#FED2E2]">Manage Users</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
