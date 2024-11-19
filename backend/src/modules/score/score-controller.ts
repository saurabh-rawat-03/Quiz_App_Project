import { Request, Response } from "express"
import { Score } from "./score-model";


export const submitScore = async(req : Request, res : Response) => {

    try{
        const {userId, testId, score} = req.body;
        const newScore = await Score.create({ userId, testId, score});
        res.status(201).json(newScore);
    }catch(err){
        res.status(500).json({error : "Failed to Submit Score"});
    }

};