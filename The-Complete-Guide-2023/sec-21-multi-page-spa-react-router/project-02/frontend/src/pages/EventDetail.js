import { json, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

const EventDetailPage = () => {
    const data = useRouteLoaderData('event-detail');

    return (
        <>
            {/* the backend api will actually add 'event' property to data */}
            <EventItem event={data.event} />
        </>
    )
};

export default EventDetailPage;

// the react router which calls this loader function passes 2 objects:
// request object
// params - all route params
export const loader = async ({ request, params }) => {
    const id = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event.' }, { status: 500 });
    }

    return response;
}