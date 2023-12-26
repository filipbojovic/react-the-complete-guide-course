import { Fragment } from "react";
import classess from "../meetups/MeetupDetail.module.css";

const MeetupDetail = (props) => {
  return (
    <section className={classess.detail}>
      <img src={props.image} alt={props.title} />
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <address>{props.address}</address>
    </section>
  );
};

export async function getStaticPaths() {
  // we have to tell the nextJs to pre-generate page for all possible dynamic pages
  return {
    // tells nextJs if paths contains all supported parameter values or just some of them. false means it contains all | true means the nextJs will try dynamically 
    // to generate the page for given meetupId
    fallback: false,
    paths: [
      // one object per version of dynamic page
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  return {
    props: {
      meetupData: {
        image: "",
        title: "Title",
        description: "Descr",
        id: meetupId,
        address: "address",
      },
    },
  };
}

export default MeetupDetail;
