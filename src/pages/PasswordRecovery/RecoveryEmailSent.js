import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import EmailSent from '../../assets/imgs/emailSent/email-sent.png'

function RecoveryEmailSent() {

    return(
        <>
        <title>Modo Selvagem | E-mail enviado</title>
        <Container className="mt-4">
            <Row>
                <Col lg={6} className="align-self-center">
                    <h1 className="text-start">E-mail enviado!</h1>
                    <p className="mt-4 mb-5 p-thanks">As instruções para a redefinição de senha foram enviadas para o seu e-mail.</p>
                    <Link className="btn-thanks" to="/home">Voltar para Home</Link>
                </Col>
                <Col lg={6}>
                    <img src={EmailSent} alt="E-mail enviado" />
                </Col>
            </Row>
        </Container>
        </>
    )
}

export default RecoveryEmailSent