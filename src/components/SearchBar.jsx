import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormControl, Button } from 'react-bootstrap';

function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const normalizeText = (text) => {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z\s]/g, '')
      .trim();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanQuery = normalizeText(query);
    if (cleanQuery.length > 0) {
      navigate(`/search?q=${encodeURIComponent(cleanQuery)}`);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <Form className="d-flex" onSubmit={handleSubmit}>
      <FormControl
        type="search"
        placeholder="Buscar juegos"
        className="me-2"
        aria-label="Buscar"
        value={query}
        onChange={handleChange}
      />
      <Button variant="outline-success" type="submit">Buscar</Button>
    </Form>
  );
}

export default SearchBar;
