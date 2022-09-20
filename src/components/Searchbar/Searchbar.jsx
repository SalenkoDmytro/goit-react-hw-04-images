import { useState } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleChange = e => {
    const { value } = e.currentTarget;
    setText(value);
  };

  const reset = () => {
    setText('');
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(text.trim());
    reset();
  };

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormLabel}>Search</span>
        </button>

        <input
          onChange={handleChange}
          value={text}
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };

export default Searchbar;
