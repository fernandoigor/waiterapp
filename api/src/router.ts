import path from 'node:path';
import { v4 } from 'uuid';

import { Router } from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/category/createCategory';
import { listCategory } from './app/useCases/category/listCategory';
import { listProduct } from './app/useCases/product/listProduct';
import { createProduct } from './app/useCases/product/createProduct';
import { listProductByCategory } from './app/useCases/category/listProductByCategory';
import { listOrder } from './app/useCases/order/listOrder';
import { createOrder } from './app/useCases/order/createOrder';
import { changeStatusOrder } from './app/useCases/order/changeStatusOrder';
import { cancelOrder } from './app/useCases/order/cancelOrder';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback){
      callback(null, path.resolve(__dirname,'..', 'uploads'));
    }
    ,filename(req, file, callback){
      callback(null, `${v4()}-${file.originalname}`);
    }
  })
});

router.get('/categories', listCategory);
router.post('/categories', createCategory);

router.get('/products', listProduct);
router.post('/products', upload.single('image'), createProduct);


router.get('/categories/:categoryId/products', listProductByCategory);



router.get('/orders', listOrder);
router.post('/orders', createOrder);

router.patch('/orders/:orderId', changeStatusOrder);

router.delete('/orders/:orderId', cancelOrder);
