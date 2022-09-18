import s from './Btn.module.css';
import PropTypes from 'prop-types';

export default function Btn({ onClick }) {
  return (
    <button
      className={s.Button}
      type="button"
      onClick={onClick}
      disabled={false}
    >
      Show more
    </button>
  );
}

Btn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
