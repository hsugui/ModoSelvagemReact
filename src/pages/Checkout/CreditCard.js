import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import Mastercard from "../../assets/imgs/checkout/mastercard_curved.png";
import Visa from "../../assets/imgs/checkout/visa_curved.png";
import Diners from "../../assets/imgs/checkout/diners-club.png";
import Amex from "../../assets/imgs/checkout/american_express.png";
import Padlock from "../../assets/imgs/checkout/padlock.png";
import InputMask from 'react-input-mask';
import CreditCardStyle from '../../components/macro/CreditCard/CreditCardStyle';

function CreditCard(props) {

    const [number, setNumber] = useState(1)

    return (
        <>

            <div className="mb-4 accordion-item-custom">

                <div className="ms-4 me-4 mb-2 ">

                    <CreditCardStyle/>


                        <Row>
                            <Col>
                            
                            <Form.Label for="parcelamento" className="label-cartao">Parcelamento</Form.Label>
                            <Form.Select className="form-custom" value={number} aria-label="Default select example"
                            onChange={(event) =>{ 
                             setNumber(event.target.value)
                             props.installmentsFunction(event.target.value)}} required>
                                    <option value="1" selected>1x de {props.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                                    <option value="2">2x de {(props.total / 2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                                    <option value="3">3x de {(props.total / 3).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                                    <option value="4">4x de {(props.total / 4).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                                    <option value="5">5x de {(props.total / 5).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                                    <option value="6">6x de {(props.total / 6).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</option>
                                </Form.Select>
                            </Col>
                            <div className="d-flex justify-content-end">
                                <p className="seguro d-flex mt-4">Ambiente seguro <img className="cadeado" src={Padlock} alt="Cadeado" width="20" /></p>
                            </div>
                        </Row>
                </div>
            </div>


        </>
    )
}

export default CreditCard