import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let events = [];
let registrations = [];

app.get('/events', (req, res) => {
  res.json(events);
});

app.post('/events', (req, res) => {
  const { title, date, organizer } = req.body;
  const newEvent = { id: events.length + 1, title, date, organizer };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

app.get('/events/:id', (req, res) => {
  const event = events.find(e => e.id === parseInt(req.params.id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).send('Event not found');
  }
});

app.put('/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (event) {
      const { title, date, organizer, details } = req.body;
      event.title = title || event.title;
      event.date = date || event.date;
      event.organizer = organizer || event.organizer;
      event.details = details || event.details;
      res.json(event);
    } else {
      res.status(404).send('Event not found');
    }
  });

app.delete('/events/:id', (req, res) => {
  const index = events.findIndex(e => e.id === parseInt(req.params.id));
  if (index !== -1) {
    events.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Event not found');
  }
});

app.post('/register', (req, res) => {
    const { eventId, name, email } = req.body;
    const event = events.find(e => e.id === parseInt(eventId));
    if (event) {
      const existingRegistration = registrations.find(r => r.eventId === parseInt(eventId) && r.email === email);
      if (existingRegistration) {
        res.status(400).send('Already registered');
      } else {
        const newRegistration = { eventId: parseInt(eventId), name, email };
        registrations.push(newRegistration);
        res.status(201).send(`Registered for ${event.title}`);
      }
    } else {
      res.status(404).send('Event not found');
    }
  });

app.get('/registrations/:eventId', (req, res) => {
  const eventRegistrations = registrations.filter(r => r.eventId === parseInt(req.params.eventId));
  res.json(eventRegistrations);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
