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
    const { guests } = result;
    const groupedGuests = {};
    guests.forEach((guest) => {
      guest.group = guest.group || 'Individual';
      groupedGuests[guest.group] = groupedGuests[guest.Group] || [];
      groupedGuests[guest.group].push(guest);
    });
    result.guests = groupedGuests;
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post('/events/:eventId/guests', async (req, res) => {
  const { eventId } = req.params;
  const guest = new Guest(req.body);
  try {
    const eventResult = await Event.findById(eventId);
    if (!eventResult) {
      return res.status(404).send('User was not found');
    }
    eventResult.guests.push(guest);
    eventResult.markModified('guests');
    const guestResult = await eventResult.save();
    res.status(201).json({ createdGuest: guest });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
