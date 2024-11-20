import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document{
    _id : string,
    name : string, 
    email : string,
    password : string,
    college? : string,

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
    },
        {timestamps : true}
    
);

const User = mongoose.model<IUser>("user",userSchema);
export default User;    