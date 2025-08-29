import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar "cargando"

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // 🔧 Corregido: Eliminé los espacios en la URL
        const res = await axios.get('https://amshop-backend.onrender.com/api/productos');
        setProductos(res.data);
      } catch (error) {
        console.error("Error cargando productos", error);
        // Puedes mostrar un mensaje al usuario si quieres
      } finally {
        // 🔚 Siempre se ejecuta, haya error o no
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

  // 🔄 Mientras carga
  if (loading) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>🔄 Cargando camisetas...</h2>
        <p>Un momento, estamos trayendo las mejores camisetas de fútbol</p>
      </div>
    );
  }

  // 📦 Si no hay productos
  if (productos.length === 0) {
    return (
      <div className="App" style={{ textAlign: 'center', padding: '3rem' }}>
        <h2>📭 No hay camisetas disponibles</h2>
        <p>Contacta a tu primo para agregar productos en Supabase.</p>
      </div>
    );
  }

  // ✅ Si todo está bien: muestra los productos
  return (
    <div className="App">
      <header>
        <img src="/amshop-logo.png" alt="Amshop Camisetas" className="logo" />
        <p>Camisetas oficiales de fútbol</p>
      </header>

      <main>
        <h2>🔥 Nuestras Camisetas</h2>
        <div className="grid">
          {productos.map((prod) => (
            <div key={prod.id} className="producto">
              {/* ✅ .trim() para eliminar espacios en la URL */}
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