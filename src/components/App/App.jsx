import { Component } from 'react';
import Searchbar from '../Searchbar/Searchbar.jsx';
import imageFinder from '../../api/imageFinder.js';
import ImageGallery from '../ImageGallery/ImageGallery.jsx';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem.jsx';
import Loader from '../Loader/Loader.jsx';
import Button from '../Button/Button.jsx';
import Modal from '../Modal/Modal.jsx';
import StyledApp from './App.styled.jsx';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    query: '',
    showModal: false,
    page: 1,
    loadMore: false,
    selectedImage: null,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.getImages();
    }
  }

  getImages = async () => {
    try {
      this.setState({ isLoading: true });
      const resp = await imageFinder(this.state.query, this.state.page);
      const totalHits = resp.totalHits;
      const hits = resp.hits.map(({ id, webformatURL, largeImageURL }) => ({
        id,
        webformatURL,
        largeImageURL,
      }));
      this.setState(prevState => ({
        images:
          prevState.query !== this.state.query
            ? [...hits]
            : [...prevState.images, ...hits],
        loadMore: this.state.page < Math.ceil(totalHits / 12),
      }));
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleFormSubmit = inputValue => {
    const { query } = inputValue;
    this.setState({
      query,
      page: 1,
      images: [],
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleModal = image => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      selectedImage: image,
    }));
  };

  render() {
    const { images, isLoading, showModal, selectedImage, loadMore } =
      this.state;
    return (
      <StyledApp>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery>
          {isLoading && <Loader />}
          {images &&
            images.map(image => (
              <ImageGalleryItem
                imageData={image}
                onShowModal={() => this.handleModal(image)}
              />
            ))}
          {showModal && (
            <Modal imageData={selectedImage} onHideModal={this.handleModal} />
          )}
          {loadMore && <Button loadMore={this.handleLoadMore} />}
        </ImageGallery>
      </StyledApp>
    );
  }
}

export default App;
