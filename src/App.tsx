import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AllTasksPage } from "./pages/AllTasksPage";
import { CompletedTasksPage } from "./pages/CompletedTasksPage";
import "./App.css";

export const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">All tasks</Link>
          <Link to="/completed">Completed</Link>
        </nav>
        <Routes>
          <Route path="/" element={<AllTasksPage />} />
          <Route path="/completed" element={<CompletedTasksPage />} />
        </Routes>
      </div>
    </Router>
  );
};
