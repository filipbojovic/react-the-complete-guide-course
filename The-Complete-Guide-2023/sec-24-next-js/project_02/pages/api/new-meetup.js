import { MongoClient } from "mongodb";
// /api/new-meetup

// req is the incomming request, res is the response to send back
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://fikakv:FikaRbc29!@cluster0.zlwk2qy.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = client.db();

    // if the collection doesn't exist, it will be created on the fly, the same as db
    const meetupsCollection = db.collection("meetups");

    // inserting document into db. result will be an object with automatically generated ID
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    // close the db connection
    client.close();

    // set status code of the response
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
