import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { Order } from '../../types/Order';
import api from '../../utils/api';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';


export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo('http://127.0.0.1:3001', {
      transports: ['websocket']
    });
    socket.on('orders@new', (order) =>{
      setOrders( (prevState) => prevState.concat(order));
    });
    socket.on('orders@status', (order) =>{
      setOrders( (prevState) => prevState.map(prevOrder => prevOrder._id === order._id ? order : prevOrder));
    });
    socket.on('orders@cancel', (orderId) =>{
      setOrders( (prevState) => prevState.filter(prevOrder => prevOrder._id !== orderId));
    });
  }, []);

  useEffect (() => {
    api.get('/orders')
      .then((response)=>{
        setOrders(response.data);
      });
  }, []);

  function handleCancelOrder(orderId: string){
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleChangeOrder(orderId: string, status: Order['status']){
    setOrders((prevState) => prevState.map((order ) =>(
      order._id === orderId
        ? { ...order, status}
        : order
    )));
  }

  return (
    <Container>
      <OrdersBoard
        icon='⏱'
        title='Fila de espera'
        orders={orders.filter(order => order.status === 'WAITING')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrder}
      />
      <OrdersBoard
        icon='🥘'
        title='Preparando...'
        orders={orders.filter(order => order.status === 'IN_PRODUCTION')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrder}
      />
      <OrdersBoard
        icon='✅'
        title='Pronto'
        orders={orders.filter(order => order.status === 'DONE')}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrder}
      />
    </Container>
  );
}
