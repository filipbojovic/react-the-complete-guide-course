import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => { // 'state' the last state of the object managed by the 'useReducer'. 'action' is defined by ourselves.
    if (action.type === 'ADD') {
        // if we would use items.push instead of items.concat, the existing data would be updated in the memory and React wouldn't know about it, so the state wouldn't be updated.
        const existingCartItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    } else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        )
        const existingItem = state.items[existingCartItemIndex]
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) { // then remove the item from array
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

    return defaultCartState;
}

const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = (item) => {
        dispatchCartAction({ // here we define an action (usually by using an object, but it could be also int, or str) which will be used inside cartReducer inorder 
            type: 'ADD',
            item: item
        });
    }
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({ // here we define an action (usually by using an object, but it could be also int, or str) which will be used inside cartReducer inorder 
            type: 'REMOVE',
            id: id
        });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}


export default CartProvider;