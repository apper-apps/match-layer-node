import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import Home from '@/components/pages/Home'
import Browse from '@/components/pages/Browse'
import PropertyDetail from '@/components/pages/PropertyDetail'
import MatchCreator from '@/components/pages/MatchCreator'
import UserDashboard from '@/components/pages/UserDashboard'
import CustomBuild from '@/components/pages/CustomBuild'
import HowItWorks from '@/components/pages/HowItWorks'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:type" element={<Browse />} />
          <Route path="/property/:type/:id" element={<PropertyDetail />} />
          <Route path="/match-creator" element={<MatchCreator />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/custom-build" element={<CustomBuild />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Route>
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App