import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './OrderDetails.css'
import { useParams } from "react-router-dom";
import Clock from '../../assets/imgs/orderDetails/clock.png'
import Dollar from '../../assets/imgs/orderDetails/dollar.png'
import List from '../../assets/imgs/orderDetails/list.png'
import Van from '../../assets/imgs/orderDetails/van.png'
import FastDelivery from '../../assets/imgs/orderDetails/fast-delivery.png'
import ItemsStatus from '../../components/macro/ItemsOrderStatus/ItemsStatus'
import OrderItemList from '../../components/macro/OrderItemList/OrderItemList'
import Button from '../../components/micro/Button/Button'
import { getUserId } from '../../services/auth'
import api from '../../services/Api'
import { Link } from "react-router-dom";



function OrderDetails(props) {

    const { id } = useParams()
    const [order, setOrder] = useState({})


    useEffect(() => {
        api.get(`/dashboard/account/${getUserId()}/orders/${id}`)
            .then((response) => {
                setOrder(response.data)
            })
    }, [])

    let valorParcelas = parseFloat(order.installmentsValue)
    valorParcelas = valorParcelas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let valorTotalItens = parseFloat(order.totalPrice - order.shippingValue)
    valorTotalItens = valorTotalItens.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let frete = parseFloat(order.shippingValue)
    frete = frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let valorTotal = parseFloat(order.totalPrice)
    valorTotal = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (

        <>

            <title>Modo Selvagem | Detalhes do pedido</title>
            {order.items ?

                <Container>
                    {/* <!-- titulo --> */}
                    <Row className="my-4">
                        <Col xs={12} className="pedido-n">
                            <h2>Pedido #2021{order.id}</h2>
                        </Col>
                    </Row>

                    {/* <!--status do pedido e previsao  --> */}
                    <Row className="justify-content-between pb-3">

                        {/* <!-- endereço --> */}
                        <Col lg={9} className="status-pedido">
                            <Row className="titulo-endereco">
                                <span className="endereco-titulo">Endereço de entrega</span>
                            </Row>
                            {order.address ?
                                <Row className="mt-2">
                                    <span>{order.address.street}, {order.address.number}{order.address.complement ? ", " + order.address.complement : ""}</span>
                                    <span>{order.address.district}, {order.address.city} – {order.address.uf} </span>
                                    <span>CEP: {order.address.cep}</span>
                                </Row>
                                : ""}

                        </Col>

                        {/* // <!-- previsao entrega --> */}
                        <Col lg={3} className="previsao">
                            <Row>
                                <Col xs={12} className="previsao-titulo">
                                    <span>Previsão</span>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col xs={12} className="d-flex justify-content-center align-items-center prev-pedido">
                                    <img className="icon-prev" src={FastDelivery} />
                                    <span className="ms-3">Prazo: até {order.deliveryTime} dias úteis após postagem da
                                        encomenda</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                  

                    {/* <!-- resumo pedido, endereço de entrega e forma pagamento --> */}
                    <Row className="justify-content-between mb-4">
                        {/* <!-- resumo pedido --> */}
                        <Col lg={9} className="resumo-pedido2">
                            <Row>
                                <p className="titulo-resumo">Resumo do pedido</p>
                            </Row>

                            {/* <!-- ITENS ENVIO --> */}
                            <OrderItemList itemsOrder={order.items} />
                        </Col>
                        {/* <!-- FIM ITENS ENVIO --> */}

                        
                        <Col lg={3}>
                            <Row>
                                <Col xs={12} className="status-titulo">
                                    <span>Status do pedido</span>
                                </Col>
                            </Row>
                            <Row>
                                <ItemsStatus img={Dollar} className="pedido-realizado2-status d-flex align-self-center" text="Pagamento confirmado" />
                                {/* <ItemsStatus img={Clock} className="pedido-realizado2-status d-flex align-self-center" text="Pedido realizado" /> */}
                            </Row>
                          
                            {/* <!-- forma pagamento --> */}
                            <Row className="mt-3">
                                <Col xs={12} className="pagamento2">
                                    <Row className="titulo-pagamento mt-4">
                                        <span className="endereco-titulo">Forma de pagamento</span>
                                    </Row>
                                    {order.paymentMethod ?
                                        <Row className="mt-2 mb-2">
                                            <span><b>{order.paymentMethod.paymentMethodName}</b></span>
                                            {/* {order.paymentMethod.paymentMethodName === "Boleto" ? <Link className="link-pix-boleto mt-2" to={`/myProfile/account/${getUserId()}/orders/${order.id}/boleto/${order.id}`}>Acesse o boleto aqui</Link> : order.paymentMethod.paymentMethodName === "Pix" ? <Link  className="link-pix-boleto" to={`/myProfile/account/${getUserId()}/orders/${order.id}/pix/${order.id}`}>Acesse a chave pix aqui</Link> : 
                                            <span>{order.installmentsNumber}x de {order.installmentsValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>} */}
                                            {order.paymentMethod.id == 3 ? <span>{order.installmentsNumber}x de {order.installmentsValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> : ""}
                                        </Row>
                                        : ""}
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="status-titulo mt-2">
                                    <span>Nota fiscal</span>
                                </Col>
                                <Row>
                                    <Link className="link-pix-boleto mt-2" to={`/myProfile/account/${getUserId()}/orders/${order.id}/invoice/${order.id}`}>Acesse a Nota Fiscal aqui</Link>
                                </Row>
                            </Row>
                        </Col>
                       
                    </Row>
                    {/* <!-- fim resumo pedido, endereço de entrega e forma pagamento --> */}

{/* 
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

                            </Col> */}

                    {/* <!-- valor total --> */}
                    <Row className="align-items-center">
                        <Col xs={6} className="geral-total">
                        <Row className="mt-2 align-items-center">
                            <Row className="mt-4 mb-2">
                                    <span className="valores2">Valor dos itens: <span className="valor-pedido">{valorTotalItens}</span></span>
                                </Row>
                                <Row className="mb-2">
                                    <span className="valores2">Valor do frete: <span className="valor-pedido">{frete}</span></span>
                                </Row>
                                <Row className="mb-4">
                                    <span className="total-pedido-checkout2">
                                        Total do pedido: <span className="ms-1 valor-pedido"><b>{valorTotal}</b></span>
                                    </span>
                                </Row>
                                </Row>
                            {/* <p className="itens-total">Valor dos itens: <b>{valorTotalItens}</b></p>
                            <p className="itens-total">Valor do frete: <b>{frete}</b></p>
                            <p className="total-pedido">Total do pedido: <b>{valorTotal}</b></p> */}
                        </Col>

                        {/* <!-- botao voltar --> */}
                        <Col xs={6} className="botao-voltar d-flex justify-content-end align-self-end">
                            <Button route={`/myProfile/account/${getUserId()}/orders`} className="btn-apoio btn-apoio-order d-flex align-items-center justify-content-center">IR PARA MEUS PEDIDOS</Button>
                        </Col>
                    </Row>
                </Container>
                : ""}
        </>
    )
}

export default OrderDetails