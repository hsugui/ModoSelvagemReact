import React from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'
import Button from '../../micro/Button/Button'
import { Card, Col } from 'react-bootstrap'

function ProductCard(props) {
    let precoParcelado = (parseFloat(props.precoVista) / 6)
    precoParcelado = precoParcelado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    let precoVista = parseFloat(props.precoVista)
    precoVista = precoVista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

    return (
        <>

            <Col sm={12} md={6} lg={4} xxl={3} className="d-flex justify-content-center">
                <Card style={{ width: '18rem' }} className="card-product">
                    <Card.Body>
                        <Link to={props.path} className="card-link">
                        <img src={props.img} className="img-card mb-2" alt="..." />
                        <h5 className="nome-produto">{props.nomeProd}</h5>
                        <span className="preco-avista">{precoVista} <span className="texto-avista">à vista</span></span>
                        <span className="preco-parcelado">6x de {precoParcelado}</span>
                    </Link>
                    <Button onclick={props.onclick} className="btn-conversao btn-comprar my-2">Comprar</Button>
                        </Card.Body>

                </Card>
        </Col>
        </>
    )

}

export default ProductCard
