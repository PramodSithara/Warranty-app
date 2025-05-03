import React, { useState } from 'react';
import axios from 'axios';

const UserRegister = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [userPassword, setuserPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const userResponse = await axios.post('http://127.0.0.1:5000/users/signup', {
            userName,
            email,
            userPassword,
            role
        });
        if(userResponse){
          alert('User Created Successfully');
          window.location.reload();
        }
      } catch (error) {
        setError(error.response.data.message)
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
      <h2 style={styles.title}>User Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="userName" style={styles.label}>
            User Name
          </label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Enter user Name"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter user Email"
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="role" style={styles.label}>
            User Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.input}
            required
          >
            <option  value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            User Password
          </label>
          <input
            type="password"
            id="password"
            value={userPassword}
            onChange={(e) => setuserPassword(e.target.value)}
            required
            placeholder="Enter user Password"
            style={styles.input}
          />
        </div>
        {error && (
          <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
            {error}
          </p>
        )}
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};
export default UserRegister;
