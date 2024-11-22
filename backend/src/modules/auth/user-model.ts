import mongoose, { Document, mongo, Schema } from "mongoose";


export interface IUser extends Document{
    _id : string,
    name : string, 
    email : string,
    password : string,
    college? : string,
    attemptedQuiz :  [{
        quizId : {type : mongoose.Schema.Types.ObjectId};
        score : Number;
        totalQuestions : Number;
        completedAt : Date;
    }]

}

const userSchema : Schema<IUser> = new Schema(
    {

        name:{
            type : String,
            required : true,
        },
        email:{
            type : String,
            unique : true,
            required : true,
        },
        password:{
            type : String,
            required : true,
        },
        college : {
            type : String,
        },
        attemptedQuiz : [{
            quizId : {type : mongoose.Schema.Types.ObjectId},
            score : Number,
            totalQuestions : Number,
            completedAt : Date,
        }]
    },
        {timestamps : true}
    
);

const User = mongoose.model<IUser>("user",userSchema);
export default User;    