import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [userPassword, setuserPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://warranty-app-ei1t.onrender.com/users/signin', {
        email,
        userPassword
      });
      if (response){
        const userRole = response.data.role;
        localStorage.setItem('token', response.data.token);
        if(userRole === 'admin'){
          navigate('/panel');
        }else{
          navigate('/generator');
        }
      }
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
      margin: '30px auto',
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
      width: '94%',
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
    printHeader:{
      fontSize: '16px',
      textAlign: 'center',
    },
    company: {
      fontFamily: '"Poppins", sans-serif',
      fontWeight: 'bold',
      fontSize: '24px',
      paddingBottom: '20px',
      color: '#0000ffbd'
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.printHeader}>
        <h2 style={styles.company}>E-ZONE Technologies (Pvt).Ltd</h2>
      </div>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
       
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

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={userPassword}
            onChange={(e) => setuserPassword(e.target.value)}
            required
            placeholder="Enter your Password"
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
    </div>
  );
};

export default Login;
