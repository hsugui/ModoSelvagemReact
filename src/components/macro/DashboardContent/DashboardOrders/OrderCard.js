import React from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './DashboardOrders.css'

function OrderCard(props) {

    
    let price = parseFloat(props.valor)
    price = price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <>

                <div className="pedido">
                    <Col sm={12} lg={2} className="descricao-pedido">
                        <span className="titulo-descricao">N° do pedido</span>
                        <span className="conteudo-descricao">#2021{props.numero}</span>
                    </Col>
                    <Col sm={12} lg={3} className="descricao-pedido">
                        <span className="titulo-descricao">Data</span>
                        <span className="conteudo-descricao">{props.data}</span>
                    </Col>
                    <Col sm={12} lg={2} className="col-sm-12 col-lg-2 descricao-pedido">
                        <span className="titulo-descricao">Status</span>
                        <span className="conteudo-descricao">{props.status}</span>
                    </Col>
                    <Col sm={12} lg={2} className="col-sm-12 col-lg-2 descricao-pedido">
                        <span className="titulo-descricao">Valor</span>
                        <span className="conteudo-descricao">{price}</span>
                    </Col>
                    <Col sm={12} lg={3} className="col-sm-12 col-lg-3 descricao-pedido">
                        <Link to={props.path} onClick={props.onClick} className="btn-detalhes">Ver detalhes</Link>
                    </Col>
                </div>

        </>
    )
}

export default OrderCard