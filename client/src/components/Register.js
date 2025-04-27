import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [customerName, setCustomerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [brandName, setBrand] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post('https://warranty-app-ei1t.onrender.com/users/add', {
          customerName,
          companyName,
          email,
          brandName
        });
        navigate('/');
      } catch (error) {
        console.error('Registration failed:', error.response?.data || error.message);
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
      transition: 'border-color 0.3s',
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
      transition: 'background-color 0.3s',
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
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="customerName" style={styles.label}>Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Enter your name"
            style={styles.input}
          />
        </div>

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
            placeholder="Enter Email"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="brand" style={styles.label}>Brand Name</label>
          <input
            type="text"
            id="brand"
            value={brandName}
            onChange={(e) => setBrand(e.target.value)}
            required
            placeholder="Enter Brand Name"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Register</button>
      </form>

      <p style={styles.linkText}>
        Already have an account?{' '}
        <Link to="/" style={styles.linkStyle}>Login</Link>
      </p>
    </div>
  );
};
export default Register;
