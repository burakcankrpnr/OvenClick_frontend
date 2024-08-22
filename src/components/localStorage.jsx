const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('/login', { username, password });

    const { token, user_id } = response.data;

    localStorage.setItem('token', token);
    localStorage.setItem('user_id', user_id);

    setToken(token);

    navigate('/users');
  } catch (error) {
    console.error('Giriş hatası:', error);
  }
};
