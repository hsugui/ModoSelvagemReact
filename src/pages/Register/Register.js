import React, { useState } from 'react'
import './Register.css'
import { Form, Row, Col, Spinner, Alert, Modal } from 'react-bootstrap'
import Button from '../../components/micro/Button/Button'
import api from '../../services/Api';
import { Link, useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { getElementError } from '@testing-library/dom';

function Register(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const schema = yup.object().shape({
        cpf: yup.string().required("O campo CPF é obrigatório.").min(11, 'O campo CPF deve conter 11 caracteres.'),
        name: yup.string().required('O campo nome é obrigatório.').matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Nome inválido."),
        surname: yup.string().required('O campo sobrenome é obrigatório.').matches(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/, "Sobrenome inválido.")
            .min(3, 'Digite mais que 3 caracteres.').max(50),
        email: yup.string().email('Digite um email válido.').required('O campo e-mail obrigatório.'),
        birthDate: yup.string("Digite ou selecione a data de nascimento.").required("Digite ou selecione a data de nascimento."),
        password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!?().,])[0-9a-zA-Z$*&@#!?().,]{8,}$/, "Sua senha deve conter: Ao menos uma letra maiúscula, um número e um caractere especial."),
        gender: yup.string().required('Selecione um gênero.'),
        // cellPhone: yup.string().required('O campo telefone é obrigatório.'),
        passwordConfirm: yup.string().required('O campo confirmação de senha é obrigatório').oneOf([yup.ref('password')], 'As senhas não são iguais.'),
        emailConfirm: yup.string().required('O campo confirmação de e-mail é obrigatório').oneOf([yup.ref('email')], 'Os e-mails não são iguais.')
    });


    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const { control, register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema)
    });

    const [error, setError] = useState("");

    const customer = {
        name: getValues('name'),
        surname: getValues('surname'),
        cpf: getValues('cpf'),
        birthDate: getValues('birthDate'),
        cellPhone: getValues('cellPhone'),
        gender: {
            id: getValues('gender')
        },
        email: getValues('email'),
        password: getValues('password'),
    }


    const onSubmit = (data) => {
        data =
        {
            cpf: customer.cpf.replace(/[^0-9]/g, ''),
            cellPhone: customer.cellPhone.replace(/[^0-9]/g, ''),
            name: customer.name, surname: customer.surname,
            birthDate: customer.birthDate, gender: customer.gender,
            email: customer.email, password: customer.password
        }

        setLoading(true);
        api.post('/customers', data)
            .then((response) => {
                handleShow();
                setLoading(false);

            }).catch((err) => {
                console.log(err.response)
                setError(err.response.data.message || err.response.data[0].errorMessage);
                setLoading(false);
            });

    }

    return (

        <div className="form-cadastro">
            <title>Modo Selvagem | Cadastro</title>

            <Form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="mt-4 mb-5 text-center">Faça o seu cadastro</h1>
                {error &&
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                }
                <Row>
                    <Form.Group as={Col} controlId="name" className="col-sm-6">
                        <Form.Label className="texto-input">Nome *</Form.Label>

                        <Form.Control className="input-padrao" type="text" placeholder="Digite seu nome"
                            {...register("name", { pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/ })} />
                        <p className="span-err">{errors.name?.message}</p>
                    </Form.Group>

                    <Form.Group as={Col} controlId="surname" className="col-sm-6">
                        <Form.Label className="texto-input">Sobrenome *</Form.Label>

                        <Form.Control className="input-padrao" type="text" placeholder="Digite seu sobrenome"
                            {...register("surname", { pattern: /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/ })} />
                        <p className="span-err">{errors.surname?.message}</p>
                    </Form.Group>
                </Row>


                <Row>
                    <Form.Group as={Col} controlId="cpf" className="col-sm-6">
                        <Form.Label className="texto-input">CPF *</Form.Label>
                        <InputMask mask="999.999.999-99" className="input-padrao" type="text" placeholder="Digite seu CPF"
                            {...register("cpf")} />
                        <p className="span-err">{errors.cpf?.message}</p>
                    </Form.Group>


                    <Form.Group as={Col} controlId="nasc" className="col-sm-6">
                        <Form.Label className="texto-input">Data de Nascimento *</Form.Label>
                        <Form.Control type="date" className="input-padrao" placeholder="Digite sua data de nascimento"
                            {...register("birthDate")} />
                        <p className="span-err">{errors.birthDate?.message}</p>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} controlId="cellphone" className="col-sm-6">
                        <Form.Label className="texto-input">Telefone </Form.Label>
                        <InputMask mask="(99)99999-9999" className="input-padrao" placeholder="Digite seu telefone"

                            {...register("cellPhone")} />
                        {/* <p className="span-err">{errors.cellPhone?.message}</p> */}
                    </Form.Group>

                    <Form.Group as={Col} controlId="gender" className="col-sm-6">
                        <Form.Label className="texto-input">Gênero *</Form.Label>
                        <Form.Select aria-label="Default select example" className="input-padrao"  {...register("gender")}>
                            <option value={null} label="Selecione uma opção"></option>
                            <option value="1" label="Masculino"></option>
                            <option value="2" label="Feminino"></option>
                            <option value="3" label="Prefiro não informar"></option>

                        </Form.Select>
                        <p className="span-err">{errors.gender?.message}</p>
                    </Form.Group>
                </Row>


                <Row>
                    <Form.Group as={Col} controlId="email" className="col-sm-6">
                        <Form.Label className="texto-input">E-mail *</Form.Label>

                        <Form.Control className="input-padrao" placeholder="Digite seu e-mail"
                            {...register("email")}

                        />
                        <p className="span-err">{errors.email?.message}</p>
                    </Form.Group>


                    <Form.Group as={Col} controlId="confirmEmail" className="col-sm-6">
                        <Form.Label className="texto-input">Confirmar e-mail *</Form.Label>
                        <Form.Control type="email" className="input-padrao" placeholder="Digite seu e-mail para confirmar"
                            {...register("emailConfirm")}
                        />
                        <p className="span-err">{errors.emailConfirm?.message}</p>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Col} controlId="password" className="col-sm-6">
                        <Form.Label className="texto-input">Senha *</Form.Label>
                        <Form.Control type="password" className="input-padrao" placeholder="Digite sua senha"
                            {...register("password")} />
                        <p className="span-err">{errors.password?.message}</p>
                    </Form.Group>


                    <Form.Group as={Col} controlId="passwordConfirm" className="col-sm-6">
                        <Form.Label className="texto-input">Confirmar senha *</Form.Label>
                        <Form.Control {...register("passwordConfirm")} type="password" className="input-padrao" placeholder="Digite sua senha para confirmar" />
                        <p className="span-err">{errors.passwordConfirm?.message}</p>
                    </Form.Group>
                </Row>


                <Row className="mb-5 mt-4">
                    <Col>
                        <Button label="VOLTAR" route="/login" className="btn-apoio btn-apoio-register d-flex align-items-center justify-content-center">
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Button className="btn-conversao btn-conversao-register d-flex align-items-center justify-content-center" >
                            {loading
                                ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                )
                                : (
                                    "CADASTRAR"
                                )
                            }
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Bem-vindo!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Cadastro realizado com sucesso!
                </Modal.Body>

                <Modal.Footer>
                    <Row>
                        <Col lg={12}>
                            <Link to="/login"><button className="btn btn-apoio" onClick={handleClose}>OK</button></Link>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>


        </div>


    )
}

export default Register

