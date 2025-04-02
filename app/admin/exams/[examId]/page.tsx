"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Question {
  id: string;
  question_text: string;
  question_type: "multiple_choice" | "short_answer" | "notation";
  options?: string[]; // Only for multiple-choice
  correct_answer: string;
}

export default function ExamAdmin({ params }: { params: { examId: string } }) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: "",
    question_text: "",
    question_type: "multiple_choice",
    options: [],
    correct_answer: "",
  });

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("exam_id", params.examId);

      if (error) console.error("Error fetching questions:", error);
      else setQuestions(data);
    }
    fetchQuestions();
  }, [params.examId]);

  const handleAddQuestion = async () => {
    const { data, error } = await supabase
      .from("questions")
      .insert([{ ...newQuestion, exam_id: params.examId }])
      .select();

    if (error) console.error("Error adding question:", error);
    else setQuestions([...questions, ...data]);

    setNewQuestion({
      id: "",
      question_text: "",
      question_type: "multiple_choice",
      options: [],
      correct_answer: "",
    });
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold">Manage Exam Questions</h1>

      {/* Existing Questions */}
      {questions.map((q) => (
        <div key={q.id} className="mt-4 p-3 border rounded">
          <p><strong>Question:</strong> {q.question_text}</p>
          <p><strong>Type:</strong> {q.question_type}</p>
          {q.question_type === "multiple_choice" && (
            <p><strong>Options:</strong> {q.options?.join(", ")}</p>
          )}
        </div>
      ))}

      {/* Add New Question */}
      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter question..."
          value={newQuestion.question_text}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question_text: e.target.value })
          }
          className="border p-2 w-full rounded"
        />
        <select
          value={newQuestion.question_type}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              question_type: e.target.value as Question["question_type"],
            })
          }
          className="border p-2 w-full rounded mt-2"
        >
          <option value="multiple_choice">Multiple Choice</option>
          <option value="short_answer">Short Answer</option>
          <option value="notation">Music Notation</option>
        </select>

        {/* Options for Multiple Choice */}
        {newQuestion.question_type === "multiple_choice" && (
          <textarea
            placeholder="Enter options, separated by commas..."
            onChange={(e) =>
              setNewQuestion({
                ...newQuestion,
                options: e.target.value.split(",").map((opt) => opt.trim()),
              })
            }
            className="border p-2 w-full rounded mt-2"
          />
        )}

        <input
          type="text"
          placeholder="Correct answer"
          value={newQuestion.correct_answer}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, correct_answer: e.target.value })
          }
          className="border p-2 w-full rounded mt-2"
        />

        <button
          onClick={handleAddQuestion}
          className="bg-purple-500 text-white px-4 py-2 rounded mt-3"
        >
          Add Question
        </button>
      </div>
    </div>
  );
}
