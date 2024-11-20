import mongoose, { Document, Schema } from "mongoose";

export interface IScore extends Document{
    userId : mongoose.Types.ObjectId;
    quizId: mongoose.Types.ObjectId;
    score : number;
    totalQuestions : number;
    completedAt : Date;
}

const ScoreSchema = new Schema<IScore>(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        quizId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Test",
            required : true,
        },
        score:{
            type: Number,
            required: true,
        },
        totalQuestions : {
            type : Number,
            required : true,
        },
        completedAt: {
            type : Date,
            default : Date.now(),
        },

    },
    {timestamps:true}
);

export const Score = mongoose.model<IScore>("Score", ScoreSchema);