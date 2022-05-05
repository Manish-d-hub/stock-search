import mongoose from 'mongoose';
import db from '../../connection/dbConnection.js';

const { Schema } = mongoose;

const stockSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  weeklyData: [Number],
});

const Stock = db.model('Stock', stockSchema);
export default Stock;
