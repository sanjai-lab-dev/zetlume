import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PromoBanner from './components/PromoBanner'
import CustomCursor from './components/CustomCursor'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Services from './pages/public/Services'
import Courses from './pages/public/Courses'
import CourseDetail from './pages/public/CourseDetail'
import Projects from './pages/public/Projects'
import ProjectDetail from './pages/public/ProjectDetail'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'
import Register from './pages/public/Register'
import ForgotPassword from './pages/public/ForgotPassword'
import Unauthorized from './pages/public/Unauthorized'
import NotFound from './pages/public/NotFound'
import CertificateVerify from './pages/public/CertificateVerify'

// Protected Dashboard pages
import StudentDashboard from './pages/dashboard/StudentDashboard'
import StudentPayment from './pages/dashboard/StudentPayment'
import ProfessionalDashboard from './pages/dashboard/ProfessionalDashboard'
import AdminDashboard from './pages/dashboard/AdminDashboard'

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function PublicLayout({ children, pathname }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />
      <motion.main
        key={pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1"
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  )
}

export default function App() {
  const location = useLocation()
  
  return (
    <>
      <CustomCursor />
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: '#FFFFFF', color: '#0F172A', border: '1px solid rgba(14,165,233,0.2)' },
        }}
      />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout pathname={location.pathname}><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout pathname={location.pathname}><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout pathname={location.pathname}><Services /></PublicLayout>} />
          <Route path="/courses" element={<PublicLayout pathname={location.pathname}><Courses /></PublicLayout>} />
          <Route path="/courses/:id" element={<PublicLayout pathname={location.pathname}><CourseDetail /></PublicLayout>} />
          <Route path="/projects" element={<PublicLayout pathname={location.pathname}><Projects /></PublicLayout>} />
          <Route path="/projects/:id" element={<PublicLayout pathname={location.pathname}><ProjectDetail /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout pathname={location.pathname}><Contact /></PublicLayout>} />
          <Route path="/login" element={<PublicLayout pathname={location.pathname}><Login /></PublicLayout>} />
          <Route path="/register" element={<PublicLayout pathname={location.pathname}><Register /></PublicLayout>} />
          <Route path="/forgot-password" element={<PublicLayout pathname={location.pathname}><ForgotPassword /></PublicLayout>} />
          <Route path="/unauthorized" element={<PublicLayout pathname={location.pathname}><Unauthorized /></PublicLayout>} />
          <Route path="/certificate/verify/:id?" element={<PublicLayout pathname={location.pathname}><CertificateVerify /></PublicLayout>} />

          {/* Student Dashboard Routes */}
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/payment/:registrationId"
            element={
              <ProtectedRoute requiredRole="student">
                <StudentPayment />
              </ProtectedRoute>
            }
          />

          {/* Professional Dashboard Routes */}
          <Route
            path="/professional/dashboard"
            element={
              <ProtectedRoute requiredRole="professional">
                <ProfessionalDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route path="*" element={<PublicLayout pathname={location.pathname}><NotFound /></PublicLayout>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}