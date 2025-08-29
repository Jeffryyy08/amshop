import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'amshop2025') { // Contraseña segura
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Contraseña incorrecta');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>🔐 Acceso Administrador</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;