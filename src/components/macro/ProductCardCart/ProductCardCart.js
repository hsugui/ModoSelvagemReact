import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCardCart.css'
import Button from '../../micro/Button/Button'
import { Col, Row, ButtonGroup } from 'react-bootstrap'
import DeleteImg from '../../../assets/imgs/cart/delete.png'

function ProductCardCart(props) {
    let precoVista = parseFloat(props.precoVista)
    precoVista = precoVista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let precoParcelado = (parseFloat(props.precoVista) / 6)
    precoParcelado = precoParcelado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let subtotal = (parseFloat(props.precoVista) * (props.qtdSubtotal)) // vai mudar pela quantidade do item no carrinho
    subtotal = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <>

            <Row className="produto-1">

                {/* <!-- imagem --> */}
                <Col sm={3} lg={2} className="img d-flex justify-content-center pt-3 pb-3 responsivo1">
                    <Link to={props.path}>
                        <img className="img1" src={props.img} />
                    </Link>
                </Col>

                {/* <!-- descrição --> */}
                <Col sm={6} lg={3} className="descricao d-flex flex-column justify-content-center responsivo1">
                    <span className="desc-1">{props.title}</span>
                    {/* <span>{props.description}</span> */}
                </Col>

                {/* <!-- preço unitário --> */}
                <Col sm={3} lg={2} className="preco d-flex align-items-center justify-content-center responsivo1">
                    <span>{precoVista}</span>
                </Col>

                {/* <!-- quantidade --> */}
                <Col sm={4} lg={2} className="quantidade d-flex align-items-center justify-content-center responsivo2">
                    <Row>
                        <Col sm={12} className=" flex-wrap d-flex align-items-center justify-content-center flex-column">
                            <Row>
                                <Col sm={12}>
                                    <ButtonGroup className="mb-1" role="group" aria-label="Basic mixed styles example">
                                        <Button onclick={props.sub} className=" btn-menos"><b>-</b></Button>
                                        <Button className=" qtd">{props.qtd} </Button>
                                        <Button disabled={props.disabled} onclick={props.add} className=" btn-mais"><b>+</b></Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="qtd-max-cart">
                                        {props.qtdMax}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>

                {/* <!-- subtotal --> */}
                <Col lg={2} sm={4} className="preco d-flex align-items-center justify-content-center responsivo2">
                    <span>{subtotal}</span>
                </Col>

                {/* <!-- excluir --> */}
                <Col lg={1} sm={4} className="excluir d-flex align-items-center justify-content-center responsivo2">
                    <Button onclick={props.remove} className="botao-excluir"> <img src={DeleteImg} width="20" height="20" /> </Button>
                </Col>
            </Row>

        </>
    )

}

export default ProductCardCart
