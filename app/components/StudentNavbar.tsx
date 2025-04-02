"use client";

import { useState } from "react";
import { Menu, X, ChevronDown, FileText, FileCheck, BarChart, Download } from "lucide-react";
import { supabase } from "../lib/supabase";
import router from "next/router";

type DropdownState = {
  exams: boolean;
  assignments: boolean;
  reports: boolean;
};

export default function Sidebar() {
  const [dropdown, setDropdown] = useState<DropdownState>({
    exams: false,
    assignments: false,
    reports: false,
  });

  // Toggle dropdown state
  const toggleDropdown = (category: keyof DropdownState) => {
    setDropdown((prevState) => ({
      ...prevState,
      [category]: !prevState[category],
    }));
  };

  const handleLogout = async () => {
      await supabase.auth.signOut();
      router.push("/login");
    };

  return (
    <nav className="bg-purple-600 text-white w-64 h-full p-4 shadow-md fixed top-0 left-0 z-50">
      {/* Logo */}
      <a href="/dashboard" className="text-xl font-bold mb-8 block">
        Vivace Exams
      </a>

      {/* Menu Items */}
      <div className="space-y-4">
        {/* Dashboard Link */}
        <a href="/dashboard" className="flex items-center space-x-2 hover:text-gray-200">
          <Menu size={20} />
          <span>Dashboard</span>
        </a>

        {/* Exams Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("exams")}
            className="flex items-center space-x-2 w-full text-left hover:text-gray-200"
          >
            <FileText size={20} />
            <span>Exams</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {dropdown.exams && (
            <div className="absolute bg-purple-700 p-2 mt-2 rounded-lg space-y-2 w-full z-40">
              <a href="/dashboard/exams" className="block hover:text-gray-200">All Exams</a>
              <a href="/dashboard/exams/upcoming" className="block hover:text-gray-200">Upcoming Exams</a>
              <a href="/dashboard/exams/[examId]" className="block hover:text-gray-200">Exam Details</a>
              <a href="/dashboard/exams/[examId]/result" className="block hover:text-gray-200">Exam Results</a>
              <a href="/dashboard/exams/allresults" className="block hover:text-gray-200">All Results</a>
            </div>
          )}
        </div>

        {/* Assignments Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("assignments")}
            className="flex items-center space-x-2 w-full text-left hover:text-gray-200"
          >
            <FileCheck size={20} />
            <span>Assignments</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {dropdown.assignments && (
            <div className="absolute bg-purple-700 p-2 mt-2 rounded-lg space-y-2 w-full z-40">
              <a href="/dashboard/assignments" className="block hover:text-gray-200">All Assignments</a>
              <a href="/dashboard/assignments/submitted" className="block hover:text-gray-200">Submitted</a>
              <a href="/dashboard/assignments/overdue" className="block hover:text-gray-200">Overdue</a>
              <a href="/dashboard/assignments/[assignmentId]/feedback" className="block hover:text-gray-200">Feedback</a>
            </div>
          )}
        </div>

        {/* Reports Dropdown */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("reports")}
            className="flex items-center space-x-2 w-full text-left hover:text-gray-200"
          >
            <BarChart size={20} />
            <span>Reports</span>
            <ChevronDown size={16} className="ml-1" />
          </button>
          {dropdown.reports && (
            <div className="absolute bg-purple-700 p-2 mt-2 rounded-lg space-y-2 w-full z-40">
              <a href="/dashboard/reports" className="block hover:text-gray-200">All Reports</a>
              <a href="/dashboard/reports/performance" className="block hover:text-gray-200">Performance</a>
              <a href="/dashboard/reports/[reportId]" className="block hover:text-gray-200">Report Details</a>
              <a href="/dashboard/reports/download" className="block hover:text-gray-200">Download Report</a>
            </div>
          )}
        </div>

        {/* Logout Link */}
        <button
          onClick={handleLogout}
          className="mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-800"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
