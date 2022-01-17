import React from 'react'
import './DashboardAddresses'
import { Row, Col, Button } from 'react-bootstrap';



function AddressCard(props) {


    return (
        <>
            <div className="endereco-dashboard">
                <div className="descricao-endereco">{props.street}, {props.number}{props.complement ? "," : ""} {props.complement} – {props.district}, {props.city} – {props.uf}
                    – CEP: {props.cep}</div>
                <div className="opcoes mt-3">
                    <Row>
                        <Col sm={12} lg={6}>
                            <Button onClick={props.onClickEdit} className="botao verde">Editar</Button>
                            <Button onClick={props.onClickDelete} className="botao apoio">Excluir</Button>
                        </Col>
                        {/* <Col sm={12} lg={6} className="div-def-principal">
                            <Button className="botao def-principal verde">Definir como principal</Button>
                        </Col> */}
                    </Row>
                </div>
            </div>
        </>
    )
}

export default AddressCard