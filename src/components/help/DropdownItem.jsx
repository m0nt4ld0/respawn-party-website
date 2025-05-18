
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';

function DropdownItem({ eventKey, title, content, className }) {
  return (
    <Accordion.Item eventKey={eventKey} className={className}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>{content}</Accordion.Body>
    </Accordion.Item>
  );
}

DropdownItem.propTypes = {
  eventKey: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default DropdownItem;