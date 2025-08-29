import React, { useState, useEffect } from 'react';

function ProductList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await fetch('https://amshop-backend.onrender.com/api/productos');
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta camiseta?")) return;

    try {
      await fetch(`https://amshop-backend.onrender.com/api/productos?id=eq.${id}`, {
        method: 'DELETE',
      });
      setProductos(productos.filter(p => p.id !== id));
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const handleToggleDisponible = async (id, disponible) => {
    try {
      await fetch(`https://amshop-backend.onrender.com/api/productos?id=eq.${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disponible: !disponible }),
      });
      setProductos(productos.map(p => 
        p.id === id ? { ...p, disponible: !disponible } : p
      ));
    } catch (error) {
      alert("Error al actualizar disponibilidad");
    }
  };

  return (
    <div className="product-list">
      <h3>📋 Camisetas Existentes</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Equipo</th>
            <th>Precio</th>
            <th>Disponible</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.nombre}</td>
              <td>{prod.equipo}</td>
              <td>${prod.precio.toLocaleString()}</td>
              <td>
                <button
                  onClick={() => handleToggleDisponible(prod.id, prod.disponible)}
                  className={prod.disponible ? 'btn-disponible' : 'btn-agotado'}
                >
                  {prod.disponible ? 'Sí' : 'No'}
                </button>
              </td>
              <td>
                <button onClick={() => handleDelete(prod.id)} className="btn-delete">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;