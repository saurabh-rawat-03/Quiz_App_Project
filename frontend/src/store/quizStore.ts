import { IQuiz } from "@/types";
import { api } from "@/utils/axios";

import { create } from "zustand";

interface IQuizState{
    currentQuiz : IQuiz | null;
    userAnswers : number[];
    loadQuiz : (quizId : string) => Promise<void>;
    setAnswer : (questionIndex : number, answer : number) => void;
    submitQuiz : () => Promise<void>;
}

export const useQuizStore = create<IQuizState>((set, get) => ({
    currentQuiz : null,
    userAnswers : [],
    loadQuiz : async (quizId) => {
        const response = await api.get('/api/quizzes/${quizId}');
        const quiz = response.data;
        set({
            currentQuiz : quiz,
            userAnswers : new Array(quiz.questions.length).fill(-1),
        });
    },
    setAnswer : (questionIndex, answer) => {
        const userAnswers = [...get().userAnswers];
        userAnswers[questionIndex] = answer;
        set({userAnswers});
    },

    submitQuiz : async() => {
        const {currentQuiz, userAnswers} = get();
        if(!currentQuiz) return;
        await api.post('quizzes/submit', {
            quizId : currentQuiz._id,
            answers : userAnswers,
        });
    },
}));