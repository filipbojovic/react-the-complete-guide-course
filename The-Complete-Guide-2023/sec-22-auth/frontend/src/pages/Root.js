import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  // const navigation = useNavigation();
  // no need to use useRouteLoaderData hook because we are already inside the component for which the loader to retrieve token is defined
  const token = useLoaderData('root');
  const submit = useSubmit(); // it is used to programatically submit a form

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    const remainingTokenDuration = getTokenDuration();
    console.log(remainingTokenDuration);

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, remainingTokenDuration) // ms
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
