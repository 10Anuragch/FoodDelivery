// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import Navbar from '../components/Navbar';

// export default function Signup() {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     geolocation: ""
//   });
//   const [address, setAddress] = useState("");
//   const navigate = useNavigate();


//   const handleClick = async (e) => {
//     e.preventDefault();
//     const navLocation = () =>
//       new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));

//     try {
//       const pos = await navLocation();
//       const lat = pos.coords.latitude;
//       const long = pos.coords.longitude;

//       const response = await fetch("http://localhost:5000/api/auth/getlocation", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ lat, long })
//       });

//       const { location } = await response.json();
//       if (location) {
//         setAddress(location);
//         setCredentials({ ...credentials, geolocation: location });
//       } else {
//         alert("Unable to fetch location");
//       }
//     } catch (err) {
//       console.error("Geolocation error:", err);
//       alert("Cannot fetch location. Please enable location or enter manually.");
//     }
//   };

 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const response = await fetch("http://localhost:5000/api/auth/createuser", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: credentials.name,
//         email: credentials.email,
//         password: credentials.password,
//         location: credentials.geolocation || address
//       })
//     });

//     const json = await response.json();
//     if (json.success) {
//       localStorage.setItem("token", json.authToken);
//       localStorage.setItem("userEmail", credentials.email);
//       alert("Signup successful! You are logged in.");
//       navigate("/");
//     } else {
//       alert("Enter Valid Credentials");
//     }
//   };

//   const onChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "address") {
//       setAddress(value);
//     } else {
//       setCredentials({ ...credentials, [name]: value });
//     }
//   };

//   return (
//     <div
//       style={{
//         backgroundImage:
//           'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg")',
//         backgroundSize: "cover",
//         height: "100vh"
//       }}
//     >
//       <Navbar />
//       <div className="container">
//         <form
//           className="w-50 m-auto mt-5 border bg-dark border-success rounded p-4 animate__animated animate__zoomIn"
//           onSubmit={handleSubmit}
//         >
//           <div className="m-3">
//             <label className="form-label">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={credentials.name}
//               onChange={onChange}
//               placeholder="Enter your name"
//               required
//             />
//           </div>

//           <div className="m-3">
//             <label className="form-label">Email address</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={credentials.email}
//               onChange={onChange}
//               placeholder="Enter your Email"
//               required
//             />
//           </div>

//           <div className="m-3">
//             <label className="form-label">Address</label>
//             <input
//               type="text"
//               className="form-control"
//               name="address"
//               placeholder="Click below for fetching address"
//               value={address}
//               onChange={onChange}
//             />
//           </div>

//           <div className="m-3">
//             <button
//               type="button"
//               onClick={handleClick}
//               className="btn btn-success"
//             >
//               Click for current Location
//             </button>
//           </div>

//           <div className="m-3">
//             <label className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter Password"
//               value={credentials.password}
//               onChange={onChange}
//               name="password"
//               required
//               minLength={8}
//             />
//           </div>

//           <div className="d-flex m-3">
//             <button type="submit" className="btn btn-success me-2">
//               Submit
//             </button>
//             <Link to="/login" className="btn btn-danger">
//               Already a user
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Signup() {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const pos = await new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));
      const lat = pos.coords.latitude;
      const long = pos.coords.longitude;

      const response = await fetch("http://localhost:5000/api/auth/getlocation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat, long })
      });

      const { location } = await response.json();
      if (location) {
        setAddress(location);
        setCredentials({ ...credentials, geolocation: location });
      } else alert("Unable to fetch location");
    } catch (err) {
      console.error(err);
      alert("Cannot fetch location. Enter manually.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation || address })
    });

    const json = await response.json();

    if (json.success) {
      localStorage.setItem("signupEmail", credentials.email);
      alert("Signup successful! Check your email for OTP.");
      navigate("/verify-otp");
    } else {
      alert(json.error || "Signup failed");
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "address") setAddress(value);
    else setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg")', backgroundSize: "cover", height: "100vh" }}>
      <Navbar />
      <div className="container">
        <form className="w-50 m-auto mt-5 border bg-dark border-success rounded p-4" onSubmit={handleSubmit}>
          <div className="m-3">
            <label>Name</label>
            <input type="text" name="name" className="form-control" value={credentials.name} onChange={onChange} placeholder="Enter your name" required />
          </div>
          <div className="m-3">
            <label>Email</label>
            <input type="email" name="email" className="form-control" value={credentials.email} onChange={onChange} placeholder="Enter your email" required />
          </div>
          <div className="m-3">
            <label>Address</label>
            <input type="text" name="address" className="form-control" value={address} onChange={onChange} placeholder="Click below to fetch address" />
          </div>
          <div className="m-3">
            <button type="button" onClick={handleClick} className="btn btn-success">Fetch Current Location</button>
          </div>
          <div className="m-3">
            <label>Password</label>
            <input type="password" name="password" className="form-control" value={credentials.password} onChange={onChange} placeholder="Enter Password" minLength={8} required />
          </div>
          <div className="d-flex m-3">
            <button type="submit" className="btn btn-success me-2">Signup</button>
            <Link to="/login" className="btn btn-danger">Already a user</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
