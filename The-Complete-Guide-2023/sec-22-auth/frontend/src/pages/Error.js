import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

import PageContent from '../components/PageContent';

function ErrorPage() {
  const error = useRouteError();
  console.log(error);
  console.log(error.data);
  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  if (error.status === 500) {
    console.log(error);
    console.log(error.data);
    message = error.data.message;
  }

  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
