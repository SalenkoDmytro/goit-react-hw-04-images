import s from './Modal.module.css';
import PropTypes from 'prop-types';
const { useEffect } = require('react');

const Modal = ({ largeImageURL, tags, handleClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleClick}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};
