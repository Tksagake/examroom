import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../lib/supabase";
import MusicNotationInput from "./Notator";

interface Question {
  id: number;
  question_text: string;
  question_type: "multiple_choice" | "short_answer" | "notation";
  options?: string[];
}

export default function ExamPage() {
  const [exam, setExam] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { examId } = router.query;

  useEffect(() => {
    if (!examId) return;

    const fetchExamDetails = async () => {
      // Fetch exam metadata
      const { data: examData, error: examError } = await supabase
        .from("exams")
        .select("*")
        .eq("id", examId)
        .single();

      if (examError) console.error("Error fetching exam:", examError);
      else setExam(examData);

      // Fetch questions
      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .select("*")
        .eq("exam_id", examId);

      if (questionError) console.error("Error fetching questions:", questionError);
      else setQuestions(questionData);

      setLoading(false);
    };

    fetchExamDetails();
  }, [examId]);

  const handleAnswerChange = (questionId: string, answer: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async () => {
    console.log("Responses:", responses);
    alert("Exam submitted! (DB storage will be implemented)");
  };

  return (
    <div className="p-6">
      {loading ? (
        <p>Loading exam...</p>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-xl font-bold mb-4">{exam.name}</h1>

          {questions.map((question) => (
            <div key={question.id} className="mb-6">
              <p className="font-semibold">{question.question_text}</p>

              {question.question_type === "multiple_choice" && (
                <div>
                  {question.options?.map((option, idx) => (
                    <label key={idx} className="block">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        onChange={(e) => handleAnswerChange(question.id.toString(), e.target.value)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {question.question_type === "short_answer" && (
                <textarea
                  onChange={(e) => handleAnswerChange(question.id.toString(), e.target.value)}
                  className="border p-2 w-full rounded mt-2"
                  placeholder="Your answer..."
                />
              )}

              {question.question_type === "notation" && (
                <MusicNotationInput
                  questionId={question.id.toString()}
                  handleAnswerChange={handleAnswerChange}
                />
              )}
            </div>
          ))}

          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit Exam
          </button>
        </div>
      )}
    </div>
  );
}
