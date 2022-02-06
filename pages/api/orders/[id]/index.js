import nc from 'next-connect';
import db from '../../../../utils/db';
import Order from '../../../../models/Order';
import { isAuth } from '../../../../utils/auth';

const handler = nc();

handler.use(isAuth);

handler.get(async (req, res) => {
  try {
    await db.connect();
    const order = await Order.findById(req.query.id);

    await db.disconnect();
    res.send(order);
  } catch (error) {
    console.log(error);
  }
});

export default handler;
