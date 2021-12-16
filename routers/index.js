const express = require('express');
const { Event, Guest, Gift } = require('../models');

const router = express.Router();

router.post('/events', async (req, res) => {
  const { email } = req.body;
  try {
    const search = await Event.findOne({ email });
    if (search) {
      return res
        .status(400)
        .send('An event already with this email already exists');
    }
    const event = new Event(req.body);
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
    if (!result) {
      return res.status(404).send('Event not found');
    }
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
    res.status(400).send(error);
  }
});

router.put('/events/:eventId', async (req, res) => {
  const { eventId } = req.params;
  const update = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    Object.keys(update).forEach((prop) => {
      event[prop] = update[prop];
    });
    await event.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
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
    if (!guest) {
      return res.status(404).send('Guest not found');
    }
    res.status(200).send(guest);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/events/:eventId/guests/:guestId', async (req, res) => {
  const { eventId, guestId } = req.params;
  const update = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const guest = await Guest.findOne({ _id: guestId, event: eventId });
    if (!guest) {
      return res.status(404).send('Guest was not found for this event');
    }
    Object.keys(update).forEach((prop) => {
      guest[prop] = update[prop];
      if (prop === 'rsvpStatus' || prop === 'rsvpNote') {
        guest.rsvpLastUpdated = Date.now();
      }
    });
    await guest.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/events/:eventId/guests/:guestId', async (req, res) => {
  const { eventId, guestId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const guest = await Guest.findOneAndDelete({
      _id: guestId,
      event: eventId,
    });
    if (!guest) {
      return res.status(404).send('Guest was not found for this event');
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/events/:eventId/rsvpData', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const rsvpData = {
      eventId,
      daysToRSVPDeadline: Math.round(
        (event.rsvpDeadline - Date.now()) / (1000 * 3600 * 24)
      ),
    };
    let total = 0;
    const promises = ['attending', 'not attending', 'pending'].map(
      (status) =>
        new Promise((resolve) => {
          Guest.count({ event: eventId, rsvpStatus: status }).then((count) => {
            rsvpData[status] = count;
            total += count;
            resolve();
          });
        })
    );
    Promise.all(promises).then(() => {
      rsvpData.total = total;
      res.status(200).send(rsvpData);
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/events/:eventId/groups', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const result = { eventId };
    result.groups = await Guest.find({ event: eventId }).distinct('group');
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/events/:eventId/gifts', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const gift = new Gift({ ...req.body, event: eventId });
    const result = await gift.save();
    res.status(201).json({ createdGift: result });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/events/:eventId/gifts', async (req, res) => {
  const { eventId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const result = { eventId };
    result.gifts = await Gift.find({ event: eventId });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/events/:eventId/gifts/:giftId/claim', async (req, res) => {
  const { eventId, giftId } = req.params;
  const { guestId } = req.body;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const gift = await Gift.findOne({ _id: giftId, event: eventId });
    if (!gift) {
      return res.status(404).send('Gift was not found for this event');
    }
    const guest = await Guest.findOne({ _id: guestId, event: eventId });
    if (!guest) {
      return res.status(404).send('Guest was not found for this event');
    }
    gift.claimedBy = guestId;
    gift.claimed = true;
    await gift.save();
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/events/:eventId/gifts/:giftId', async (req, res) => {
  const { eventId, giftId } = req.params;
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event was not found');
    }
    const gift = await Gift.findOneAndDelete({
      _id: giftId,
      event: eventId,
    });
    if (!gift) {
      return res.status(404).send('Gift was not found for this event');
    }
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
