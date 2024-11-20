import { Request, Response } from "express";
import User  from "./user-model";
import { getToken } from "../../shared/utils/jwt-utils";
import { hashPassword, verifyPassword } from "../../shared/utils/password-utils";

export const registerUser = async( req : Request, res : Response) => {
    try{
        const {email, password, name, college} = req.body;

        const exists = await User.findOne({email});

        if(exists){
            return res.status(300).json({message : "User Already Exists"});
        }
        const hashedPassword = await hashPassword(password);

        const user = await User.create({email, password: hashedPassword, name, college});
        const token = getToken(user._id);

        res.status(201).json({msg : "Registration Successful ", user, token});

    }catch(err){

        res.status(500).json({error : "Registration Failed"});
    }
}

export const loginUser = async (req : Request, res : Response) => {
    try{
        const {email, password} =req.body;
        const user = await User.findOne({email});

        if(!user || !(await verifyPassword(password, user.password))){
            return res.status(401).json({message : "Invalid Credentials"});
        }

        const token = getToken(user._id);
        res.status(200).json({message : "Login Successfully", token : token});


    }catch(err){
        return res.status(500).json({error : "Login Failed" , err});
    }
}