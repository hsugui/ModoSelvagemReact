import React, { useRef } from "react";
import { Container } from 'react-bootstrap'
import { useReactToPrint } from 'react-to-print';
import InvoiceToPrint from "./InvoiceToPrint";
import { getUserId } from '../../../services/auth';
import Button from '../../../components/micro/Button/Button'

const Invoice = () => {
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
      content: () => componentRef.current,
    });
  
    return (
      <div>
        <title>Modo Selvagem | Nota Fiscal</title>
          <Container>
            <h1>Nota de compra</h1>
            <InvoiceToPrint ref={componentRef} />
            <div className="d-flex justify-content-between">
              <Button route={`/myProfile/account/${getUserId()}/orders/`} className="btn-apoio-boleto d-flex align-self-center mt-4">VOLTAR PARA PEDIDOS</Button>
              <button className="btn-boleto mt-4 px-5" onClick={handlePrint}>IMPRIMIR NOTA</button>
            </div>
        </Container>
      </div>
    );
  };

export default Invoice