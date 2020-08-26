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

module.exports = app;
