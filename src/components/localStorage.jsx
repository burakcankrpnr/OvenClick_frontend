const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/login', { username, password });
    setToken(response.data.token);
    localStorage.setItem('token', response.data.token); 
    navigate('/machines'); 
  } catch (error) {
    console.error('Giriş hatası:', error);
  }
};

  import React, { useState, useEffect } from 'react';
  
  function App() {
    const [token, setToken] = useState(null);
  
    useEffect(() => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  
    return (
    );
  };
  