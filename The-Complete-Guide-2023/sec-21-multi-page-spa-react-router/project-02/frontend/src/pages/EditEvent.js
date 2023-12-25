import EventForm from '../components/EventForm'
import { useRouteLoaderData } from 'react-router-dom';

const EditEventPage = () => {
    // the same as useLoaderData, but useRouteLoaderData enables the usage of loader from another class (EventDetail.js in this case)
    const data = useRouteLoaderData('event-detail');

    return (
        <EventForm method="patch" event={data.event} />
    )
};

export default EditEventPage;