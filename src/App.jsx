import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import UserDashboard from './pages/UserDashboard'
import MedicalPanel from './pages/MedicalPanel'
import EmergencyPage from './pages/EmergencyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/medico" element={<MedicalPanel />} />
      <Route path="/emergencia" element={<EmergencyPage />} />
      <Route path="/emergencia/:patientId" element={<EmergencyPage />} />
    </Routes>
  )
}

export default App

