import React from 'react'
import { Col, Row, Accordion } from 'react-bootstrap'
import One from "../../assets/imgs/checkout/1.png";
import Two from "../../assets/imgs/checkout/2.png";
import Three from "../../assets/imgs/checkout/3.png";
import PixImg from "../../assets/imgs/checkout/pix.png";
import './Checkout.css';

function Pix(props) {

    return (
        <>

            <div className=" mb-3 accordion-item-custom">
                <div className="mt-2 mb-2 text-center"><p>Nesta opção um código Pix será gerado ao finalizar o pedido.</p></div>

                <Row className="d-flex justify-content-center mb-4">
                    <img className="pix-img " src={PixImg} alt="Pix"/>
                </Row>
                <Row>
                    <Col lg={1} sm={2} className="me-0 pe-0 ps-4 pt-3">
                        <img className="numero-pix" src={One} alt="Número 1" width="40" />
                    </Col>
                    <Col lg={3} sm={10} className="ms-0 ps-0">
                        <p className="p-pix">Finalize sua compra e abra o app do banco na opção Pix</p>
                    </Col>
                    <Col lg={1} sm={2} className="me-0 pe-0 ps-4 pt-3">
                        <img className="numero-pix" src={Two} alt="Número 2" width="40" />
                    </Col>
                    <Col lg={3} sm={10} className="ms-0 ps-0">
                        <p className="p-pix">Aponte a câmera do celular para o código ou copie e cole</p>
                    </Col>
                    <Col lg={1} sm={2} className="me-0 pe-0 ps-4 pt-3">
                        <img className="numero-pix" src={Three} alt="Número 3" width="40" />
                    </Col>
                    <Col lg={3} sm={10} className="ms-0 ps-0">
                        <p className="p-pix">Confira os dados e confirme seu pagamento pelo app</p>
                    </Col>
                </Row>

            </div>


        </>
    )
}

export default Pix