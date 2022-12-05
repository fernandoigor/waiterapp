import React, { useEffect } from 'react';
import { Overlay, ModalBody, OrderDetails, Actions } from './styles';

import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';


interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: ()=>void;
  onCancel: ()=> Promise<void>;
  onChange: ()=> Promise<void>;
  isLoading: boolean;
}

export function OrderModal({ visible, order, onClose, onCancel, onChange, isLoading }: OrderModalProps ) {
  useEffect(()=>{
    function handleKeyDown(event: KeyboardEvent){
      if(event.key === 'Escape'){
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if(!visible || !order){
    return null;
  }

  const total = order.products.reduce((acc, {product, quantity}) => acc + (product.price * quantity),0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa 2</strong>
          <button type='button' onClick={onClose} >
            <img src={closeIcon} alt='Ícone de fechar' />
          </button>
        </header>
        <div className="status-container">
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '⏱'}
              {order.status === 'IN_PRODUCTION' && '🥘'}
              {order.status === 'DONE' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Preparando...'}
              {order.status === 'DONE' && 'Pronto'}
            </strong>
          </div>
        </div>
        <OrderDetails>
          <strong>Itens</strong>
          <div className="order-items">
            {
              order.products.map( ({_id, product, quantity}) =>
                <div className="item" key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.name}
                    width="56"
                    height="40"
                  />

                  <span className="quantity">{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <div className="product-detail-price">
                      <span>{formatCurrency(product.price)}</span>
                      <strong>{formatCurrency(product.price * quantity )}</strong>
                    </div>
                  </div>
                </div>)
            }
          </div>
          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </OrderDetails>

        {order.status !== 'DONE' && <Actions>
          <button type='button'
            className='primary'
            onClick={onChange}
            disabled={isLoading}
          >
            <span>
              {order.status === 'WAITING' && '🥘'}
              {order.status === 'IN_PRODUCTION' && '✅'}
            </span>
            <strong>
              {order.status === 'WAITING' && 'Preparando...'}
              {order.status === 'IN_PRODUCTION' && 'Pronto'}
            </strong>
          </button>
          <button
            type='button'
            className='secondary'
            onClick={onCancel}
            disabled={isLoading}
          >
            <strong>Cancelar</strong>
          </button>
        </Actions>
        }
      </ModalBody>
    </Overlay>
  );
}
