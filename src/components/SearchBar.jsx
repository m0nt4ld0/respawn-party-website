import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, InputGroup, Button, Dropdown, Image } from 'react-bootstrap';
import { ConsoleContext } from '../contexts/ConsoleContext';

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConsole, setSelectedConsole] = useState(null);
  const navigate = useNavigate();

  const { consoles, loadingConsoles } = useContext(ConsoleContext);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery && selectedConsole) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}&console=${selectedConsole.ID}`);
    }
  };

  return (
    <Form onSubmit={handleSearch}>
      <InputGroup>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-console" disabled={loadingConsoles}>
            {selectedConsole ? (
              <>
                <Image
                  src={selectedConsole.IconURL}
                  alt={selectedConsole.Name}
                  width={20}
                  height={20}
                  rounded
                  className="me-2"
                />
                {selectedConsole.Name}
              </>
            ) : (
              'Consola'
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {consoles.map((c) => (
              <Dropdown.Item key={c.ID} onClick={() => setSelectedConsole(c)}>
                <Image
                  src={c.IconURL}
                  alt={c.Name}
                  width={20}
                  height={20}
                  rounded
                  className="me-2"
                />
                {c.Name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Form.Control
          type="text"
          placeholder="Buscar juego..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mx-2"
        />

        <Button type="submit" variant="primary">Buscar</Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
