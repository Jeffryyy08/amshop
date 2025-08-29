import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await axios.get('https://amshop-backend.onrender.com/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error("Error cargando productos");
      }
    };
    fetchProductos();
  }, []);

  const handleWhatsApp = (producto) => {
    const mensaje = `Hola, quiero comprar: ${producto.nombre} - $${producto.precio}`;
    const url = `https://wa.me/573001234567?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="App">
      <header>
        <img src="/amshop-logo.png" alt="Amshop Camisetas" className="logo" />
        <p>Camisetas oficiales de fútbol</p>
      </header>

      <main>
        <h2>🔥 Nuestras Camisetas</h2>
        <div className="grid">
          {productos.map(prod => (
            <div key={prod.id} className="producto">
              <img src={prod.imagen_url} alt={prod.nombre} />
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