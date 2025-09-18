import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Map from './components/Map';
import HealthcareMap from './pages/HealthcareMap';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import BookAppointment from './pages/BookAppointment';
import SymptomChecker from './pages/SymptomChecker';
import Pharmacies from './pages/Pharmacies';
import HealthRecords from './pages/HealthRecords';
import NotFound from './pages/NotFound';
import PharmacistDashboard from './pages/PharmacistDashboard';
import SignupPatient from './pages/SignupPatient';
import SignupDoctor from './pages/SignupDoctor';
import SignupPharmacist from './pages/SignupPharmacist';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/toaster';

const TitleSetter: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    const map: Record<string, string> = {
      '/': 'Village Care Flow — Home',
      '/dashboard': 'Village Care Flow — Dashboard',
      '/symptom-checker': 'Village Care Flow — Symptom Checker',
      '/book-appointment': 'Village Care Flow — Book a Doctor',
      '/health-records': 'Village Care Flow — Health Records',
      '/pharmacies': 'Village Care Flow — Pharmacies',
      '/pharmacist': 'Village Care Flow — Pharmacist',
      '/healthcare-map': 'Village Care Flow — Find Services',
      '/signup/patient': 'Village Care Flow — Patient Sign Up',
      '/signup/doctor': 'Village Care Flow — Doctor Sign Up',
      '/signup/pharmacist': 'Village Care Flow — Pharmacist Sign Up',
      '/doctor': 'Village Care Flow — Doctor Portal',
    };
    const title = map[location.pathname] ?? 'Village Care Flow';
    document.title = title;
  }, [location.pathname]);
  return null;
};

interface MapProps {
  showNearbyServices?: boolean;
  defaultFilter?: string;
  // other props
}

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="min-h-screen bg-background">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container p-4">
              <Navigation />
            </div>
          </header>

          <main className="container p-4">
            <TitleSetter />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              
              {/* Patient Features - Distinct and Non-Overlapping */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/symptom-checker" element={<SymptomChecker />} />
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/health-records" element={<HealthRecords />} />
              <Route path="/pharmacies" element={<Pharmacies />} />
              <Route path="/pharmacist" element={<PharmacistDashboard />} />
              <Route path="/healthcare-map" element={<HealthcareMap />} />
              
              {/* Sign Up Pages */}
              <Route path="/signup/patient" element={<SignupPatient />} />
              <Route path="/signup/doctor" element={<SignupDoctor />} />
              <Route path="/signup/pharmacist" element={<SignupPharmacist />} />
              
              {/* Doctor Portal - Separate Access */}
              <Route path="/doctor" element={<DoctorDashboard />} />
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </LanguageProvider>
  );
};

export default App;
