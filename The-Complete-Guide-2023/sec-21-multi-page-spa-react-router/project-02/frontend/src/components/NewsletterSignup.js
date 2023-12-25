import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    const fetcher = useFetcher();
    // the fetcher should be used whenever we want to trigger an action or loader without 
    // actually navigating to the page where the loader or action belongs to.
    // in this case it will trigger the action of 'newsletter' page, but it won't load the
    // newsletter component.
    // the difference between <Form> and <fetcher.Form> 038 - 05:30

    // access the data returned on action/loader
    // state can be
    const { data, state } = fetcher;

    useEffect(() => {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state])

    return (
        // fetcher.form will still trigger an action, but it won't initialize a route transition
        <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
            <input
                type="email"
                placeholder="Sign up for newsletter..."
                aria-label="Sign up for newsletter"
            />
            <button>Sign up</button>
        </fetcher.Form>
    );
}

export default NewsletterSignup;