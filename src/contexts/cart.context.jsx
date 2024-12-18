import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItems contains productToAdd

  const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  //if found, increment quantity

  if(existingCartItem) {
    return  cartItems.map(cartItem => 
        cartItem.id === productToAdd.id? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    )
  } 

  //return new array with modified cartItems/ new cart item
  return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find cart item to remove 
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  //check if quantity is equal to 1, if it is remove the item from the cart
  if(existingCartItem.quantity === 1 ) {
    return cartItems.filter((cartItem) => cartItem.id !== existingCartItem.id);
  }

  return  cartItems.map(cartItem => 
    cartItem.id === cartItemToRemove.id? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
)
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};


//N.B Reducer should not handle any business logic. Reducer shouldonly worry about updating the state.
const cartReducer = (state, action) => {
  const { type, payload } = action;

  // your payload should be already be what you need to update inside the reducer function
  switch(type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
       ...state,
       ...payload,
      }
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
        return {
       ...state,
       isCartOpen: payload,
      }
    default:
      throw new Error(`Unhandled type of ${type} in CartReducer`);
  }
 }
export  const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    // const [cartItems,  setCartItems] = useState([]);
    // const [cartCount,  setCartCount] = useState(0);
    // const [cartTotal,  setCartTotal] = useState(0);

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    // useEffect(() => {
    //   const newCartCount =  cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
    //   setCartCount(newCartCount)
    // }, [cartItems]);

    // useEffect(() => {
    //   const newCartTotal =  cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);
    //   setCartTotal(newCartTotal)
    // }, [cartItems]);

    const updateCartItemsReducer = (newCartItems) => {  
      
      const newCartTotal =  newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0);

      const newCartCount =  newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
       
       // dispatch new actioin with payload = {
      // newCartItems,
      // newCartCount,
      // newCartTotal
      // }

      dispatch(
        createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}))
    }

    const addItemToCart = (productToAdd) => {
      const  newCartItems = addCartItem(cartItems, productToAdd);
      updateCartItemsReducer(newCartItems);

    }

    const removeItemFromCart = (cartItemToRemove) => {
    const  newCartItems = removeCartItem(cartItems, cartItemToRemove)
    updateCartItemsReducer(newCartItems);

    }

    const clearItemFromCart = (cartItemToClear) => {
    const  newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
      dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool})
    }


    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount, removeItemFromCart, clearItemFromCart, cartTotal};
    
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}