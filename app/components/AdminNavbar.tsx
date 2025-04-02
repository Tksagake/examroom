import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useState } from 'react';
import {
  Menu,
  X,
  FileText,
  Clipboard,
  Users,
  Settings,
  LogOut,
} from 'lucide-react';

const AdminNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [examsOpen, setExamsOpen] = useState(false);
  const [assignmentsOpen, setAssignmentsOpen] = useState(false);
  const [usersOpen, setUsersOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleExams = () => setExamsOpen(!examsOpen);
  const toggleAssignments = () => setAssignmentsOpen(!assignmentsOpen);
  const toggleUsers = () => setUsersOpen(!usersOpen);

  return (
    <nav className="fixed top-0 left-0 h-full bg-[#C68EFD] text-white p-4 w-64">
      <div className="flex justify-between items-center mb-4">
        <Link to="/admin/dashboard" className="text-2xl font-bold">
          Admin Panel
        </Link>
        <button onClick={toggleMenu} className="md:hidden">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div className={`flex flex-col ${menuOpen ? 'block' : 'hidden'} md:block`}>
        <Link
          to="/admin/dashboard"
          className="flex items-center space-x-2 p-2 hover:text-[#FED2E2]"
        >
          <FileText size={20} /> <span>Dashboard</span>
        </Link>

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
              <Link to="/admin/exams" className="block p-2 hover:bg-gray-200">
                Manage Exams
              </Link>
              <Link
                to="/admin/exams/create"
                className="block p-2 hover:bg-gray-200"
              >
                Create Exam
              </Link>
              <Link
                to="/admin/exams/grade"
                className="block p-2 hover:bg-gray-200"
              >
                Grade Exams
              </Link>
            </div>
          )}
        </div>

        {/* Assignments Dropdown */}
        <div className="relative">
          <button
            onClick={toggleAssignments}
            className="flex items-center justify-between w-full p-2 hover:text-[#FED2E2]"
          >
            <div className="flex items-center space-x-2">
              <Clipboard size={20} /> <span>Assignments</span>
            </div>
            <span>{assignmentsOpen ? '-' : '+'}</span>
          </button>
          {assignmentsOpen && (
            <div className="bg-white text-black shadow-md rounded-md mt-2 p-2 space-y-2">
              <Link
                to="/admin/assignments"
                className="block p-2 hover:bg-gray-200"
              >
                View Assignments
              </Link>
              <Link
                to="/admin/assignments/grade"
                className="block p-2 hover:bg-gray-200"
              >
                Grade Assignments
              </Link>
              <Link
                to="/admin/assignments/create"
                className="block p-2 hover:bg-gray-200"
              >
                Create Assignment
              </Link>
            </div>
          )}
        </div>

        {/* Users Dropdown */}
        <div className="relative">
          <button
            onClick={toggleUsers}
            className="flex items-center justify-between w-full p-2 hover:text-[#FED2E2]"
          >
            <div className="flex items-center space-x-2">
              <Users size={20} /> <span>Users</span>
            </div>
            <span>{usersOpen ? '-' : '+'}</span>
          </button>
          {usersOpen && (
            <div className="bg-white text-black shadow-md rounded-md mt-2 p-2 space-y-2">
              <Link to="/admin/users" className="block p-2 hover:bg-gray-200">
                Manage Users
              </Link>
              <Link
                to="/admin/users/edit"
                className="block p-2 hover:bg-gray-200"
              >
                Edit Users
              </Link>
            </div>
          )}
        </div>

        {/* Settings */}
        <Link
          to="/admin/settings"
          className="flex items-center space-x-2 p-2 hover:text-[#FED2E2]"
        >
          <Settings size={20} /> <span>Settings</span>
        </Link>

        {/* Logout */}
        <button className="flex items-center space-x-2 p-2 hover:text-red-400 w-full text-left">
          <LogOut size={20} /> <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

const App = () => (
  <Router>
    <AdminNavbar />
    <div className="ml-64 p-4">
      {/* Other components and main content */}
    </div>
  </Router>
);

export default App;
