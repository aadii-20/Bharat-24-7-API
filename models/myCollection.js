// .models/database.js
const mongoose = require("mongoose");

const myCollectionSchema = new mongoose.Schema({
  source: {
    id: { type: String, default: null },
    name: { type: String, required: true }
  },
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String, required: true },
  publishedAt: { type: Date, required: true },
  content: { type: String, required: true }
}, { collection: 'MyCollection' });


const MyCollection = mongoose.model('MyCollection', myCollectionSchema);
module.exports = MyCollection;
