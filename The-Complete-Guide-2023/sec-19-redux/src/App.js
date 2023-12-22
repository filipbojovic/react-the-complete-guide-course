import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import Header from './components/Header'
import Auth from './components/Auth'
import Counter from './components/Counter';
import UserProfile from './components/UserProfile'


function App() {
  // useSelector always receives a function which receives state as an argument
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return (
    <Fragment>
      <Header />
      {!isAuth && <Auth />}
      {isAuth && <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
