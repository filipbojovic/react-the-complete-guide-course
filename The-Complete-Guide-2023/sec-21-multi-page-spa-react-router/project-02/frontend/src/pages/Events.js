import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';
import EventsList from '../components/EventsList';

function EventsPage() {
    const data = useLoaderData();
    const { events } = data;

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
            <Await resolve={events}>
                {/* the function below will be called by the react-router once the data is received. */}
                {(loadedEvents) => <EventsList events={loadedEvents} />}
            </Await>
        </Suspense>
    );

    // ******* the code below is before using defer + Await functions *******
    // const events = data.events;
    // if (data.isError) {
    //     return <p>{data.message}</p>
    // }

    // return (
    //     <>
    //         <EventsList events={events} />
    //     </>
    // );
}

export default EventsPage;

const loadEvents = async () => {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {

        // return {
        //     isError: true,
        //     message: 'Could not fetch events.'
        // }

        // **** alternative way *****
        // throw { message: 'Could not fetch events' }


        // *** another way
        // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), { status: 500 })

        // *** another way by using React Router's helper utility (029)
        throw json({ message: 'Could not fetch events.' }, { status: 500 });

    } else {
        // ************* way 1 **************
        // const resData = await response.json();
        // any data of choice as a first arg, and optional snd argument which could be an object
        // const res = new Response('any data', { status: 201 })

        // ************* way 2 **************
        // react router will make resData available inside EventsPage
        // return resData.events; // .events is how backend-api was defined to send events.


        // ************* way 3 to return data **************
        // return response;


        // *********** code was changed after started using defer function
        const resData = await response.json();
        return resData.events;
    }
}

export const loader = () => {
    return defer({
        events: loadEvents()
    })
}