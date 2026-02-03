

// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import { useNavigate, Link } from 'react-router-dom';

// export default function Login() {
//   const [credentials, setCredentials] = useState({ email: "", password: "" });
//   const [showPwd, setShowPwd] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: credentials.email, password: credentials.password })
//     });
//     const json = await response.json();
//     if (json.success) {
//       localStorage.setItem('userEmail', credentials.email);
//       localStorage.setItem('token', json.authToken);
//       navigate("/");
//     } else {
//       alert("Enter Valid Credentials");
//     }
//   };

//   const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

//   return (
//     <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg")', height: '100vh', backgroundSize: 'cover' }}>
//       <Navbar />
//       <div className='container'>
//         <form className='w-50 m-auto mt-5 border bg-dark border-success rounded p-4 animate__animated animate__zoomIn' onSubmit={handleSubmit}>
//           <div className="m-3">
//             <label className="form-label">Email address</label>
//             <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} placeholder='Enter your Email' />
//             <div className="form-text">We'll never share your email with anyone.</div>
//           </div>
//           <div className="m-3">
//             <label className="form-label">Password</label>
//             <div className='d-flex'>
//               <input type={showPwd ? "text" : "password"} className="form-control" value={credentials.password} onChange={onChange} name='password' placeholder='Enter your password' />
//               <button type="button" className="btn btn-outline-light ms-2" onClick={() => setShowPwd(!showPwd)}>
//                 {showPwd ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>
//           <div className='d-flex m-3'>
//             <button type="submit" className="btn btn-success me-2">Submit</button>
//             <Link to="/signup" className="btn btn-danger">New User</Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('token', json.authToken);
      navigate("/");
    } else alert(json.error || "Enter valid credentials");
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg")', height: '100vh', backgroundSize: 'cover' }}>
      <Navbar />
      <div className='container'>
        <form className='w-50 m-auto mt-5 border bg-dark border-success rounded p-4' onSubmit={handleSubmit}>
          <div className="m-3">
            <label>Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} placeholder='Enter your Email' required />
          </div>
          <div className="m-3">
            <label>Password</label>
            <div className='d-flex'>
              <input type={showPwd ? "text" : "password"} className="form-control" value={credentials.password} onChange={onChange} name='password' placeholder='Enter your password' required />
              <button type="button" className="btn btn-outline-light ms-2" onClick={() => setShowPwd(!showPwd)}>
                {showPwd ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div className='d-flex m-3'>
            <button type="submit" className="btn btn-success me-2">Login</button>
            <Link to="/signup" className="btn btn-danger">New User</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
