

export interface IUser{
    _id : string;
    email : string;
    name : string;
    
}

export interface IQuiz{
    _id : string;
    title : string;
    description : string;
    questions : Question[];
    duration : number;
}

export interface Question{
    _id : string;
    text : string;
    options : string[];
    correctOption : number;
    points : number;
}

export interface QuizAttempt{
    quizId : string;
    score : string;
    totalQuestions : number;
    completedAt : Date;
}