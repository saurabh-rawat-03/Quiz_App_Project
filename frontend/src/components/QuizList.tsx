import React, { useEffect, useState } from "react";
import { IQuiz } from "@/types";
import { api } from "@/utils/axios";
import { Link } from "react-router-dom";

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchQuzzes = async () => {
      try {
        const response = await api.get("/quizzes");

        setQuizzes(response.data);
      } catch (err) {
        console.log("Failed to Fetch Quiz", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuzzes();
  }, []);

  if (loading) return <div> loading.....</div>;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid gap-4">
        {quizzes.map((quiz) => (
          <Link
            key={quiz._id}
            to={`/quiz/${quiz._id}`}
            className="block border rounded p-4 hover:bg-gray-50"
          >
            <h2 className="text-xl font-medium mb-2">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.description}</p>
            <p className="mt-2">
              Questions : {quiz.questions.length} | Duration : {quiz.duration}{" "}
              minutes
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuizList;
