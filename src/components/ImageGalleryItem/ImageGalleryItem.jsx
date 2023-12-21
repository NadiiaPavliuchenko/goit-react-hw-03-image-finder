import { Component } from 'react';
import { ImageGalleryLi, ImageGalleryLiImage } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  showModal = () => {
    this.props.onShowModal();
  };
  render() {
    // const key = this.props.imageData[0];
    const { id, webformatURL } = this.props.imageData[1];
    return (
      <ImageGalleryLi key={id}>
        <ImageGalleryLiImage
          src={webformatURL}
          alt="imageStock"
          onClick={this.showModal}
        />
      </ImageGalleryLi>
    );
  }
}

export default ImageGalleryItem;
