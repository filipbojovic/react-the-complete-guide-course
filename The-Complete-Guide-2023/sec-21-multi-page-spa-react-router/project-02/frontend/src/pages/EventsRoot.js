import { Outlet } from "react-router-dom";
import EventNavigation from '../components/EventsNavigation'

const EventsRootLayout = () => {
    return (
        <>
            <EventNavigation />
            <Outlet />
        </>
    );
}

export default EventsRootLayout;