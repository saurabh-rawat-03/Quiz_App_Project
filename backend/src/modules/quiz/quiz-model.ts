
import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
   { title : {
        type : String,
        required : true,
        
    },
    description: {
        type : String,
        required: true
    },
    questions : [
        {
            text : {type : String, required : true},
            options: [{type : String, required : true}],
            correctOption : {type : Number, required : true},
            points: {type : Number, required : true, default : 1},
        },
    ],
    duration : {
        type : Number,
        required : true,
    },
});


export const Quiz = mongoose.model("quiz", quizSchema);