import { Component } from 'react';
import Notiflix from 'notiflix';
import s from './App.module.css';
import Btn from './Btn';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Searchbar from './Searchbar';
import getImages from './services';

export class App extends Component {
  state = {
    searchQuery: null,
    images: [],
    page: 1,
    totalHits: 0,
    isLoading: false,
    error: null,
  };

  onFormSubmit = async searchQuery => {
    if (this.state.searchQuery === searchQuery)
      return Notiflix.Notify.warning('Please, enter another search parameters');
    this.setState({ isLoading: true });

    try {
      const {
        data: { hits, totalHits },
      } = await getImages(searchQuery, 1);
      if (!totalHits) Notiflix.Notify.failure('No results, try again');
      this.setState(_ => ({
        searchQuery,
        images: [...hits],
        page: 1,
        totalHits: totalHits,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      Notiflix.Notify.failure(`Error - ${error.message}`);
    }
  };

  handleClick = async () => {
    try {
      const { page, searchQuery } = this.state;
      this.setState({ isLoading: true });

      const {
        data: { hits },
      } = await getImages(searchQuery, page + 1);
      if (hits.length === 0) Notiflix.Notify.failure('No results, try again');

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        page: prevState.page + 1,
        isLoading: false,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      Notiflix.Notify.failure(`Error - ${error.message}`);
    }
  };

  render() {
    const { images, totalHits, isLoading, error } = this.state;
    return (
      <div className={s.container}>
        <Searchbar onSubmit={this.onFormSubmit} />
        {error && <h2>Ooops, something went wrong. Please, reload page</h2>}
        <ImageGallery data={images} />
        {!isLoading && images.length > 0 && images.length < totalHits && (
          <Btn onClick={this.handleClick} />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
