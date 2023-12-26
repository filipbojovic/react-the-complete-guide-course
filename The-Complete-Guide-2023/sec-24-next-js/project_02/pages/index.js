import MeetupList from "/components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "The First Meetup",
    image:
      "https://s.yimg.com/ny/api/res/1.2/a4EsYUFSaM2PkpTQ.C43gA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUwO2NmPXdlYnA-/https://media.zenfs.com/en/toms_guide_826/2d37c93556506a4dfb1e763b2c8206c1",
    address: "Some address 5, 12345 City",
    description: "First meetup",
  },
  {
    id: "m2",
    title: "The Second Meetup",
    image:
      "https://s.yimg.com/ny/api/res/1.2/a4EsYUFSaM2PkpTQ.C43gA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUwO2NmPXdlYnA-/https://media.zenfs.com/en/toms_guide_826/2d37c93556506a4dfb1e763b2c8206c1",
    address: "Some address 5, 12345 City",
    description: "Second meetup",
  },
  {
    id: "m3",
    title: "The Third Meetup",
    image:
      "https://s.yimg.com/ny/api/res/1.2/a4EsYUFSaM2PkpTQ.C43gA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUwO2NmPXdlYnA-/https://media.zenfs.com/en/toms_guide_826/2d37c93556506a4dfb1e763b2c8206c1",
    address: "Some address 4, 12345 City",
    description: "Third meetup",
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
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

  // an object has to be returned always and it must contain 'props' property
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
    // number of seconds nextJs will wait before regenerates the page for an incoming request. So, every 10s it will regenerate the page if there are incoming requests.
    // that means the page won't be outdated more than 10 seconds.
    revalidate: 10
  };
};

export default HomePage;
