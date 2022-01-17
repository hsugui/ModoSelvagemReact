import React from 'react'
import './ItemsStatus.css'
import { Col } from 'react-bootstrap'

function ItemsStatus(props) {

    return (
        <>

            <Col xs={12} className={"status-itens text-center pt-3 " + props.className}>
                <img className="icons-status" src={props.img} />
                <span className={"status-descricao " + props.class}>{props.text}</span>
            </Col>

        </>
    )

}

export default ItemsStatus
