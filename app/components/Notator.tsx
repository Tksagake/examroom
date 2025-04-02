import { useEffect, useState, ChangeEvent } from "react";
import ABCJS from "abcjs";

interface MusicNotationInputProps {
  questionId: string; // or number, depending on what questionId is
  handleAnswerChange: (questionId: string, notation: string) => void;
}

export default function MusicNotationInput({
  questionId,
  handleAnswerChange,
}: MusicNotationInputProps) {
  const [notation, setNotation] = useState("");

  useEffect(() => {
    ABCJS.renderAbc("notation-preview", notation);
  }, [notation]);

  return (
    <div className="mt-4">
      <textarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setNotation(e.target.value);
          handleAnswerChange(questionId, e.target.value);
        }}
        className="border p-2 w-full rounded"
        placeholder="Enter ABC notation..."
      />
      <div id="notation-preview" className="border p-4 mt-2"></div>
    </div>
  );
}
