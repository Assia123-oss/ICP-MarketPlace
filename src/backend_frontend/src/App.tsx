import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { JobSeekerDashboard } from "./pages/dashboard/JobSeekerDashboard";
import { EmployerDashboard } from "./pages/dashboard/EmployerDashboard";
import { JobListingsPage } from "./pages/JobListingsPage";
import NotFound from "./pages/NotFound";
import HowItWorksPage from './pages/HowItWorksPage';
import AboutPage from './pages/AboutPage';
import BackToTopButton from './components/ui/BackToTopButton';
import PostJobPage from './pages/PostJobPage';
import SettingsPage from './pages/SettingsPage';
import PreferencesPage from './pages/PreferencesPage';
import JobDetailPage from './pages/JobDetailPage';
import ManageJobsPage from './pages/ManageJobsPage';
import JobCandidatesPage from './pages/JobCandidatesPage';
import ApplicationsPage from './pages/ApplicationsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { getPrincipalRole } from "@/lib/auth";
import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  // Mock authentication state - in a real app this would come from context/store
  const isAuthenticated = false;
  const userRole: 'jobseeker' | 'employer' = 'jobseeker';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header isAuthenticated={isAuthenticated} userRole={userRole} />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/jobs" element={<JobListingsPage />} />
                <Route path="/dashboard" element={ <PrivateRoute>
      <JobSeekerDashboard />
    </PrivateRoute>} />
                <Route path="/dashboard/employer" element={<PrivateRoute>
      {getPrincipalRole()?.role === "employer" ? (
        <EmployerDashboard />
      ) : (
        <Navigate to="/dashboard" />
      )}
    </PrivateRoute>} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/post-job" element={<PostJobPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/preferences" element={<PreferencesPage />} />
                <Route path="/job/:id" element={<JobDetailPage />} />
                <Route path="/manage-jobs" element={<ManageJobsPage />} />
                <Route path="/job/:jobId/candidates" element={<JobCandidatesPage />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/saved-jobs" element={<SavedJobsPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <BackToTopButton />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
