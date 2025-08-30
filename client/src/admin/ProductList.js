import React, { useState, useEffect } from 'react';

function ProductList() {
  const [productos, setProductos] = useState([]);

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const res = await fetch('https://amshop-backend.onrender.com/api/productos');
        const data = await res.json();
        setProductos(data);
      } catch (error) {
        console.error("Error cargando productos", error);
      }
    };
    fetchProductos();
  }, []);

  // Función para eliminar un producto
  const handleDelete = async (id, nombre) => {
    const confirm = window.confirm(`¿Eliminar la camiseta "${nombre}"? Esta acción no se puede deshacer.`);
    if (!confirm) return;

    try {
      const response = await fetch(`https://amshop-backend.onrender.com/api/productos?id=eq.${id}`, {
        method: 'DELETE',
      });

      if (response.ok || response.status === 204) {
        setProductos(productos.filter(p => p.id !== id));
        alert('✅ Camiseta eliminada correctamente');
      } else {
        alert('❌ Error al eliminar en el servidor');
      }
    } catch (error) {
      alert("❌ Error de conexión con el servidor");
    }
  };

  // Función para cambiar disponibilidad
  const handleToggleDisponible = async (id, disponible, nombre) => {
    const action = disponible ? 'desactivar' : 'activar';
    const confirm = window.confirm(`¿${action.toUpperCase()} la camiseta "${nombre}"?`);
    if (!confirm) return;

    try {
      const response = await fetch(`https://amshop-backend.onrender.com/api/productos?id=eq.${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disponible: !disponible }),
      });

      if (response.ok) {
        setProductos(productos.map(p => 
          p.id === id ? { ...p, disponible: !disponible } : p
        ));
        alert(`✅ Camiseta "${nombre}" ${!disponible ? 'disponible' : 'agotada'}`);
      } else {
        alert('❌ Error al actualizar disponibilidad');
      }
    } catch (error) {
      alert("❌ Error de conexión");
    }
  };

  return (
    <div className="product-list">
      <h3>📋 Camisetas Existentes</h3>
      {productos.length === 0 ? (
        <p>No hay camisetas registradas.</p>
      ) : (
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
                    onClick={() => handleToggleDisponible(prod.id, prod.disponible, prod.nombre)}
                    className={prod.disponible ? 'btn-disponible' : 'btn-agotado'}
                  >
                    {prod.disponible ? 'Sí' : 'No'}
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(prod.id, prod.nombre)}
                    className="btn-delete"
                    title="Eliminar camiseta"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;