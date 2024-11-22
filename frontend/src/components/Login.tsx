import { useAuthStore } from "@/store/authStore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e : React.FormEvent) =>{
    e.preventDefault();
    try{
      await login(email, password);
      navigate("/");
    }catch(err){
      console.log("Login Failed", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="blockmb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full border rounded p2"
          />
        </div>

        <div>
          <label className="blockmb-1">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full border rounded p2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded p-2"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
