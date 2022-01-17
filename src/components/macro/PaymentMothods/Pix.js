import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap'
import './Boleto.css'
import QRCode from '../../../assets/imgs/payment/qr-code-pix.jpg'
import PixImg from "../../../assets/imgs/checkout/pix.png";
import api from '../../../services/Api';
import { useParams } from "react-router-dom";
import { getUserId } from '../../../services/auth';
import Button from '../../../components/micro/Button/Button'

const Pix = () => {

  const { id } = useParams()

  const [order, setOrder] = useState({})

  useEffect(() => {
    api.get(`/success/${id}`)
      .then((response) => {
        // localStorage.removeItem("order-id")
        setOrder(response.data)

      }).catch((err) => {
        console.error("Ops! ocorreu um erro" + err)
      })
  }, [])

  let valorOrder = parseFloat(order.totalPrice)
  valorOrder = valorOrder.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div>
      <title>Modo Selvagem | Pix</title>
      <Container>
        {/* <h1>QR Code para pagamento com PIX</h1> */}
        <div className="d-flex justify-content-center my-5">
          <img className="img-pix-logo" src={PixImg} />
        </div>
        <div className="d-flex justify-content-center">
          <img className="img-pix-qrcode" src={QRCode} alt="Código QR para pagamento com PIX" />
        </div>
        <div className="d-flex justify-content-center mt-2">
          <p className="p-pix-qrcode">Chave PIX: cafb22c0-3164-4fdc-954d-746b1d57f2a8</p>
        </div>
        {/* <div className="d-flex justify-content-center mt-2">
          <p className="pix-p1">Escaneie o código com seu celular</p>
        </div> */}
        <div className="d-flex justify-content-center mt-2">
          <p className="pix-p1">Abra o app do seu banco no celular, escolha Pix e aponte a câmera para o código</p>
        </div>
        <div className="d-flex justify-content-center mt-2">
          <p className="pix-p1">Valor da compra: {valorOrder}</p>
        </div>
        <div className="d-flex justify-content-center">
          <Button route={`/myProfile/account/${getUserId()}/orders/`} className="btn-apoio-boleto d-flex align-self-center mt-4">IR PARA PEDIDOS</Button>
        </div>
      </Container>
    </div>
  );
};

export default Pix