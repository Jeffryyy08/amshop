import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // ✅ Corregido: sin espacios
        const res = await axios.get('https://amshop-backend.onrender.com/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error("Error cargando productos", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const handleWhatsApp = (producto) => {
    const mensaje = `Hola, quiero comprar: ${producto.nombre} - $${producto.precio}`;
    const url = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>🔄 Cargando camisetas...</h2>
        <p>Un momento, estamos trayendo las mejores camisetas</p>
      </div>
    );
  }

  if (productos.length === 0) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>📭 No hay camisetas disponibles</h2>
        <p>Contacta a tu primo para agregar productos.</p>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <img src="/amshop-logo.png" alt="Amshop Camisetas" className="logo" />
        <p>Camisetas oficiales de fútbol</p>
        <Link to="/admin/login" style={{
          display: 'inline-block',
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#0d3b66',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '6px',
          fontSize: '0.9rem'
        }}>
          🔐 Acceder como Admin
        </Link>
      </header>

      <main>
        <h2>🔥 Nuestras Camisetas</h2>
        <div className="grid">
          {productos.map(prod => (
            <div key={prod.id} className="producto">
              <img src={prod.imagen_url?.trim()} alt={prod.nombre} />
              <h3>{prod.nombre}</h3>
              <p className="equipo">{prod.equipo}</p>
              <p className="precio">${prod.precio.toLocaleString()}</p>
              <button onClick={() => handleWhatsApp(prod)}>
                📱 Pedir por WhatsApp
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer>
        <p>&copy; 2025 Amshop Camisetas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;