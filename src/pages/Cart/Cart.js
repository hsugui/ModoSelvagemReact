import React from 'react'
import './Cart.css'
import { Row, Col, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductListCart from '../../components/macro/ProductListCart/ProductListCart'
import Button from '../../components/micro/Button/Button'
import { isAuthenticated } from '../../services/auth'

function Cart(props) {

    let cartList = localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    let total = 0;
    if (cartList != undefined) {
        cartList.forEach(element => {
            let totalItem = element.qtd * element.price;
            total = total + totalItem;
        });
    }

    const cleanAll = () => {
        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []

        if (cartList != undefined) {
            localStorage.removeItem("cart");
        }

        localStorage.setItem('qtyCart',0)

        window.location.reload();
    }

    total = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    if (cartList.length >= 1) {

        return (
            <>
            <title>Modo Selvagem | Carrinho</title>
                <Container className="page-size">


                    {/* <!-- título meu carrinho --> */}

                    <Row>
                        <Col xs={12} className="text-center meu-carrinho">
                            <h1 className="mt-4">Meu carrinho</h1>
                        </Col>
                    </Row>


                    {/* <!-- tabela carrinho --> */}
                    <Row className="geral justify-content-center">
                        <Col xs={12} className="col-geral">

                            {/* <!-- titulos tabela --> */}
                            <Row className="titulos">
                                <Col xs={5} className="titulo1">
                                    <span>Produto</span>
                                    <span className="responsivo3"> e detalhes</span>
                                </Col>
                                <Col xs={2} className="titulo2 text-center">
                                    <span>Preço unitário</span>
                                </Col>
                                <Col xs={2} className="titulo3 text-center">
                                    <span>Quantidade</span>
                                </Col>
                                <Col xs={2} className="titulo4 text-center">
                                    <span>Subtotal</span>
                                </Col>
                                <Col xs={1} className="titulo5 text-center">
                                    <span>Excluir</span>
                                </Col>
                            </Row>

                            {/* <!-- linha de produtos --> */}

                            <ProductListCart />


                            {/* <!-- frete e preço --> */}
                            <Row className="frete-preco">

                                {/* <!-- preços --> */}
                                <Col lg={12}>
                                    <Row className="precos">
                                        {/* <Col xs={12} className="d-flex flex-column align-items-end justify-content-center mt-2 precos1"> */}
                                        {/* <span className="subtotal">Subtotal: <b>R$ 1.619,90</b></span> */}
                                        {/* <span className="frete2">Frete: <b>R$ 0,00</b></span> */}
                                        {/* </Col> */}
                                        <Col xs={6} className="col-total d-flex align-items-center justify-content-start ps-2 precos2">
                                            <Button onclick={cleanAll} className="limpar-carrinho"><b>Limpar carrinho</b></Button>
                                        </Col>
                                        <Col xs={6} className="col-total d-flex flex-column align-items-end pb-2 precos2">
                                            <span className="total2">Total: <b> {total} </b></span>
                                        </Col>
                                    </Row>
                                </Col>

                            </Row>
                        </Col>
                    </Row>

                    {/* <!-- Botões --> */}
                    <Row className="pt-4 mt-4 justify-content-end align-items-center botoes-cart">
                        <Link className="link-continuar-comprando-cart btn-compra-cart btn-continuar-compra-cart" to="/home">Continuar comprando</Link>

                        <Link className="link-pagamento-cart btn-compra-cart btn-finalizar-compra-cart" to={ isAuthenticated() ? "/checkout" : "/login"}>Finalizar compra</Link>
                    </Row>
                </Container>

            </>
        )

    } else {
        return (
            <>
            <title>Modo Selvagem | Carrinho</title>
                <Container className="page-size">

                    {/* <!-- título meu carrinho --> */}

                    <Row>
                        <Col xs={12} className="text-center meu-carrinho">
                            <h1 className="mt-4">Meu carrinho</h1>
                        </Col>
                    </Row>

                    {/* <!-- tabela carrinho --> */}
                    <Row className="geral justify-content-center">
                        <Col xs={12} className="col-geral">
                            <h2 className="mt-5 mb-2 d-flex justify-content-center carrinho-vazio">Seu carrinho está vazio</h2>
                            <h5 className="mb-5 d-flex justify-content-center"><Link to='/home' className="link-home-cart" >Voltar para a home</Link></h5>
                        </Col>
                    </Row>


                </Container>

            </>
        )
    }





}

export default Cart