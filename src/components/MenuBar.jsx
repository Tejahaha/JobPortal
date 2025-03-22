import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdHome, MdWork, MdAssignment, MdContactMail, MdSettings, MdLogout, MdMenu } from 'react-icons/md';
import '../css/MenuBar.css';
import { setSession } from '../api';

const MenuBar = ({ toggleSidebar, isCollapsed, username = 'User' }) => {
  const [activeItem, setActiveItem] = useState('/');

  const menuItems = [
    { to: '/', icon: <MdHome />, label: 'Home' },
    { to: '/jobs', icon: <MdWork />, label: 'Find Jobs' },
    { to: '/applications', icon: <MdAssignment />, label: 'My Applications' },
    { to: '/contact', icon: <MdContactMail />, label: 'Contact Us' },
    { to: '/settings', icon: <MdSettings />, label: 'Settings' },
  ];

  const handleLogout = () => {
    setSession("csrid", "", -1);
    window.location.replace("/");
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="logo-container">
          {isCollapsed ? (
            <h3 className="logo-small">J<span className="logo-highlight">C</span></h3>
          ) : (
            <h3 className="logo">Job<span className="logo-highlight">Connect</span></h3>
          )}
        </div>
        <button onClick={toggleSidebar} className="collapse-button">
          <MdMenu />
        </button>
      </div>

      {/* Navigation Items */}
      <ul className="menu-items">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <Link 
              to={item.to} 
              className={`menu-link ${activeItem === item.to ? 'active' : ''}`}
              onClick={() => setActiveItem(item.to)}
            >
              <span className="menu-icon">{item.icon}</span>
              {!isCollapsed && <span className="menu-label">{item.label}</span>}
            </Link>
          </li>
        ))}
      </ul>

      {/* Username Display at Bottom */}
      <div className="username-container">
        {!isCollapsed && <p className="username">{username}</p>}
      </div>

      {/* Logout Button */}
      <div className="logout-container">
        <button onClick={handleLogout} className="logout-button">
          <span className="logout-icon"><MdLogout /></span>
          {!isCollapsed && <span className="logout-text">Logout</span>}
        </button>
      </div>
    </div>
  );
};

MenuBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  username: PropTypes.string
};

export default MenuBar;
