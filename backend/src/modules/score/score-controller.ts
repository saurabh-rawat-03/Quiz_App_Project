import { Request, Response } from "express"
import { Score } from "./score-model";
import { Quiz } from "../quiz/quiz-model";


export const submitScore = async(req : Request, res : Response) => {

    try{
        const {userId, quizId, score} = req.body;
        const quiz = await Quiz.findById(quizId);
        const newScore = await Score.create({ 
            userId, 
            quizId, 
            score, 
            totalQuestions : quiz?.questions.length
        });
        res.status(201).json(newScore);
    }catch(err){
        res.status(500).json({error : "Failed to Submit Score"});
    }

};

export const getQuizScores = async (req : Request, res : Response) => {
    try{
        const {quizId} = req.params;
        const score = await Score.findById({quizId}).populate("userId", "name",
             "email"
            ).sort({completedAt : -1});

        res.status(200).json(score);

    }catch(err){
        res.status(400).json({error : "Failed to fetch quiz score"});
    }
};

export const getUserScores = async (req : Request, res : Response) => {
    try{
        const {userId} = req.params;
        const score = await Score.findById({userId}).populate("quizId", "title",
             "description"
            ).sort({completedAt : -1});

        res.status(200).json(score);

    }catch(err){
        res.status(400).json({error : "Failed to fetch user score"});
    }
};