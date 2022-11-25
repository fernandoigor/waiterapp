import React from 'react';
import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';

const orders: Order[] =[
  {
    '_id': '63752e0a9f9791f1793b83fd',
    'table': '123',
    'status': 'WAITING',
    'products': [
      {
        'product': {
          'name': 'Quatro quehois',
          'imagePath': 'b27ee1d7-30f8-409e-83d0-a7f81d0e3a2b-Captura de Tela 2022-10-28 aÌs 15.50.23.png',
          'price': 20,
        },
        'quantity': 2,
        '_id': '63752e0a9f9791f1793b83fe'
      },
      {
        'product': {
          'name': 'Calabresa',
          'imagePath': 'c2738036-5f74-4c11-b278-3a13b9ce2319-Captura de Tela 2022-10-04 aÌs 09.45.45.png',
          'price': 20,
        },
        'quantity': 1,
        '_id': '63752e0a9f9791f1793b83ff'
      }
    ]
  }
];

export function Orders() {
  return (
    <Container>
      <OrdersBoard
        icon='⏱'
        title='Fila de espera'
        orders={orders}
      />
      <OrdersBoard
        icon='🥘'
        title='Preparando...'
        orders={[]}
      />
      <OrdersBoard
        icon='✅'
        title='Pronto'
        orders={[]}
      />
    </Container>
  );
}
