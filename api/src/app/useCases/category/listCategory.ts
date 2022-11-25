import { Request, Response } from 'express';
import { Category } from '../../models/Category';

export async function listCategory(req: Request,res: Response){
  const categories = await Category.find();

  res.json(categories);
}
