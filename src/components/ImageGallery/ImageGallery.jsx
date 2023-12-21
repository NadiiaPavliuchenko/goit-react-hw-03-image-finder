import ImageGalleryList from './ImageGallery.styled';

const ImageGallery = props => {
  return <ImageGalleryList>{props.children}</ImageGalleryList>;
};

export default ImageGallery;
