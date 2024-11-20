// import { Jwt } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt-utils";

interface JwtPayload {
    userId : string;
    email? : string;
    
}

declare global{
    namespace Express{
        interface Request{
            user : JwtPayload;
        }
    }
}

export const auth = (req : Request, res : Response, next : NextFunction) => {
    try{
        const token = req.header("Authorization")?.replace("Bearer", "");
        
        if(!token) throw new Error();

        const decoded = verifyToken(token) as JwtPayload;
        req.user = decoded;
        next();

    }catch(err){
        res.status(401).json({error : "Please Authenticate"});
    }
};
