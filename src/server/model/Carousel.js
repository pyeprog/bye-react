const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

let carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: ''
  },
  href: {
    type: String,
    default: '',
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  groupTitle: {
    type: String,
    default: ''
  },
  id: {
    type: String,
  },
  index: {
    type: Number,
    required: true
  }
});

const Carousel = mongoose.model('Carousel', carouselSchema);

module.exports = {Carousel};
