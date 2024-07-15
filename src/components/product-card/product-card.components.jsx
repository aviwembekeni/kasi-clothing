import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;

  const addProductToCart = () => addItemToCart(product);

  const { addItemToCart } = useContext(CartContext);
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        ADD TO CART
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
