import React, { useState } from 'react'
import api from '../../services/Api'
import Button from '../../components/micro/Button/Button'
import { useHistory } from 'react-router-dom'
import { Col, Form, Row, Spinner, Alert } from 'react-bootstrap'
import './PasswordRecovery.css'

const PasswordRecovery = () => {

    const [formData, setFormData] = useState({
        email : ''
    })
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        setError("");
        setLoading(true);
        e.preventDefault();
        console.log(formData);
        sendRecoveryEmail(formData);
    }

    const sendRecoveryEmail = (formData) => {
        api.post("/forgotPassword", formData)
            .then((response) => {
                setLoading(false);
                history.push("/recoveryEmail")
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    setError("E-mail não cadastrado.");
                } else {
                    setError("Houve um problema com o envio de e-mails, tente novamente mais tarde.");
                }
                setLoading(false);
                console.error("ops! ocorreu um erro", err);
            });
    }
    
    return(
        <>
        <title>Modo Selvagem | Recuperação de senha</title>
            <Form onSubmit={handleSubmit} className=" form-passwordRecovery">
                <h1 className="mt-4 mb-4 text-center">
                    Esqueci minha senha
                </h1>
                {error &&
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                }
                <p className="mt-2 mb-4 text-center custom-paragrafo">
                Para redefinir sua senha, informe seu e-mail cadastrado e lhe enviaremos um link com as instruções.
                </p>
                <Row>
                <Form.Group className="input-group-lg">
                    <Form.Label className="text-input">E-mail</Form.Label>
                    <Form.Control type="email" className="form-control input-padrao" placeholder="Digite seu e-mail" required
                        onChange ={ (e) => setFormData({...formData, email: e.target.value})}
                        value={formData.email}
                    />
                </Form.Group>
                </Row>
                <Row className="mb-5 mt-4">
                    <Col>
                        <Button label="VOLTAR" route="/login" className="btn-apoio btn-apoio-password d-flex align-items-center justify-content-center">
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button className="btn-conversao btn-conversao-password d-flex align-items-center justify-content-center">
                            {loading
                                ?   (  
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    )
                                :   (
                                        "ENVIAR"
                                    )
                            }
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default PasswordRecovery;