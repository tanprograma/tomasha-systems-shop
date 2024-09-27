import { Schema, model } from 'mongoose';

import { TransactionItem } from '../../src/app/interfaces/transaction-item';
import { Transfer } from '../../src/app/interfaces/request';
const productSchema = new Schema<TransactionItem>(
  {
    product: String,
    quantity: Number,
    unit: String,
    unit_value: Number,
    received: Number,
  },
  { _id: false }
);
const schema = new Schema<Transfer>(
  {
    store: String,
    destination: String,
    products: [productSchema],
    completed: Boolean,
  },
  { timestamps: true }
);
export const RequestModel = model('Request', schema);
