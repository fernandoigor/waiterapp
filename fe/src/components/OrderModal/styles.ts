import styled from 'styled-components';

export const Overlay = styled.div`
  left: 0px;
  top: 0;
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export const ModalBody = styled.div`
  background: #FFFFFF;
  width: 480px;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 8px 8px 32px rgba(0,0,0,0.4);


  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
    }

    button {
      line-height: 0;
      border: 0;
      background: transparent;
    }
  }

  .status-container{
    margin-top: 32px;
    small {
      font-size: 14px;
      opacity: 0.8;
    }

    div {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 8px;

    }
  }
`;


export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-weight: 500;
    font-size: 14px;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 16px;
    img {
      border-radius:  6px;
    }
    .item {
      display:flex;
      padding-bottom: 12px;

      & + .item{
        padding-top: 12px;
        border-top: 1px solid rgba(0,0,0,0.1);
      }
      .quantity {
        font-size: 14px;
        color: #666;
        display: block;
        min-width: 24px;
        margin-top: 10px;
        margin-left: 12px;
        margin-right: 2px;
      }
      .product-details {
        width: 100%;
        line-height: 18px;
        display: flex;
        flex-direction: column;
        strong {
          font-size: 16px;
          margin-bottom: 4px;
          max-width: 320px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .product-detail-price{
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #666;

          strong{
            font-size: 14px;
          }
        }
      }
    }


  }
  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;

    span {
      opacity: 0.8;
      font-weight: 500;
      font-size: 14px;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  button:disabled, button:disabled:hover {
    opacity: 0.5;
    cursor: not-allowed;
    background: linear-gradient(60deg, rgba(55,55,55,0.1) 45%, rgba(215,20,20,1) 50%, rgba(55,55,55,0.1) 55%);

    animation: load 7s ease infinite;
    background-size: 400% 400%;
    background-attachment: fixed;
    @keyframes load {
        0% {
            background-position: 0% 0%;
        }
        50% {
            background-position: 100% 100%;
        }
        100% {
            background-position: 0% 0%;
        }
    }
  }

  .primary{
    background-color: #333;
    border-radius: 48px;
    border: 0;
    color: #fff;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .primary:hover{
    background-color: #222;
    color: #FFF;
  }

  .secondary{
    padding: 12px 22px;
    color: #D73035;
    font-weight: bold;
    border: 0;
    background-color: transparent;
    margin-top: 8px;
    border: 2px solid #D73035;
    border-radius: 48px;

  }
  .secondary:hover{
    background-color: #D73035;
    color: #FFF;
  }
`;
