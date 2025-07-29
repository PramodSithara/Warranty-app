import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';
import StickerPrint from './StickerPrint';
import UserRegister from './UserRegister';
import axios from 'axios';
import '../panel.css';

const Panel = () => {
  const [activeComponent, setActiveComponent] = useState('register');
  const [profile, setProfile] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        const message = 'Failed to load';
        alert(message);
        navigate('/404');
      }
      try {
        const response = await axios.get('https://warranty-app-ei1t.onrender.com/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProfile(response.data);
      } catch (err) {
        return(err || 'Failed to fetch profile');
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const styles = {
    container: {
      display: 'flex',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    sidebar: {
      width: '250px',
      backgroundColor: '#2c3e50',
      color: 'white',
      padding: '20px',
      boxSizing: 'border-box',
    },
    mainPanel: {
      flex: 1,
      backgroundColor: '#f4f4f4',
      overflowY: 'auto',
    },
    username: {
      fontSize: '15px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    button: {
      display: 'block',
      width: '100%',
      padding: '10px',
      margin: '10px 0',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    logoutButton: {
      width: '100%',
      padding: '10px',
      marginTop: 'auto',
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar} className='no-print'>
        <div style={styles.username}>[{profile.role}] - {profile.userName}</div>
        <button style={styles.button} onClick={() => setActiveComponent('register')}>
          Customer Registration
        </button>
        <button style={styles.button} onClick={() => setActiveComponent('generator')}>
          Sticker Generator
        </button>
        <button style={styles.button} onClick={() => setActiveComponent('user')}>
          User Registration
        </button>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div style={styles.mainPanel} className="main-panel">
        {activeComponent === 'register' && <Register />}
        {activeComponent === 'generator' && <StickerPrint />}
        {activeComponent === 'user' && <UserRegister />}
      </div>
    </div>
  );
};

export default Panel;
