import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';

import PageWrapper from './components/site/layout/PageWrapper';
import PageTransition from './components/site/layout/PageTransition';
import Loader from './components/ui/Loader';

// Public Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Cases = lazy(() => import('./pages/Cases'));
const CaseDetail = lazy(() => import('./pages/CaseDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Pages
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const CasesList = lazy(() => import('./pages/admin/cases/CasesList'));
const CaseForm = lazy(() => import('./pages/admin/cases/CaseForm'));
const ServicesList = lazy(() => import('./pages/admin/services/ServicesList'));
const ServiceForm = lazy(() => import('./pages/admin/services/ServiceForm'));
const TeamList = lazy(() => import('./pages/admin/team/TeamList'));
const TeamForm = lazy(() => import('./pages/admin/team/TeamForm'));
const ContactsList = lazy(() => import('./pages/admin/contacts/ContactsList'));
const ContactDetail = lazy(() => import('./pages/admin/contacts/ContactDetail'));
const TestimonialsList = lazy(() => import('./pages/admin/testimonials/TestimonialsList'));
const TestimonialForm = lazy(() => import('./pages/admin/testimonials/TestimonialForm'));
const BlogList = lazy(() => import('./pages/admin/blogs/BlogList'));
const BlogForm = lazy(() => import('./pages/admin/blogs/BlogForm'));
const StatsEditor = lazy(() => import('./pages/admin/stats/StatsEditor'));

// Admin section: no Navbar, no Footer, always dark theme
function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="stats" element={<StatsEditor />} />
          <Route path="cases" element={<CasesList />} />
          <Route path="cases/new" element={<CaseForm />} />
          <Route path="cases/:id/edit" element={<CaseForm />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/new" element={<ServiceForm />} />
          <Route path="services/:id/edit" element={<ServiceForm />} />
          <Route path="team" element={<TeamList />} />
          <Route path="team/new" element={<TeamForm />} />
          <Route path="team/:id/edit" element={<TeamForm />} />
          <Route path="contacts" element={<ContactsList />} />
          <Route path="contacts/:id" element={<ContactDetail />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="testimonials/new" element={<TestimonialForm />} />
          <Route path="testimonials/:id/edit" element={<TestimonialForm />} />
          <Route path="blogs" element={<BlogList />} />
          <Route path="blogs/new" element={<BlogForm />} />
          <Route path="blogs/:id/edit" element={<BlogForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

// Public section: has Navbar + Footer + animated page transitions + theme support
function PublicRoutes() {
  const location = useLocation();
  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
          <Route path="/cases" element={<PageTransition><Cases /></PageTransition>} />
          <Route path="/cases/:slug" element={<PageTransition><CaseDetail /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </PageWrapper>
  );
}

// Root router: split admin vs public at the top level
function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return isAdmin ? <AdminRoutes /> : <PublicRoutes />;
}

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <AppRoutes />
      </Suspense>
      <Toaster position="top-right" richColors />
    </Router>
  );
}

export default App;
