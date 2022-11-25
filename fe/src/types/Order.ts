export interface Order {
  _id: string;
  table: string;
  status: 'WAITING' | 'IN_PRODUCITON' | 'DONE';
  products: {
    _id: string;
    quantity: number;
    product:{
      name: string;
      imagePath: string;
      price: number;
    }
  }[]
}
