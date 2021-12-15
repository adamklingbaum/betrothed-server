const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: {
    type: 'String',
    required: true,
  },
  metaData: {
    type: 'String',
    required: true,
  },
  claimed: {
    type: 'Boolean',
    required: true,
    default: false,
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guest',
    required: [
      () => this.claimed,
      'guestClaimed is required if claimed is true',
    ],
  },
});

module.exports.Gift = mongoose.model('Gift', giftSchema);
module.exports.giftSchema = giftSchema;
