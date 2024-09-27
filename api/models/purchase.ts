import { Schema, model } from 'mongoose';

import { TransactionItem } from '../../src/app/interfaces/transaction-item';
import { Transfer } from '../../src/app/interfaces/request';
import { Purchase } from '../../src/app/interfaces/purchase';
const productSchema = new Schema<TransactionItem>(
  {
    product: String,
    quantity: Number,
    unit: String,
    unit_value: Number,
    received: Number,
    price: Number,
  },
  { _id: false }
);
const schema = new Schema<Purchase>(
  {
    supplier: String,
    destination: String,
    products: [productSchema],
    completed: Boolean,
  },
  { timestamps: true }
);
export const PurchaseModel = model('Purchase', schema);
