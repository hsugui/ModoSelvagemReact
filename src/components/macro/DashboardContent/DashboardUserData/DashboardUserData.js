import React, { useEffect, useState } from 'react'
import { getUserId } from '../../../../services/auth'
import api from '../../../../services/Api'
import { Col, Form, Alert, Modal, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import MaskedInput from '../../../../pages/Register/MaskedInput';

function DashboardUserData(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function reload() {
        window.location.reload();
    }

    const [error, setError] = useState("");
    const [customer, setCustomer] = useState({
        name: '',
        surname: '',
        cpf: '',
        birthDate: '',
        cellPhone: '',
        gender: {
            id: 0
        },
        email: '',
       
    });

    useEffect(() => {
        api.get(`/dashboard/account/${getUserId()}`)
            .then((response) => {
                setCustomer(response.data)
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    const saveCustomer = (customer) => {
        api.put(`/dashboard/account/${getUserId()}`, customer)
            .then((response) => {
                handleShow();
            }
            )
            .catch((err) => {
                setError("ops! ocorreu um erro, favor tentar novamente mais tarde!");
            });
    }

    const handleSubmit = (event) => {
        setError("");
        event.preventDefault();
        event.stopPropagation();
        saveCustomer(customer);
    };

    return (
        <>
            <h1 className="my-3">Dados pessoais</h1>
            <div className="principal">
                <Form className="row g-3" onSubmit={handleSubmit}>
                    {error &&
                        <Alert variant='danger'>
                            {error}
                        </Alert>
                    }
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputNome" className="form-label">Nome</Form.Label>
                        <Form.Control type="text" className="input-padrao" id="inputNome" value={customer.name} onChange={(event) => setCustomer({ ...customer, name: event.target.value })}  />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputSobrenome" className="form-label">Sobrenome</Form.Label>
                        <Form.Control type="text" className="input-padrao" id="inputSobrenome" value={customer.surname} onChange={(event) => setCustomer({ ...customer, surname: event.target.value })}/>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputCPF" className="form-label">CPF</Form.Label>
                        <MaskedInput type="text" mask="999.999.999-99" className="input-padrao" id="inputCPF" value={customer.cpf} disabled={true} />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputDataNasc" className="form-label">Data de nascimento</Form.Label>
                        <Form.Control type="date" className="input-padrao" id="inputDataNasc" value={customer.birthDate} onChange={(event) => setCustomer({ ...customer, birthDate: event.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputEmail" className="form-label">Email</Form.Label>
                        <Form.Control type="email" className="input-padrao" id="inputEmail" value={customer.email} onChange={(event) => setCustomer({ ...customer, email: event.target.value })} />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputTelefone" className="form-label">Telefone</Form.Label>
                        <MaskedInput type="text" mask="(99) 99999-9999" className="input-padrao" id="inputTelefone" value={customer.cellPhone} onChange={(event) => setCustomer({ ...customer, cellPhone: event.target.value })}/>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label for="inputGenero" className="form-label">Gênero</Form.Label>
                        <Form.Select id="inputGenero" className="form-select input-padrao" onChange={(event) => setCustomer({ ...customer, gender: { id: event.target.value } })}>
                                    <option value="1" selected={customer.gender.id == 1}>Masculino</option>
                                    <option value="2" selected={customer.gender.id == 2}>Feminino</option>
                                    <option value="3" selected={customer.gender.id == 3}>Prefiro não informar</option>
                        </Form.Select>
                    </Form.Group>
                    <div className="col-md-6 d-flex align-items-end justify-content-end">
                        <button className="btn-custom">SALVAR</button>
                    </div>
                </Form>
            </div>

            {/* <!-- MODAL INDICANDO QUE DEU CERTO --> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Alteração de dados</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Suas alterações foram salvas com sucesso!
                </Modal.Body>

                <Modal.Footer>
                    <Row>
                        <Col lg={12}>
                            <button className="btn btn-apoio" onClick={handleClose, reload}>OK</button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default DashboardUserData