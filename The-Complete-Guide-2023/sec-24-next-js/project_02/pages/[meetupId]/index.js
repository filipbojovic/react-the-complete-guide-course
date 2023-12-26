import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";
import Head from "next/head";

function MeetupDetails(props) {
  console.log(props);
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
}

export async function getStaticPaths() {
  // here we want to tell nextjs all the possible MeetupDetail pages that should be rendered
  // this is because [/meetupId=] is a dynamic path.
  const client = await MongoClient.connect(
    "mongodb+srv://fikakv:FikaRbc29!@cluster0.zlwk2qy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  // if the collection doesn't exist, it will be created on the fly, the same as db
  const meetupsCollection = db.collection("meetups");

  /* find args:
  1st - filter criteria, there we can specify fields. if it is empty -> find all objects
  2nd - what to extract from the resulting objects. format: fieldName: 0/1 (1 to include it)
  */
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    // when we set the fallback to 'true' or 'blocking' we are telling nextJs that the list of
    // exhaustive which means the nextJs won't return 404 page immediately. Instead it will generate
    // that page on demand and cache it.
    //
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  console.log(meetupId);

  const client = await MongoClient.connect(
    "mongodb+srv://fikakv:FikaRbc29!@cluster0.zlwk2qy.mongodb.net/?retryWrites=true&w=majority"
  );
  const db = client.db();
  // if the collection doesn't exist, it will be created on the fly, the same as db
  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
