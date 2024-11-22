import { useQuizStore } from "@/store/quizStore";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Quiz: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { currentQuiz, loadQuiz, setAnswer, submitQuiz, userAnswers } =
    useQuizStore();
  useEffect(() => {
    if (quizId) {
      loadQuiz(quizId);
    }
  }, [quizId]);

  if (!currentQuiz) return <div> Loading ....</div>;

  const handleSubmit = async () => {
    await submitQuiz();
    navigate("/score/${quizId}");
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">{currentQuiz.title}</h1>
      <div className="space-y-6">
        {currentQuiz.questions.map((question, questionIndex) => (
          <div className="border rounded p-4" key={question._id}>
            <p className="font-medium mb-2">{question.text}</p>
            <div className="space-y-2">
              {question.options.map((option, optionIndex) => (
                <label key={optionIndex} className="block">
                  <input
                    type="radio"
                    name={`question=${questionIndex}`}
                    checked={userAnswers[questionIndex] == optionIndex}
                    onChange={() => setAnswer(questionIndex, optionIndex)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-bluee-500 text-white rounded p-2 w-full"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default Quiz;
