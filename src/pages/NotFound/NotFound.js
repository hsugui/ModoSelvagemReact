import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import NotFoundImage from '../../assets/imgs/notFound/not-found.png';
import './NotFound.css'

function NotFound(props) {

    return(
        <>
        <title>Modo Selvagem | Página não encontrada</title>
        <Container className="mt-4">
        <Row>
            <Col lg={6} className="align-self-center">
                <h1 className="text-start">Ops, página não encontrada</h1>
                <p className="mt-4"><strong>Erro 404:</strong> O conteúdo não está mais disponível ou o endereço digitado está incorreto.</p>
            </Col>
            <Col lg={6}>
                <img src={NotFoundImage} alt="Erro 404, página não encontrada" />
            </Col>
        </Row>
        </Container>
        </>
    )
}

export default NotFound