import mongoose, { Document, Schema } from "mongoose";



export interface IScore extends Document{
    userId : mongoose.Types.ObjectId,
    testId: mongoose.Types.ObjectId,
    score : number;
}

const ScoreSchema = new Schema<IScore>(
    {
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    testId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required : true,
    },
    score:{
        type: Number,
        required: true,
    },

},
    {timestamps:true}
);

export const Score = mongoose.model<IScore>("Score", ScoreSchema);