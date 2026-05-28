
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

// import Home from './screens/Home';
// import Login from './screens/Login';
// import Signup from './screens/Signup';
// import MyOrder from './screens/MyOrder';
// import VerifyOTP from './screens/VerifyOTP';
// import AdminDashboard from './components/Admin/AdminDashboard';

// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { CartProvider } from './components/ContextReducer';

// function App() {
//   return (
//     <CartProvider>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/myorder" element={<MyOrder />} />
//           <Route path="/admin/*" element={<AdminDashboard />} />
//           <Route path="/verify-otp" element={<VerifyOTP />} />

//         </Routes>
//       </Router>
//     </CartProvider>
//   );
// }

// export default App;

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import VerifyOTP from './screens/VerifyOTP';

import AdminDashboard from './components/Admin/AdminDashboard';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { CartProvider } from './components/ContextReducer';

function App() {

  return (

    <CartProvider>

      <Router>

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* SIGNUP */}
          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* MY ORDERS */}
          <Route
            path="/myorder"
            element={<MyOrder />}
          />

          {/* VERIFY OTP */}
          <Route
            path="/verify-otp"
            element={<VerifyOTP />}
          />

          {/* ADMIN PROTECTED ROUTE */}
          <Route
            path="/admin/*"
            element={
              localStorage.getItem("userRole") === "admin"

                ?

                <AdminDashboard />

                :

                <Navigate to="/" />
            }
          />

        </Routes>

      </Router>

    </CartProvider>

  );

}

export default App;