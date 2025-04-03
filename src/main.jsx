import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Projecthomepage from './components/ProjectHomePage.jsx';
import Dashboard from './components/Dashboard.jsx';
import JobSearching from './components/JobSearching.jsx';
import JobPosting from './components/JobPosting.jsx';
import Profile from './components/Profile.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Projecthomepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobsearching" element={<JobSearching />} />
        <Route path="/jobposting" element={<JobPosting />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);