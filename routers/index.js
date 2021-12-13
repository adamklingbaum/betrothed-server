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
    const result = await Event.findById(eventId).populate('guests');
    /* const { guests } = result;
    const groupedGuests = {};
    guests.forEach((guest) => {
      groupedGuests[guest.group] = groupedGuests[guest.group] || [];
      groupedGuests[guest.group].push(guest);
    });
    result.guests = groupedGuests; */
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
    const eventResult = await Event.findById(eventId);
    if (!eventResult) {
      return res.status(404).send('Event was not found');
    }
    const guest = new Guest(req.body);
    guest.event = eventResult._id;
    await guest.save();
    res.status(201).json({ createdGuest: guest });
  } catch (error) {
    res.status(400).send(error);
  }
});

/* router.get('/events/:eventId/guests/:guestEmail', async (req, res) => {
  console.log('recevied');
  const { eventId, guestEmail } = req.params;
  try {
    const result = await Event.findById(eventId).populate()
      'guests.email': guestEmail,
    });
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}); */

module.exports = router;
