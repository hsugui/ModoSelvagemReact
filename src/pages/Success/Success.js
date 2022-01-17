import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap'
import './Success.css'
import BarracaImg from '../../assets/imgs/success/barraca_camp.jpg'
import FacaImg from '../../assets/imgs/success/faca.jpg'
import api from '../../services/Api';
import { getUserId } from '../../services/auth';


function Success(props) {

    const orderId = JSON.parse(localStorage.getItem("order-id"))
    const [order, setOrder] = useState({})
    useEffect(() => {
        api.get(`/success/${orderId}`)
            .then((response) => {
                // localStorage.removeItem("order-id")
                setOrder(response.data)
            }).catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    let totalPrice = order.totalPrice - order.shippingValue
    totalPrice = totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });


    return (
        <>
            <title>Modo Selvagem | Sucesso</title>

            {
                order.items ?
                    <Container>

                        {/* <!-- Bloco pedido realizado --> */}


                        <Row className="pedido-realizado-sucesso">
                            <Col xs={12} className="texto">
                                <span className="linha1-pedido-realizado">Pedido realizado!</span>
                                <span className="linha2-pedido-realizado">Número do pedido: #2021{order.id}</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} className="p-0">
                                <div className="box">
                                    <h3 className="header-box-success">Endereço</h3>
                                    <span className="box-info">{order.address.street}, {order.address.number}{order.address.complement ? ", " + order.address.complement : ""} </span>
                                    <span className="box-info">{order.address.district}, {order.address.city} – {order.address.uf}</span>
                                    <span className="box-info">CEP: {order.address.cep}</span>
                                </div>
                            </Col>
                            <Col lg={4} className="p-0">
                                <div className="box">
                                    <h3 className="header-box-success">Frete</h3>
                                    <span className="box-info">Entrega {order.deliveryType.toLowerCase()} (em até {order.deliveryTime} dias úteis) </span>
                                    <span className="box-info">{order.shippingValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </Col>
                            <Col lg={4} className="p-0">
                                <div className="box col-lg-12">
                                    <h3 className="header-box-success">Forma de pagamento</h3>
                                    <span className="box-info">{order.paymentMethod.paymentMethodName}</span>
                                    {order.paymentMethod.paymentMethodName === "Boleto" ? <Link className="link-pix-boleto" to={`/success/boleto/${order.id}`}>Acesse o boleto aqui</Link> : order.paymentMethod.paymentMethodName === "Pix" ? <Link className="link-pix-boleto" to={`/success/pix/${order.id}`}>Acesse a chave pix aqui</Link> :
                                        <span className="box-info">{order.installmentsNumber}x de {order.installmentsValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                    }

                                    {/* <span className="box-info">Dividido em 6x</span> */}
                                </div>
                            </Col>
                        </Row>

                        <Row>

                            {/* <!-- resumo pedido --> */}

                            <Col xs={12} className="mt-2 infos-success">

                                <h3 className="header-box-success">Resumo do pedido</h3>


                                {/* <!-- ITENS ENVIO -->
                        <!-- Produto 1 --> */}
                                {order.items.map(item => {
                                    return (
                                        <Row className="produto-success mt-3 align-items-center">
                                            <Col lg={3} sm={2} className="img d-flex justify-content-center align-items-center">
                                                <img src={item.productImage.path} width="80" />
                                            </Col>
                                            <Col lg={6} sm={8} className="descricao-success d-flex flex-column justify-content-center">
                                                <span className="product-name-success">{item.productName}</span>
                                            </Col>

                                            <Col lg={3} sm={2}>
                                                <Row className="quantidade-container-success">
                                                    <Col sm={12} className="">
                                                        <span>Quantidade: {item.quantity}</span>
                                                    </Col>
                                                </Row>

                                                <Row className="valor-container-success">
                                                    <Col sm={12} className="">
                                                        <span>{item.netValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    )
                                })}
                            </Col>
                            {/* <!-- FIM ITENS ENVIO --> */}

                        </Row>

                        {/* <!-- Pagamento --> */}


                        <Row>
                            <Col xs={12} className="d-flex justify-content-end my-5">
                            <Row className="mt-2 align-items-center">
                            <Row className="mt-4 mb-2">
                                    <span className="valores">Valor dos itens: <span className="valor-pedido">{totalPrice}</span></span>
                                </Row>
                                <Row className="mb-2">
                                    <span className="valores">Valor do frete: <span className="valor-pedido">{order.shippingValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
                                </Row>
                                <Row className="mb-4">
                                    <span className="total-pedido-checkout">
                                        Total do pedido: <span className="ms-1 valor-pedido"><b>{order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</b></span>
                                    </span>
                                </Row>
                                </Row>

                            </Col>
                        </Row>



                        {/* <!-- Botões --> */}

                        <Row className="pt-3 pb-4 justify-content-end align-items-end">
                            <Col xs={12} className="d-flex justify-content-end col-botoes flex-wrap">
                                <Link className="btn-pedido btn-conversao" to={`/myProfile/account/${getUserId()}/orders/${order.id}`}>ACOMPANHAR PEDIDO</Link>
                                <Link className="btn-pedido btn-conversao" to="/">IR PARA HOME</Link>
                            </Col>
                        </Row>

                    </Container>

                    : ""}
        </>
    )
}

export default Success