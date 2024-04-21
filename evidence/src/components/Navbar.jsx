import React from "react";
import { Link } from "react-router-dom";
import '../components/Navbar.css'

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand bg-body-tertiary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand">
          <span className="badge bg-light text-dark fs-4">EMS</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="nav-link">
                <Link to="/" className="linkcss">Home</Link>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Evidence
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">
                  <Link to="/add_evidence" className="linkcss">Add Evidence</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/update_evidence" className="linkcss">Update Evidence</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/view_evidence" className="linkcss">View Evidence</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/track_evidence" className="linkcss">Track Evidence</Link>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Cases
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">
                  <Link to="/add_case" className="linkcss">Add Case</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/update_case" className="linkcss">Update Case</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/view_case" className="linkcss">View Case</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/track_case" className="linkcss">Track Case</Link>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Officer
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">
                  <Link to="/add_officer" className="linkcss">Add Officer</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/update_officer" className="linkcss">Update Officer</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/view_officer" className="linkcss">View Officer</Link>
                </a>
                <a className="dropdown-item">
                  <Link to="/delete_officer" className="linkcss">Delete Officer</Link>
                </a>
              </div>
            </li>
          </ul>
        </div>
        <span className="navbar-text">Account : {props.account}</span>
      </div>
    </nav>
  );
};

export default Navbar;
