import { useState } from 'react';

function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData, // Operador de propagación (Javascript ES6+)
      [name]: value // Copia todo el objeto a uno nuevo y cambia solo el valor de name
    }));
  };

  const resetForm = () => {
    setFormData(initialValues);
  };

  return { formData, handleChange, resetForm };
}

export default useForm;
