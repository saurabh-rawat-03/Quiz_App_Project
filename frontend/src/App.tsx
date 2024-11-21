import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import { useAuthStore } from "./store/authStore";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Quiz from "./components/Quiz";
import QuizList from "./components/QuizList";
import Score from "./components/Score";
import Login from "./components/Login";
import Navigation from "./components/Navigation";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useAuthStore((state) => state.token);
  return token ? <>{children}</> : <Navigate to={"/login"} />;
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-grey-50">
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile></Profile>
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              <PrivateRoute>
                <Quiz></Quiz>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/" element={<QuizList />}></Route>
          <Route path="/score/:quizId" element={<Score></Score>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
