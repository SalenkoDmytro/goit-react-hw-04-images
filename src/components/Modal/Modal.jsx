import s from './Modal.module.css';
import PropTypes from 'prop-types';
const { Component } = require('react');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.handleClose();
    }
  };

  handleClick = e => {
    if (e.currentTarget === e.target) {
      this.props.handleClose();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;
    return (
      <div className={s.Overlay} onClick={this.handleClick}>
        <div className={s.Modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
