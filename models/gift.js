const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
  },
  url: {
    type: 'String',
    required: true,
    match:
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  },
  metaData: {
    type: 'String',
    required: true,
  },
  claimed: {
    type: 'Boolean',
    required: true,
    default: false,
    validate: {
      validator: function (v) {
        return this.claimedBy ? v : !v;
      },
    },
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: [() => this.claimed, 'claimedBy is required if claimed is true'],
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
  },
});

module.exports.Gift = mongoose.model('Gift', giftSchema);
module.exports.giftSchema = giftSchema;
