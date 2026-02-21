import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import SwingAnalysis from './pages/SwingAnalysis';
import ProgressTracking from './pages/ProgressTracking';
import Settings from './pages/Settings';
import TeamManagement from './pages/TeamManagement';
import PlayerProfile from './pages/PlayerProfile';
import MedicalReports from './pages/MedicalReports';
import './index.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.card, .stat-card');
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="app">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="main-content">
          <Container fluid>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analysis" element={<SwingAnalysis />} />
              <Route path="/progress" element={<ProgressTracking />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/team" element={<TeamManagement />} />
              <Route path="/team/:id" element={<PlayerProfile />} />
              <Route path="/medical-reports" element={<MedicalReports />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default App;
