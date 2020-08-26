const express = require('express');
const fs = require('fs').promises;

const app = express();

function checkHttps(request, response, next) {
  // Check the protocol — if http, redirect to https.
  if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    response.redirect("https://" + request.hostname + request.url);
  }
}

app.all("*", checkHttps)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/tickets', async (req, res) => {
  const tickets = await fs.readFile('./data.json');
  const searchParam = req.query.searchText;
  let json = JSON.parse(tickets);
  if (searchParam) {
    json = json.filter(
      (ticket) => ((ticket.title).toLowerCase()).includes(searchParam.toLowerCase()),
    );
  }
  res.send(json);
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  const tickets = await fs.readFile('./data.json');
  const json = JSON.parse(tickets);
  const indexOfTicket = json.findIndex((ticket) => ticket.id === req.params.ticketId);
  json[indexOfTicket].done = true;
  await fs.writeFile('./data.json', JSON.stringify(json));
  res.send({ updated: true });
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  const tickets = await fs.readFile('./data.json');
  const json = JSON.parse(tickets);
  const indexOfTicket = json.findIndex((ticket) => ticket.id === req.params.ticketId);
  json[indexOfTicket].done = false;
  await fs.writeFile('./data.json', JSON.stringify(json));
  res.send({ updated: true });
});

let port;
console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "../build", "index.html"));
  });
} else {
  port = 3001;
  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start the listener!
const listener = app.listen(port, () => {
  console.log("❇️ Express server is running on port", listener.address().port);
});