import { Component } from 'react';
import { Link } from 'react-router-dom';
import '../css/MenuBar.css';

export class MenuBar extends Component {
  render() {
    return (
      <div className="menu-container">
        <h3 className="menu-title">Job Portal</h3>
        <ul className="menu-list">
          <li className="menu-item">
            <Link to="/dashboard" className="menu-link">
              <i className="menu-icon dashboard-icon"></i>
              Dashboard
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/jobs" className="menu-link">
              <i className="menu-icon jobs-icon"></i>
              Browse Jobs
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/applications" className="menu-link">
              <i className="menu-icon applications-icon"></i>
              My Applications
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/profile" className="menu-link">
              <i className="menu-icon profile-icon"></i>
              Profile
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/messages" className="menu-link">
              <i className="menu-icon messages-icon"></i>
              Messages
            </Link>
          </li>
          <li className="menu-item">
            <Link to="/settings" className="menu-link">
              <i className="menu-icon settings-icon"></i>
              Settings
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default MenuBar;

