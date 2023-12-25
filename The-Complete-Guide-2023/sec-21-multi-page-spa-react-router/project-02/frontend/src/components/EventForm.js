import { Form, useNavigate, useNavigation } from 'react-router-dom';
import { json, redirect } from 'react-router-dom';

import classes from './EventForm.module.css';

// extracting mthod and event from props object by using object destructuring.
function EventForm({ method, event }) {
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // thanks to Form component from react-router-dom, the request won't be sent to backend, but to defined 'action' method.
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button disabled={isSubmitting} type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button disabled={isSubmitting}>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  // receive form data
  const data = await request.formData();

  // forward 'name' parameter of input field
  const eventData = {
    tite: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  };

  let url = 'http://localhost:8080/events';
  console.log('request ' +request.method);
  if (method === 'PATCH') {
    const eventId = params.eventId;
    url += '/' + eventId;
  }

  console.log(eventData)
  const response = await fetch(url, {
    method: method,
    headeres: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/events');

}