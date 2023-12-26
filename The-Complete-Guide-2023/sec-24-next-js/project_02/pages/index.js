import { MongoClient } from "mongodb";
import MeetupList from "/components/meetups/MeetupList";
import Head from "next/head";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// here is not good to use serverSideProps because data doesn't change very frequently (several times in a second).
// export const getServerSideProps = async (context) => {
//   const req = context.req;
//   const res = context.res;

//   // fetch data from api

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// };

export const getStaticProps = async () => {
  // any code specified here will never be run on the client side, but only on the server side.
  // credentials won't be exposed
  const client = await MongoClient.connect(
    "mongodb+srv://fikakv:FikaRbc29!@cluster0.zlwk2qy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();

  // if the collection doesn't exist, it will be created on the fly, the same as db
  const meetupsCollection = db.collection("meetups");

  // it will find all the docs inside meetups collection
  const meetups = await meetupsCollection.find().toArray();
  client.close();
  // an object has to be returned always and it must contain 'props' property
  return {
    props: {
      meetups: meetups.map((mu) => ({
        title: mu.title,
        address: mu.address,
        image: mu.image,
        id: mu._id.toString(),
      })),
    },
    // number of seconds nextJs will wait before regenerates the page for an incoming request. So, every 10s it will regenerate the page if there are incoming requests.
    // that means the page won't be outdated more than 10 seconds.
    revalidate: 10,
  };
};

export default HomePage;
