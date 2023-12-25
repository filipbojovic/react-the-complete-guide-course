import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const EventDetailPage = () => {
    // use loader of one class inside another class.
    const data = useRouteLoaderData('event-detail');
    const { event, events } = data;

    return (
        <>
            {/* if we want to show the components when all data is retrieved, then wrap
            both components with one <Suspense> */}
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {/* the backend api will actually add 'event' property to data */}
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>

            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvents) => <EventsList events={loadedEvents} />}
                </Await>
            </Suspense>
        </>
    )
};

export default EventDetailPage;

const loadEvent = async (id) => {
    // const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event.' }, { status: 500 });
    }

    const resData = await response.json();
    return resData.event;
}

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

// the react router which calls this loader function passes 2 objects:
// request object
// params - all route params
export const loader = async ({ request, params }) => {
    const id = params.eventId;

    return defer({
        // by addint 'await' in front of loadEvent(id), the defer function waits until the data is loaded before 
        // showing the corresponding (EventDetail) component at all
        // so in this case we won't show the page until the loadEvent(id) is finished, but once that is done, the page will be shown
        // even though loadEvents() is not finished yet.
        event: await loadEvent(id),
        events: loadEvents()
    })
}

export const action = async ({ params, request }) => {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId, {
        method: request.method // the method is set inside EventItem.js - useSubmit hook
    });

    if (!response.ok) {
        throw json({ message: 'Could not delete the event ' + eventId + '.' }, { status: 500 });
    }

    return redirect('/events');
}