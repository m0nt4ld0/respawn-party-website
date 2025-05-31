import React, { useEffect, useState } from 'react';

const API_URL = 'https://683a6f4743bb370a8672b09d.mockapi.io/talentoGames/products';

function CustomProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({ name: '', price: '', description: '' });

  // Leer productos
  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // Crear producto
  const handleCreate = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(created => {
        setProducts([...products, created]);
        setNewProduct({ name: '', price: '', description: '' });
      });
  };

  // Iniciar edición
  const startEdit = (product) => {
    setEditProductId(product.id);
    setEditProductData({ name: product.name, price: product.price, description: product.description });
  };

  // Actualizar producto
  const handleUpdate = () => {
    fetch(`${API_URL}/${editProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProductData),
    })
      .then(res => res.json())
      .then(updated => {
        setProducts(products.map(p => (p.id === editProductId ? updated : p)));
        setEditProductId(null);
        setEditProductData({ name: '', price: '', description: '' });
      });
  };

  // Eliminar producto
  const handleDelete = (id) => {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => {
        setProducts(products.filter(p => p.id !== id));
      });
  };

  return (
    <div>
      <h2>Productos</h2>

      {loading ? <p>Cargando productos...</p> : (
        <ul>
          {products.map(p => (
            <li key={p.id}>
              {editProductId === p.id ? (
                <>
                  <input
                    value={editProductData.name}
                    onChange={e => setEditProductData({ ...editProductData, name: e.target.value })}
                    placeholder="Nombre"
                  />
                  <input
                    type="number"
                    value={editProductData.price}
                    onChange={e => setEditProductData({ ...editProductData, price: e.target.value })}
                    placeholder="Precio"
                  />
                  <input
                    value={editProductData.description}
                    onChange={e => setEditProductData({ ...editProductData, description: e.target.value })}
                    placeholder="Descripción"
                  />
                  <button onClick={handleUpdate}>Guardar</button>
                  <button onClick={() => setEditProductId(null)}>Cancelar</button>
                </>
              ) : (
                <>
                  <b>{p.name}</b> - ${p.price} - {p.description}
                  <button onClick={() => startEdit(p)}>Editar</button>
                  <button onClick={() => handleDelete(p.id)}>Eliminar</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <h3>Agregar Producto</h3>
      <input
        value={newProduct.name}
        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        placeholder="Nombre"
      />
      <input
        type="number"
        value={newProduct.price}
        onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
        placeholder="Precio"
      />
      <input
        value={newProduct.description}
        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
        placeholder="Descripción"
      />
      <button onClick={handleCreate}>Agregar</button>
    </div>
  );
}

export default CustomProduct;
