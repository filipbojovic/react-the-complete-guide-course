import EventForm from "../components/EventForm";
import { json, redirect } from "react-router-dom";

const NewEventPage = () => {
    return (
        <EventForm method="post" />
    )
};

export default NewEventPage;