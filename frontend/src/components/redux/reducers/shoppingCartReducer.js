import ACTIONS from '../actions';

const CART_INITIAL_STATE = {
  cartItems: [],
};

 const shoppingCartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS .ADD_TO_CART:
      const item = action .payload;
      // console.log(item)

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case ACTIONS .REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return state;
  }
};

export default shoppingCartReducer