import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';

const API_URL = process.env.VITE_MOCKAPI_API_URL;

function CustomProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

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

  const startEdit = (product) => {
    setEditProductId(product.id);
    setEditProductData({ name: product.name, price: product.price, description: product.description });
  };

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

  const handleDelete = (id, name) => {
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `¿Querés eliminar el producto "${name}"? Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/${id}`, { method: 'DELETE' })
          .then(() => {
            setProducts(products.filter(p => p.id !== id));
            Swal.fire({
              title: 'Eliminado',
              text: `El producto "${name}" fue eliminado exitosamente.`,
              icon: 'success',
              timer: 1500,
              showConfirmButton: false
            });
          });
      }
    });
  };

  return (
    <div className="container mt-4">
      <h3>Agregar Producto</h3>
      <div className="row g-2 align-items-end">
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
            placeholder="Nombre"
          />
        </div>
        <div className="col-12 col-md-3">
          <input
            type="number"
            className="form-control"
            value={newProduct.price}
            onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
            placeholder="Precio"
          />
        </div>
        <div className="col-12 col-md-4">
          <input
            className="form-control"
            value={newProduct.description}
            onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
            placeholder="Descripción"
          />
        </div>
        <div className="col-12 col-md-1 d-grid">
          <button
            className="btn btn-success"
            onClick={handleCreate}
            title="Agregar"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      <hr className="my-4" />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descripción</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  {editProductId === p.id ? (
                    <>
                      <td>
                        <input
                          className="form-control"
                          value={editProductData.name}
                          onChange={e => setEditProductData({ ...editProductData, name: e.target.value })}
                          placeholder="Nombre"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={editProductData.price}
                          onChange={e => setEditProductData({ ...editProductData, price: e.target.value })}
                          placeholder="Precio"
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={editProductData.description}
                          onChange={e => setEditProductData({ ...editProductData, description: e.target.value })}
                          placeholder="Descripción"
                        />
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex">
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={handleUpdate}
                            title="Guardar"
                          >
                            <FaSave />
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditProductId(null)}
                            title="Cancelar"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.description}</td>
                      <td className="text-end">
                        <div className="d-inline-flex">
                          <button
                            className="btn btn-primary btn-sm me-2"
                            onClick={() => startEdit(p)}
                            title="Editar"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(p.id, p.name)}
                            title="Eliminar"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CustomProduct;
