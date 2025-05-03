import React from 'react';

const NotFound = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    },
    title: {
      fontSize: '48px',
      color: 'red',
      marginBottom: '10px',
    },
    message: {
      fontSize: '20px',
      color: '#555',
      marginBottom: '20px',
    },
    homeButton: {
      padding: '10px 20px',
      fontSize: '16px',
      backgroundColor: '#3498db',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      textDecoration: 'none',
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.message}>
        The page you are looking for doesn't exist or you're not authorized.
      </p>
      <a href="/" style={styles.homeButton}>Go Back</a>
    </div>
  );
};

export default NotFound;
