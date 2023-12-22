import { useEffect, Fragment } from 'react';
import Cart from './components/Cart/Cart';
import Notification from './components/UI/Notification'
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isInitial = true

function App() {
  const showCart = useSelector(state => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  // it will be run only the first time on app load
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // to prevent 'GET' call to database if the state was changed by using 'replaceCartItems'
    if (!cart.changed) {
      return;
    }

    dispatch(sendCartData(cart));
  }, [cart, dispatch]); // redux will make sure that dispatch function never changes

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.status} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
