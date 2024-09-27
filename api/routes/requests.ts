import Express from 'express';

import { RequestUtil } from '../utils/request';
const router = Express.Router();
router.get('', async (req, res) => {
  const items = await RequestUtil.getRequests();
  res.send(items);
});
router.get('/store/:id', async (req, res) => {
  const id = req.params.id;
  const items = await RequestUtil.getRequests(id);

  res.send(items);
});
router.get('/store/issued/:id', async (req, res) => {
  const id = req.params.id;
  const items = await RequestUtil.getRequestsIssued(id);

  res.send(items);
});
router.get('/store/received/:id', async (req, res) => {
  const id = req.params.id;
  const items = await RequestUtil.getRequestsReceived(id);

  res.send(items);
});
router.post('/create', async (req, res) => {
  const item = RequestUtil.createRequest(req.body);
  res.send({ status: true, result: item });
});
router.patch('/issue/:requestID', async (req, res) => {
  const id = req.params.requestID;
  const item = await RequestUtil.issueRequest(id, req.body);
  res.send({ status: true, result: item });
});
// router.post('/createmany', async (req, res) => {
//   const sales = await SaleUtil.createSales(req.body);
//   res.send({ status: true, result: sales });
// });
export default router;
