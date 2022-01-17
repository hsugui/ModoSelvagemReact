import React, { useRef } from "react";
import { Container } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print';
import './Boleto.css'
import ComponentToPrint from '../PaymentMothods/ComponentToPrint'
import { getUserId } from '../../../services/auth';
import Button from '../../../components/micro/Button/Button'

const Boleto = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div>
      <title>Modo Selvagem | Boleto</title>
      <Container>
        <h1>Boleto de pagamento</h1>
        <ComponentToPrint ref={componentRef} />
        <div className="d-flex justify-content-between">
          <Button route={`/myProfile/account/${getUserId()}/orders/`} className="btn-apoio-boleto d-flex align-self-center mt-4">IR PARA PEDIDOS</Button>
          <button className="btn-boleto mt-4 px-5" onClick={handlePrint}>IMPRIMIR BOLETO</button>
        </div>
      </Container>
    </div>
  );
};

export default Boleto