const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

let ArticleSchema = new mongoose.Schema({
  groupIndex: {
    type: Number,
    default: -1
  },
  groupTitle: {
    type: String,
    default: '',
    required: true,
    minlength: 1,
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  icon: {
    type: String,
    default: '/img/logo.png',
  },
  nShow: {
    type: Number,
    default: 0
  },
  date: {
    type: Number,
    default: Date.now()
  },
  id: {
    type: String,
    default: uuidv1()
  },
  itemList: {[
    groupIndex: {
      type: Number,
      required: true,
      default: -1
    },
    groupTitle: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: uuidv1()
    },
    date: {
      type: Number,
      default: Date.now()
    },
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    imgSrc: {
      type: String,
      default: ''
    },
    textSrc: {
      type: String,
      default: ''
    },
    videoSrc: {
      type: String,
      default: ''
    },
    appSrc: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: -1,
      required: true
    },
    commentId: {
      type: String,
      default: '',
      required: true
    },
    author: {
      type: String,
      default: 'Pd'
    },
    nView: {
      type: Number,
      default: 0
    },
    nComment: {
      type: Number,
      default: 0
    }
  ]}
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = {Article};
