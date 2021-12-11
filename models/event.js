const mongoose = require('mongoose');
const {guestSchema} = require('./guest');

const eventSchema = new mongoose.Schema({
  coupleName1: {
    type: 'String',
    required: true,
  },
  coupleName2: {
    type: 'String',
    required: true,
  },
  date: {
    type: 'Date',
    required: true,
  },
  venue: {
    type: 'String',
    required: true,
  },
  addressLine1: {
    type: 'String',
    required: true,
  },
  addressLine2: {
    type: 'String',
    required: false,
  },
  city: {
    type: 'String',
    required: true,
  },
  state: {
    type: 'String',
    required: true,
    enum: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
  },
  zipCode: {
    type: 'String',
    required: true,
    // match: /^[0-9]{5}(?:-[0-9]{4})?$/,
  },
  guestLimit: {
    type: 'Number',
    require: false,
  },
  rsvpDeadline: {
    type: 'Date',
    required: true,
  },
  inviteMessage: {
    type: 'String',
    required: true,
  },
  dashBoardPhotoURL: {
    type: 'String',
    required: false
  },
  bannerPhotoURL: {
    type: 'String',
    required: false,
  },
  galleryPhotos: {
    type: 'Map',
    of: 'String',
    required: false
  },
  colors: {
    type: 'Map',
    of: 'String',
    required: false,
    // match: /^#([0-9a-f]{6}|[0-9a-f]{3})$/i
  },
  guests: {
    type: [guestSchema]
  },
});