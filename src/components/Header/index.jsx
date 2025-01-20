import React from 'react';
import './header.css';
import defaultAvatar from '/smiling.png';

const Header = ({ userAvatar = defaultAvatar, userRank, userName = 'Guest' }) => {
  return (
    <header className="header">
      <div className="header-title">Face Bomb Game</div>
      <nav className="header-menu">
        <div className="menu-item">
          <a href="/userinfo" className="menu-link user-info">
            <img src={userAvatar || defaultAvatar} alt="User avatar" className="user-avatar" />
            <span className="user-name">
              {userName}
              { userRank && <span className="user-rank">({userRank})</span> }
            </span>
          </a>
        </div>
        <div className="menu-item">
          <a href="/leaderboard" className="menu-link">
            Leader Board
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;