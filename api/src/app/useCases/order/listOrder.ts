import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function listOrder(req: Request,res: Response){
  const order = await Order.find()
    .sort({ createdAt: 1 })
    .populate('products.product');

  res.json(order);
}
