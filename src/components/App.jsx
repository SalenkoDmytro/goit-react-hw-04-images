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
  };

  componentDidUpdate(_, prevState) {
    const { searchQuery, page } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ isLoading: true });
      this.getData();
    }
  }

  onFormSubmit = async searchQuery => {
    this.setState({ searchQuery, page: 1, images: [] });
  };

  handleClick = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  async getData() {
    const { searchQuery, page } = this.state;
    try {
      const { hits, totalHits } = await getImages(searchQuery, page);
      if (!totalHits) Notiflix.Notify.failure('No results, try again');
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        totalHits,
        isLoading: false,
      }));
    } catch (error) {
      Notiflix.Notify.failure(error.message);
    }
  }

  render() {
    const { images, totalHits, isLoading } = this.state;
    return (
      <div className={s.container}>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery data={images} />
        {!isLoading && images.length > 0 && images.length < totalHits && (
          <Btn onClick={this.handleClick} />
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
