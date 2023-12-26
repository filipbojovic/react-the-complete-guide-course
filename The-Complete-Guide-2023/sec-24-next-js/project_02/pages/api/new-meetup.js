// /api/new-meetup

// req is the incomming request, res is the response to send back
function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const { title, image, address, description } = data;
  }
}

export default handler;
