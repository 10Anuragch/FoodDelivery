
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-light text-dark border-top py-3 mt-4 animate__animated animate__fadeInUp">
      <div className="container d-flex flex-wrap justify-content-between align-items-center">
        <p className="mb-0">© 2025 GoFood, Inc</p>
        <Link to="/" className="text-dark text-decoration-none d-flex align-items-center">

        </Link>
      </div>
    </footer>
  );
}

export default Footer;
