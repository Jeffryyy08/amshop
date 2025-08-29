import React, { useState } from 'react';

function AddProduct() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [equipo, setEquipo] = useState('');
  const [imagen_url, setImagenUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const newProduct = {
      nombre,
      precio: parseInt(precio),
      equipo,
      imagen_url: imagen_url.trim(),
      disponible: true,
    };

    try {
      const response = await fetch('https://amshop-backend.onrender.com/api/productos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setMessage('✅ Camiseta agregada con éxito');
        setNombre('');
        setPrecio('');
        setEquipo('');
        setImagenUrl('');
      } else {
        setMessage('❌ Error al agregar la camiseta');
      }
    } catch (error) {
      setMessage('❌ Error de conexión');
    }
  };

  return (
    <div className="add-product">
      <h3>➕ Agregar Nueva Camiseta</h3>
      {message && <p className={message.includes('Éxito') ? 'success' : 'error'}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Equipo"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de la imagen"
          value={imagen_url}
          onChange={(e) => setImagenUrl(e.target.value)}
          required
        />
        <button type="submit">Agregar Camiseta</button>
      </form>
    </div>
  );
}

export default AddProduct;