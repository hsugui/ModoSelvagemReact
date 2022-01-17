import React from 'react'
import './BenefitsCard.css'
import { Col } from 'react-bootstrap'

function ProductCard(props) {

    return (
        <>
            <Col sm={12} lg={4} className="card-beneficio">
                <div className="icone-card"><img src={props.img} alt={props.alt} /></div>
                <div className="texto-card textos-benefits">
                    <span>{props.text}</span><br/>
                    <span className="texto-benefits-menor">{props.text2}</span>
                </div>
            </Col>
        </>
    )
}

export default ProductCard