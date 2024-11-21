import { IUser } from "@/types";
import { api } from "@/utils/axios";
import { create } from "zustand";

interface IAuthState{
    user : IUser | null;
    token : string | null;
    login : (email : string, password : string) => Promise<void>;
    register : (email : string, password : string, name : string) => Promise<void>;
    logout : () => void;
}

export const useAuthStore = create<IAuthState>((set, get) => ({
    user : null,
    token : localStorage.getItem("token"),
    login : async (email, password) => {
        const response = await api.post('/api/users/login', {email, password});
        const {user, token} = response.data;
        localStorage.setItem("token", token);
        set({user, token});
        
    },
    register : async (email, password, name) => {
        const response = await api.post('/users', {email, password, name});
        const {user, token} = response.data;
        localStorage.setItem("token", token);
        set({user, token});
    },

    logout : () => {
        localStorage.removeItem("token");
        set({user : null, token : null});
    },
}));