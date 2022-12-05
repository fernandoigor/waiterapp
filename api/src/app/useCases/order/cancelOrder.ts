import { Request, Response } from 'express';
import { io } from '../../../index';
import { Order } from '../../models/Order';

export async function cancelOrder(req: Request, res: Response){
  try{
    const { orderId } = req.params;

    await Order.findByIdAndDelete(orderId);

    io.emit('orders@cancel', orderId);
    res.status(204).json();
  }
  catch(error){
    console.log(error);
  }


}
