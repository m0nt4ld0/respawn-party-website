import React, { useEffect, useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { sanitizeInput } from '../utils/sanitize';

const API_URL = import.meta.env.VITE_MOCKAPI_API_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET;

function CustomProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image_url: '' });
  const [editProductId, setEditProductId] = useState(null);
  const [editProductData, setEditProductData] = useState({ name: '', price: '', description: '', image_url: '' });

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    return data.secure_url;
  };

  const handleCreate = async () => {
    const { name, price } = newProduct;
  
    if (!name.trim()) {
      Swal.fire('Error', 'Debe ingresar un nombre para el producto.', 'error');
      return;
    }
  
    if (isNaN(price) || Number(price) <= 0) {
      Swal.fire('Error', 'El precio del producto debe ser mayor a cero.', 'error');
      return;
    }
  
    const productToCreate = { ...newProduct };
  
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productToCreate),
    })
      .then(res => res.json())
      .then(created => {
        setProducts([...products, created]);
        setNewProduct({ name: '', price: '', description: '', image_url: '' });
  
        Swal.fire({
          icon: 'success',
          title: 'Producto creado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };
  

  const startEdit = (product) => {
    setEditProductId(product.id);
    setEditProductData({
      name: product.name,
      price: product.price,
      description: product.description,
      image_url: product.image_url || ''
    });
  };

  const handleUpdate = () => {
    const { name, price } = editProductData;

    if (!name.trim()) {
      Swal.fire('Error', 'Debe ingresar un nombre para el producto.', 'error');
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      Swal.fire('Error', 'El precio del producto debe ser mayor a cero.', 'error');
      return;
    }

    fetch(`${API_URL}/${editProductId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProductData),
    })
      .then(res => res.json())
      .then(updated => {
        setProducts(products.map(p => (p.id === editProductId ? updated : p)));
        setEditProductId(null);
        setEditProductData({ name: '', price: '', description: '', image_url: '' });
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
        <div className="col-12 col-sm-6 col-md-3">
          <input
            className="form-control"
            value={newProduct.name}
            onChange={e => setNewProduct({ ...newProduct, name: sanitizeInput(e.target.value) })}
            placeholder="Nombre"
          />
        </div>
        <div className="col-6 col-sm-3 col-md-2">
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
            onChange={e => setNewProduct({ ...newProduct, description: sanitizeInput(e.target.value) })}
            placeholder="Descripción"
          />
        </div>
        <div className="col-12 col-md-2">
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files[0];
              if (file) {
                try {
                  const url = await uploadImageToCloudinary(file);
                  setNewProduct({ ...newProduct, image_url: url });
                } catch (err) {
                  Swal.fire('Error', 'Error al subir la imagen.', 'error');
                }
              }
            }}
          />
        </div>
        <div className="col-12 col-md-1 d-grid">
          <button className="btn btn-success" onClick={handleCreate} title="Agregar">
            <FaPlus />
          </button>
        </div>
      </div>


      {newProduct.image_url && (
        <div className="mt-2">
          <img src={newProduct.image_url} alt="Previsualización" style={{ height: '60px' }} />
        </div>
      )}

      <hr className="my-4" />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Imagen</th>
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
                          type="file"
                          className="form-control"
                          accept="image/*"
                          onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                              try {
                                const url = await uploadImageToCloudinary(file);
                                setEditProductData({ ...editProductData, image_url: url });
                              } catch (err) {
                                Swal.fire('Error', 'No se pudo subir la imagen.', 'error');
                              }
                            }
                          }}
                        />
                        {editProductData.image_url && (
                          <img src={editProductData.image_url} alt="Previsualización" style={{ height: '40px', marginTop: '4px' }} />
                        )}
                      </td>
                      <td>
                        <input
                          className="form-control"
                          value={editProductData.name}
                          onChange={e => setEditProductData({ ...editProductData, name: sanitizeInput(e.target.value) })}
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
                          onChange={e => setEditProductData({ ...editProductData, description: sanitizeInput(e.target.value) })}
                          placeholder="Descripción"
                        />
                      </td>
                      <td className="text-end">
                        <div className="d-inline-flex">
                          <button className="btn btn-success btn-sm me-2" onClick={handleUpdate} title="Guardar">
                            <FaSave />
                          </button>
                          <button className="btn btn-secondary btn-sm" onClick={() => setEditProductId(null)} title="Cancelar">
                            <FaTimes />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} style={{ height: '40px' }} />
                        ) : (
                          <em>Sin imagen</em>
                        )}
                      </td>
                      <td>{p.name}</td>
                      <td>${p.price}</td>
                      <td>{p.description}</td>
                      <td className="text-end">
                        <div className="d-inline-flex">
                          <button className="btn btn-primary btn-sm me-2" onClick={() => startEdit(p)} title="Editar">
                            <FaEdit />
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id, p.name)} title="Eliminar">
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
