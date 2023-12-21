import ButtonLoadMore from './Button.styled';

const Button = props => {
  return (
    <ButtonLoadMore type="button" onClick={props.loadMore}>
      Load More
    </ButtonLoadMore>
  );
};

export default Button;
