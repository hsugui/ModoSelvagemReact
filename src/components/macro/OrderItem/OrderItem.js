import React from 'react'
import './OrderItem.css'
import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

function OrderItem(props) {


    let totalPrice = parseFloat(props.totalPrice)
    totalPrice = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <>

            <Row className="produto-order align-items-center mb-3">
                <Col sm={2} lg={3} className="img-order">
                    <Link to={props.path}>
                        <img src={props.img} width="80" />
                    </Link>
                </Col>
                <Col sm={8} lg={6} className="descricao-order">
                    <span className="desc-1">{props.title}</span>
                    <span>{props.description}</span>
                </Col>

                <Col sm={2} lg={3}>
                    <Row className="quantidade-order">
                        <Col xs={12}>
                            <span>Quantidade: {props.quantity}</span>
                        </Col>
                    </Row>

                    <Row className="row valor-order">
                        <Col xs={12}>
                            <span className="valor">{totalPrice}</span>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </>
    )

}

export default OrderItem