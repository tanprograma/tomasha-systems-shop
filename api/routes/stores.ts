import Express from 'express';
import { StoreModel } from '../models/store';
import { ProductModel } from '../models/product';
import { Product } from '../../src/app/interfaces/product';
import { InventoryModel } from '../models/inventory';
import { DBUTILS } from './db.utils';

const router = Express.Router();
router.get('', async (req, res) => {
  const items = await StoreModel.find();
  res.send(items);
});
router.post('/create', async (req, res) => {
  const item = await StoreModel.create(req.body);
  await DBUTILS.createInventoryFromStore(item);
  res.send({ result: item, status: true });
});
router.post('/createmany', async (req, res) => {
  const items = await StoreModel.create(req.body);
  await DBUTILS.createInventoryFromManyStores(items);
  res.send({ result: items, status: true });
});

export default router;
