import {
  BackgroundImage,
  DirectoryItemBody,
  DirectoryItemContainer,
} from "./directory-item.styles";

const DirectoryItem = ({ category }) => {
  const { title, imageUrl } = category;
  return (
    <DirectoryItemContainer>
      <BackgroundImage
        className="background-image"
        imageUrl={imageUrl}
      ></BackgroundImage>
      <DirectoryItemBody className="directory-tem-body">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectoryItemBody>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
