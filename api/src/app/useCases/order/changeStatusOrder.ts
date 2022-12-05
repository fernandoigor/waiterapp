import { Request, Response } from 'express';
import { io } from '../../../index';
import { Order } from '../../models/Order';

export async function changeStatusOrder(req: Request,res: Response){
  const { orderId } = req.params;
  const { status } = req.body;

  if(!['WAITING', 'IN_PRODUCTION', 'DONE'].includes(status)){
    return res.status(400).json({
      error: 'Status should be one of these: WAITING, IN_PRODUCTION, DONE.'
    });
  }

  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true});

  const orderDetails = await order?.populate('products.product');
  io.emit('orders@status', orderDetails);

  res.status(204).json();
}
