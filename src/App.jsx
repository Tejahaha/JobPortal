import "./App.css";
import "./css/theme.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProjectHomePage from "./components/ProjectHomePage";
import Dashboard from "./components/Dashboard";
import JobSearching from "./components/JobSearching";
import JobPosting from "./components/JobPosting";
import Profile from "./components/Profile";
import MenuBar from "./components/MenuBar";
import TailwindTest from "./components/TailwindTest";

function App() {
  return (
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <MenuBar />
          <main className="ml-64 p-8">
            <Routes>
              <Route path="/" element={<ProjectHomePage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/jobsearching" element={<JobSearching />} />
              <Route path="/jobposting" element={<JobPosting />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/TailwindTest" element={<TailwindTest />} />
            </Routes>
          </main>
        </div>
      </Router>
  );
}

export default App
