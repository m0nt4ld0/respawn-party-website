import { useState, useContext, useEffect } from 'react';
import { sanitizeInput } from '../utils/sanitize';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Form,
  Button,
  DropdownButton,
  Dropdown,
  Spinner,
  Row,
  Col,
} from 'react-bootstrap';
import { ConsoleContext } from '../contexts/ConsoleContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchBar({ inputRef }) {
  const navigate = useNavigate();
  const query = useQuery().get('query')?.toLowerCase() || '';
  const selectedConsoleId = useQuery().get('console') || '';

  const { consoles, loadingConsoles } = useContext(ConsoleContext);

  const [searchQuery, setSearchQuery] = useState(query);
  const [selectedConsole, setSelectedConsole] = useState(selectedConsoleId);

  useEffect(() => {
    setSearchQuery(query);
    setSelectedConsole(selectedConsoleId);
  }, [query, selectedConsoleId]);

  const handleSearch = (e) => {
    e.preventDefault();

    const isValidQuery = (input) =>
      /^[a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ\-_.]+$/.test(input);

    if (!isValidQuery(searchQuery.trim())) {
      alert('La búsqueda contiene caracteres no permitidos.');
      return;
    }

    navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}&console=${selectedConsole}`);
  };

  return (
    <Form onSubmit={handleSearch} className="w-100">
      <Row className="g-2 align-items-center">
        <Col xs={12} md="auto">
          <DropdownButton
            id="dropdown-console"
            title={
              loadingConsoles ? (
                <Spinner animation="border" size="sm" />
              ) : selectedConsole ? (
                <>
                  <img
                    src={consoles.find(c => c.ID.toString() === selectedConsole)?.IconURL}
                    alt=""
                    style={{ height: '20px', marginRight: '8px' }}
                  />
                  {consoles.find(c => c.ID.toString() === selectedConsole)?.Name}
                </>
              ) : 'Consola'
            }
            onSelect={setSelectedConsole}
            variant="outline-secondary"
            className="w-100"
          >
            {consoles.map((c) => (
              <Dropdown.Item key={c.ID} eventKey={c.ID}>
                <img
                  src={c.IconURL}
                  alt={c.Name}
                  style={{ height: '20px', marginRight: '8px' }}
                />
                {c.Name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Col>

        <Col xs={12} md="auto">
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder="Buscar juego..."
            id="buscar-juego"
            value={searchQuery}
            onChange={(e) => setSearchQuery(sanitizeInput(e.target.value))}
            className="w-100"
          />
        </Col>

        <Col xs={12} md="auto">
          <Button type="submit" variant="primary" className="w-100">
            Buscar
          </Button>
        </Col>
      </Row>
    </Form>
  );
}

export default SearchBar;
