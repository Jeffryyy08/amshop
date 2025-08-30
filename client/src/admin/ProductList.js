import React, { useState } from 'react';

function AddProduct() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [equipo, setEquipo] = useState('');
  const [imagen_url, setImagenUrl] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!precio || precio <= 0) newErrors.precio = 'El precio debe ser mayor a 0';
    if (!equipo.trim()) newErrors.equipo = 'El equipo es obligatorio';
    if (!imagen_url.trim()) {
      newErrors.imagen_url = 'La URL de la imagen es obligatoria';
    } else if (!imagen_url.trim().match(/\.(jpeg|jpg|png|webp|gif)$/i)) {
      newErrors.imagen_url = 'Debe ser una URL válida de imagen (.jpg, .png, etc.)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!validate()) return;

    const newProduct = {
      nombre: nombre.trim(),
      precio: parseInt(precio),
      equipo: equipo.trim(),
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
        setErrors({});
      } else {
        setMessage('❌ Error al agregar la camiseta');
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor');
    }
  };

  return (
    <div className="add-product">
      <h3>➕ Agregar Nueva Camiseta</h3>
      {message && <p className={message.includes('Éxito') ? 'success' : 'error'}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de la camiseta"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={errors.nombre ? 'error-input' : ''}
        />
        {errors.nombre && <p className="error">{errors.nombre}</p>}

        <input
          type="number"
          placeholder="Precio (COP)"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className={errors.precio ? 'error-input' : ''}
        />
        {errors.precio && <p className="error">{errors.precio}</p>}

        <input
          type="text"
          placeholder="Equipo o selección"
          value={equipo}
          onChange={(e) => setEquipo(e.target.value)}
          className={errors.equipo ? 'error-input' : ''}
        />
        {errors.equipo && <p className="error">{errors.equipo}</p>}

        <input
          type="text"
          placeholder="URL de la imagen (debe terminar en .jpg, .png, etc.)"
          value={imagen_url}
          onChange={(e) => setImagenUrl(e.target.value)}
          className={errors.imagen_url ? 'error-input' : ''}
        />
        {errors.imagen_url && <p className="error">{errors.imagen_url}</p>}

        <button type="submit">Agregar Camiseta</button>
      </form>
    </div>
  );
}

export default AddProduct;