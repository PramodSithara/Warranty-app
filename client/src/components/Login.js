import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://warranty-app-ei1t.onrender.com/users/login', {
        companyName,
        email,
      });
      const user = response.data.user;
      console.log('Login successful');

      navigate('/generator', {
        state: {
          companyName: user.companyName,
          upLimit: user.upperLimit,
          brandName: user.brandName,
        },
      });

      setError('');
    } catch (error) {
      const message =
        error.response && error.response.data
          ? error.response.data.message || error.response.data
          : 'Login failed. Please try again.';
      setError(message);
      console.error('Login error:', message);
    }
  };

  const styles = {
    container: {
      maxWidth: '420px',
      margin: '60px auto',
      padding: '35px',
      borderRadius: '12px',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    title: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#34495e',
      fontSize: '26px',
      fontWeight: '600',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '18px',
    },
    label: {
      fontSize: '15px',
      marginBottom: '6px',
      display: 'block',
      color: '#2c3e50',
      fontWeight: '500',
    },
    input: {
      padding: '10px 12px',
      fontSize: '15px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '8px',
      outline: 'none',
    },
    button: {
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      fontSize: '16px',
      fontWeight: '500',
      cursor: 'pointer',
      borderRadius: '8px',
      marginTop: '10px',
    },
    linkText: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '14px',
      color: '#7f8c8d',
    },
    linkStyle: {
      color: '#3498db',
      textDecoration: 'none',
      fontWeight: '500',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="companyName" style={styles.label}>Company Name</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Enter your company name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Login</button>
      </form>

      {error && (
        <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
          {error}
        </p>
      )}

      <p style={styles.linkText}>
        Don't have an account?{' '}
        <Link to="/sign" style={styles.linkStyle}>Register</Link>
      </p>
    </div>
  );
};

export default Login;
