import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import ThanksImg from '../../assets/imgs/thanks/camping-thanks.jpg'
import './Thanks.css'

function Thanks(props) {

    return(
        <>
        <title>Modo Selvagem | Mensagem enviada</title>
        <Container className="mt-4">
            <Row>
                <Col lg={6} className="align-self-center">
                    <h1 className="text-start">Agradecemos pela mensagem!</h1>
                    <p className="mt-4 mb-5 p-thanks">Em breve entraremos em contato. Fique de olho em seu e-mail.</p>
                    <Link className="btn-thanks" to="/home">Voltar para Home</Link>
                </Col>
                <Col lg={6}>
                    <img src={ThanksImg} alt="Erro 404, página não encontrada" />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default Thanks