import mongoose from 'mongoose';
import db from '../../connection/dbConnection.js';

const { Schema } = mongoose;

const searchSchema = new Schema({
  stock: { type: Schema.Types.ObjectId, ref: 'Stock' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

searchSchema.pre(/^find/, function (next) {
  this.populate({ path: 'user', select: 'email' }).populate({
    path: 'stock',
    select: ['name'],
  });
  next();
});

const Search = db.model('Search', searchSchema);
export default Search;
