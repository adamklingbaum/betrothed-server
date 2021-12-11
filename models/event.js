const mongoose = require('mongoose');
const { guestSchema } = require('./guest');
const states = require('./state');

const eventSchema = new mongoose.Schema({
  coupleName1: {
    type: String,
    required: true,
  },
  coupleName2: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match:
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  addressLine1: {
    type: String,
    required: true,
  },
  addressLine2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: states,
  },
  zipCode: {
    type: String,
    required: true,
    match: /^[0-9]{5}(?:-[0-9]{4})?$/,
  },
  guestLimit: {
    type: Number,
    require: false,
  },
  rsvpDeadline: {
    type: Date,
    required: true,
  },
  inviteMessage: {
    type: String,
    required: true,
  },
  dashBoardPhotoURL: {
    type: String,
    required: false,
    match:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  },
  bannerPhotoURL: {
    type: String,
    required: false,
    match:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  },
  galleryPhotos: {
    type: Map,
    of: {
      type: String,
      match:
        /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
    },
    required: false,
  },
  colors: {
    type: Map,
    of: { type: String, match: /^#([0-9a-f]{6}|[0-9a-f]{3})$/i },
    required: false,
  },
  guests: {
    type: [guestSchema],
  },
});

module.exports.Event = mongoose.model('Event', eventSchema);
