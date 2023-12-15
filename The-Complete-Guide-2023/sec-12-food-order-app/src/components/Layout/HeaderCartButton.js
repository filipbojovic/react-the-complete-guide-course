import CartContext from '../../store/cart-context';
import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';

const HeaderCartButton = (props) => {
    // whenever context changes (inside CartProvider.js), this component will be re-evaluated
    const cartCtx = useContext(CartContext);

    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const { items } = cartCtx;
    const numberOfCartItems = items.reduce((curNumber, item) => {
        return curNumber + item.amount;
    }, 0);
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`; // css classes concatenating

    // here we want to change our btnClasses to include 'bump' class and after a few miliseconds to remove it.
    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        // without setting timer, the button will be bumped only the first time because the bump class will stay assigned
        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        // when we return an anonymous function inside useEffect(), it is considered as a cleanup function.
        return () => {
            clearTimeout(timer);
        };
    }, [items]); // here we don't want to add whole cartCtx to track because this function will be triggered if any of its properties has changed. Therefore we want to extract the amount property.

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;