import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import LabSchedule from './components/LabSchedule';
import LabProfessor from './components/LabProfessor';
import LabAdmin from './components/LabAdmin';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/lab_schedule" element={<LabSchedule />} />
                <Route path="/lab_professor" element={<LabProfessor />} />
                <Route path="/lab_admin" element={<LabAdmin />} />
                <Route path="/" element={<LabSchedule />} />
            </Routes>
        </Router>
    );
}

export default App;