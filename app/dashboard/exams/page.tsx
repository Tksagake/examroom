import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function ExamsDashboard() {
  const [exams, setExams] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchExams = async () => {
      const { data, error } = await supabase.from("exams").select("id, title, date");
      if (error) console.error("Error fetching exams:", error);
      else setExams(data);
    };

    fetchExams();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Exams</h1>
      <button
        onClick={() => router.push("/dashboard/exams/create")}
        className="bg-purple-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Create Exam
      </button>
      <ul>
        {exams.map((exam) => (
          <li key={exam.id} className="p-4 bg-purple-100 rounded-lg mb-2">
            <span className="font-semibold">{exam.title}</span> - {exam.date}
            <button
              onClick={() => router.push(`/dashboard/exams/${exam.id}/admin`)}
              className="ml-4 text-blue-500"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
