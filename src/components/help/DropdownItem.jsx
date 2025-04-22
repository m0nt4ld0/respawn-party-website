
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';

function DropdownItem({ eventKey, title, content }) {
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>{content}</Accordion.Body>
    </Accordion.Item>
  );
}

DropdownItem.propTypes = {
  eventKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default DropdownItem;