const express = require('express');
const { Event, Guest } = require('../models');

const router = express.Router();

router.post('/events', async (req, res) => {
  const event = new Event(req.body);
  try {
    const result = await event.save();
    res.status(201).json({ createdEvent: result });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await Event.findById(eventId).lean();
    if (!result) return res.status(404).send('Event not found');
    const guests = await Guest.find({ event: eventId });
    const groupedGuests = {};
    guests.forEach((guest) => {
      const g = guest;
      groupedGuests[g.group] = groupedGuests[g.group] || [];
      groupedGuests[g.group].push(g);
    });
    result.guests = groupedGuests;
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send('Event not found');
  }
});

router.put('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).send('Event not found');
    await Event.findByIdAndUpdate(eventId, req.query, { runValidators: true });
    res.status(204).send();
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/events/:eventId/guests', async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const guestCheck = await Guest.findOne({
      event: eventId,
      email: req.body.email,
    });
    if (guestCheck) {
      return res
        .status(400)
        .send('A guest with this email already exists for this event');
    }
    const guest = new Guest({ ...req.body, event: eventId });
    await guest.save();
    res.status(201).json({ createdGuest: guest });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/events/:eventId/guests', async (req, res) => {
  const { eventId } = req.params;
  const { email } = req.query;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const guest = await Guest.findOne({ event: eventId, email });
    if (!guest) return res.status(404).send('Guest not found');
    res.status(200).send(guest);
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
