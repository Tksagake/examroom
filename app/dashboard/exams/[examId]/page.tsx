"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  const router = useRouter();
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    async function fetchExam() {
      const { data: examData, error: examError } = await supabase
        .from("exams")
        .select("*")
        .eq("id", examId)
        .single();

      if (examError) {
        console.error(examError);
        return;
      }
      setExam(examData);

      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .select("*")
        .eq("exam_id", examId);

      if (questionError) {
        console.error(questionError);
        return;
      }
      setQuestions(questionData);
      setLoading(false);
    }

    fetchExam();
  }, [examId]);

  function handleAnswerChange(questionId: string, answer: string) {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }

  async function handleSubmit() {
    const entries = Object.entries(answers).map(([questionId, answer]) => ({
      user_id: "user-id-from-auth", // Replace with actual user ID
      exam_id: examId,
      question_id: questionId,
      answer,
    }));

    const { error } = await supabase.from("student_responses").insert(entries);
    if (error) {
      console.error("Submission Error:", error);
    } else {
      alert("Exam submitted successfully!");
      router.push("/dashboard/exams");
    }
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">{exam.title}</h1>
      <p className="text-gray-700">{exam.instructions}</p>

      {!isStarted ? (
        <button
          onClick={() => setIsStarted(true)}
          className="bg-purple-600 text-white px-4 py-2 mt-4 rounded"
        >
          Start Attempt
        </button>
      ) : (
        <>
          {questions.map((question) => (
            <div key={question.id} className="my-4 p-4 border rounded">
              <p className="font-semibold">{question.question_text}</p>

              {question.question_type === "mcq" && (
                <select
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="border p-2 rounded w-full"
                >
                  {question.options.map((option: string, index: number) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {question.question_type === "short_answer" && (
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
              )}

              {question.question_type === "music_notation" && (
                <textarea
                  className="border p-2 rounded w-full"
                  placeholder="Write music notation here"
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
              )}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Submit Exam
          </button>
        </>
      )}
    </div>
  );
}
