import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData();
    const events = data.events;

    if (data.isError) {
        return <p>{data.message}</p>
    }

    return (
        <>
            <EventsList events={events} />
        </>
    );
}

export default EventsPage;

export const loader = async () => {
    const response = await fetch('http://localhost:8080/eventss');


    if (!response.ok) {

        // return {
        //     isError: true,
        //     message: 'Could not fetch events.'
        // }

        // **** alternative way *****
        throw { message: 'Could not fetch events' }
    } else {
        // ************* way 1 **************
        // const resData = await response.json();
        // any data of choice as a first arg, and optional snd argument which could be an object
        // const res = new Response('any data', { status: 201 })

        // ************* way 2 **************
        // react router will make resData available inside EventsPage
        // return resData.events; // .events is how backend-api was defined to send events.


        // ************* way 3 to return data **************
        return response;
    }
}