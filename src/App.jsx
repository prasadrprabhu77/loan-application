import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Signup'
import PrivateRoute from './components/privateRoute'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import MyLoans from './pages/MyLoans'
import LoanDetails from './pages/LoanDetails'

function App() {

  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (wrapped once) */}
        <Route
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/myloans" element={<MyLoans />} />
          <Route path="/loan/:id" element={<LoanDetails />} />
        </Route>
      </Routes>
  
  )
}

export default App
