import Express from 'express';
import { PurchaseUtil } from '../utils/purchase';
import { PurchaseModel } from '../models/purchase';

const router = Express.Router();
router.get('', async (req, res) => {
  const items = await PurchaseUtil.getPurchases();
  res.send(items);
});
router.get('/store/:id', async (req, res) => {
  const id = req.params.id;
  const items = await PurchaseUtil.getPurchases(id);
  res.send(items);
});
router.post('/create', async (req, res) => {
  const item = PurchaseUtil.createPurchase(req.body);
  res.send({ status: true, result: item });
});
router.patch('/receive/:requestID', async (req, res) => {
  const id = req.params.requestID;
  const item = await PurchaseUtil.receivePurchase(id, req.body);
  res.send({ status: true, result: item });
});
router.patch('/complete/:requestID', async (req, res) => {
  const id = req.params.requestID;
  const item = await PurchaseModel.findOne({ _id: id });
  item.completed = true;
  const result = await item.save();
  res.send({ status: true, result: result });
});
// router.post('/createmany', async (req, res) => {
//   const sales = await SaleUtil.createSales(req.body);
//   res.send({ status: true, result: sales });
// });
export default router;
