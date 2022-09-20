import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import s from './App.module.css';
import Btn from './Btn';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Searchbar from './Searchbar';
import getImages from './services';

export const App = () => {
  const [searchQuery, setSearchQuery] = useState(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getImages(searchQuery, page);
        if (!response.totalHits)
          Notiflix.Notify.failure('No results, try again');
        setImages(prevImages => [...prevImages, ...response.hits]);
        setTotalHits(response.totalHits);
        setIsLoading(false);
      } catch (error) {
        Notiflix.Notify.failure(error.message);
      }
    };

    if (isShown) {
      setIsLoading(true);
      getData();
    }
  }, [searchQuery, page, isShown]);

  const onFormSubmit = async search => {
    setSearchQuery(search);
    setPage(1);
    setImages([]);
    setIsShown(true);
  };

  const handleClick = async () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className={s.container}>
      <Searchbar onSubmit={onFormSubmit} />
      {isShown && <ImageGallery data={images} />}
      {!isLoading && images.length > 0 && images.length < totalHits && (
        <Btn onClick={handleClick} />
      )}
      {isLoading && <Loader />}
    </div>
  );
};
