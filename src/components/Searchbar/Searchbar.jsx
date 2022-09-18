import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  state = { text: '' };

  handleChange = e => {
    const { type, value } = e.currentTarget;
    this.setState({ [type]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.text.trim());

    this.reset();
  };

  reset = () => {
    this.setState({ text: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormLabel}>Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.text}
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = { onSubmit: PropTypes.func.isRequired };
