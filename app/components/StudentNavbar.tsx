import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, User, FileText, ListChecks, Clipboard, LogOut } from "lucide-react";

const StudentNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);
  const toggleExams = () => setExamsOpen(!examsOpen);

  return (
    <nav className="fixed top-0 left-0 h-full bg-[#8F87F1] text-white p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <Link to="/dashboard" className="text-2xl font-bold">Vivace Exams</Link>
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`flex flex-col ${menuOpen ? 'block' : 'hidden'} md:block`}>
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 p-2 hover:text-[#FED2E2]"
        >
          <User size={20} /> <span>Dashboard</span>
        </Link>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={toggleProfile}
            className="flex items-center justify-between w-full p-2 hover:text-[#FED2E2]"
          >
            <div className="flex items-center space-x-2">
              <User size={20} /> <span>Profile</span>
            </div>
            <span>{profileOpen ? '-' : '+'}</span>
          </button>
          {profileOpen && (
            <div className="bg-white text-black shadow-md rounded-md mt-2 p-2 space-y-2">
              <Link to="/student/:id" className="block p-2 hover:bg-gray-200">
                View Profile
              </Link>
              <Link to="/student/:id/edit" className="block p-2 hover:bg-gray-200">
                Edit Profile
              </Link>
            </div>
          )}
        </div>

        {/* Exams Dropdown */}
        <div className="relative">
          <button
            onClick={toggleExams}
            className="flex items-center justify-between w-full p-2 hover:text-[#FED2E2]"
          >
            <div className="flex items-center space-x-2">
              <FileText size={20} /> <span>Exams</span>
            </div>
            <span>{examsOpen ? '-' : '+'}</span>
          </button>
          {examsOpen && (
            <div className="bg-white text-black shadow-md rounded-md mt-2 p-2 space-y-2">
              <Link to="/exams" className="block p-2 hover:bg-gray-200">
                Upcoming Exams
              </Link>
              <Link to="/exams/completed" className="block p-2 hover:bg-gray-200">
                Completed Exams
              </Link>
            </div>
          )}
        </div>

        {/* Results */}
        <Link
          to="/results"
          className="flex items-center space-x-2 p-2 hover:text-[#FED2E2]"
        >
          <ListChecks size={20} /> <span>Results</span>
        </Link>

        {/* Assignments */}
        <Link
          to="/assignments"
          className="flex items-center space-x-2 p-2 hover:text-[#FED2E2]"
        >
          <Clipboard size={20} /> <span>Assignments</span>
        </Link>

        {/* Logout */}
        <button className="flex items-center space-x-2 p-2 hover:text-red-400 w-full text-left">
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
