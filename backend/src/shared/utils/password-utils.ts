import bcrypt from "bcrypt";


export const hashPassword = async (password : string) => {
    return await bcrypt.hash(password, 8);
};

export const verifyPassword = async (password : string, hashedPassword : string) => {
    return await bcrypt.compare(password, hashedPassword);
}