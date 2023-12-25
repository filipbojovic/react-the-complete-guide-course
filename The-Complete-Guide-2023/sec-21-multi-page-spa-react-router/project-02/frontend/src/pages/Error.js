import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";
import MainNavigation from '../components/MainNavigation'

const ErrorPage = () => {
    const error = useRouteError();
    // if we threw new Response(), then error object will contain status property error.status

    let title = 'An error occurred!';
    let message = 'Something went wrong!';

    if (error.status === 500) {
        // error.data access to the first argument of 'throw new Response(arg1, arg2)
        // message = JSON.parse(error.data).message; JSON.parse is not necessary if we use 'json' function provided by React Router
        message = error.data.message;
    }
    if (error.status === 404) {
        title = 'Not found';
        message = 'Could not find resource or page.';
    }


    return (
        <>
            <MainNavigation />
            <PageContent title={title} />
            <p>{message}</p>
        </>
    )
}

export default ErrorPage;