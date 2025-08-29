import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import './Admin.css';

function AdminPanel() {
  const navigate = useNavigate();

  // Verifica si está autenticado
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <h1>🛠️ Panel de Administración</h1>
        <button onClick={handleLogout} className="logout-btn">Cerrar sesión</button>
      </header>

      <div className="admin-content">
        <AddProduct />
        <ProductList />
      </div>
    </div>
  );
}

export default AdminPanel;