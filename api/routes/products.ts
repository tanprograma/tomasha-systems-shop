import Express from 'express';
import { ProductModel } from '../models/product';
import { DBUTILS } from './db.utils';

const router = Express.Router();
router.get('', async (req, res) => {
  const items = await ProductModel.find();
  res.send(items);
});
router.post('/create', async (req, res) => {
  const item = await ProductModel.create(req.body);
  await DBUTILS.createInventoryFromProduct(item);
  res.send({ result: item, status: true });
});
router.post('/createmany', async (req, res) => {
  const items = await ProductModel.create(req.body);
  await DBUTILS.createInventoryFromManyProducts(items);
  res.send({ result: items, status: true });
});

export default router;
