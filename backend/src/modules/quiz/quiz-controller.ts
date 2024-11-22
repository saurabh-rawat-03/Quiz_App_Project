import { Request, Response } from "express"
import { Quiz } from "./quiz-model";
import User from "../auth/user-model";
import { Score } from "../score/score-model";

export const getAllQuizzes = async (req : Request, res : Response) =>{
    try{
        const quizzes = await Quiz.find({});
        res.status(200).json(quizzes);
    }catch(err){
        // logger("Error in");
        res.status(5001).json({error : "Failed to fetch Quizzes"});
    }
};

export const createQuiz = async (req : Request, res : Response)=>{
    try{
        const quiz = new Quiz(...req.body);
        await quiz.save();
        res.status(201).json({quiz, message : "Created Successfully"});
    }catch(err){
        res.status(400).json({error : "Failed to create quiz"});

    }
};

export const getQuiz = async (req : Request, res : Response) => {
    try{
        const {id} = req.params;
        const quiz = await Quiz.findById(id);

        if(!quiz) throw new Error();

        res.status(200).json({quiz});
    }catch(err){
        res.status(404).json({error : "Quiz Not Found"});
    }
};

export const submitQuiz = async (req : Request, res : Response) => {
    try{
        const {quizId, answers} = req.body;
        const quiz = await Quiz.findById(quizId);

        if(!quiz) throw new Error("Quiz Not Found");

        let score = 0;

        answers.forEach((answer : number, index : number) =>{
            if(answer == quiz.questions[index].correctOption){
                score += quiz.questions[index].points;
            }
        });

        const user = await User.findById(req.user.userId);

        if(!user) throw new Error("User Not Found");

        const newScore = new Score({
            userId : user._id,
            quizId : quiz._id,
            score,
            totalQuestions: quiz.questions.length.toFixed,
        });

        await newScore.save();

        user.attemptedQuiz.push({
            quizId,
            score,
            totalQuestions : quiz.questions.length,
            completedAt : new Date(),
        });

        await user.save();

        res.json({score, totalQuestions: quiz.questions.length});

    }catch(err){
        res.status(400).json({error : "Failed To Submit Quiz"});
    }
};
