import jwt from "jsonwebtoken"; // run cmd 

// interface IToken{
//     userId : any;
// }
export const getToken = (userId : string) => {
    return jwt.sign({userId} , process.env.JWT_SECRET as string, {
        expiresIn: "24h",
    });
};

export const verifyToken = (token : string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
};