import { useHistory } from 'react-router-dom'
import api from '../../services/Api'
import React, { useState } from 'react'
import { Form, Container, Row, Col, Spinner } from 'react-bootstrap'
import './ContactUs.css'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonBootstrap from '../../components/micro/Button/Button'


export const ContactUs = () => {
    const schema = yup.object().shape({

        name: yup.string().required('O campo nome é obrigatório').matches( /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/,"Nome inválido")
        .min(3, 'Digite mais que 3 caracteres').max(50),
        email: yup.string().email('Digite um email válido.').required('O campo e-mail obrigatório'),
        subject: yup.string().required('O campo motivo é obrigatório'),
        message: yup.string().required('O campo mensagem é obrigatório').min(15, 'Mensagem de conter ao menos 15 caracteres'),
      });

    const history = useHistory();

    const [loading, setLoading] = useState(false);
    const { register, setRegister, handleSubmit,  formState: { errors } } = useForm({
        mode: 'all',
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        setLoading(true);
        api.post('/contact', data)
            .then((response) => {
                setLoading(false);
                history.push("/thanks")
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }

 

    return (

        <>
        <title>Modo Selvagem | Fale conosco</title>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={5} xl={4} md={6} sm={7}>
                        <h1 className="my-4">Fale conosco</h1>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group controlId="name">
                                <Form.Label className="texto-input-contact">Nome *</Form.Label>
                                <Form.Control type="text" className="input-padrao" placeholder="Digite seu nome"
                                    {...register("name", {  pattern : /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/ })} />
                                    <p className="span-err-contact">{errors.name?.message}</p>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label className="texto-input-contact" >E-mail *</Form.Label>
                                <Form.Control className="input-padrao" placeholder="Digite seu e-mail"
                                    {...register("email")}
                                />
                                    <p className="span-err-contact">{errors.email?.message}</p>
                            </Form.Group>
                            <Form.Group controlId="subject" className="select-subject">
                                <Form.Label className="texto-input-contact" for="subject">Motivo de contato *</Form.Label>
                                <Form.Select className="form-select btn-dd-menu" id="subject"
                                    {...register("subject")}>
                                    <option value={null} label="Selecione uma opção"></option>
                                    <option value="Duvida" label="Dúvida"></option>
                                    <option value="Sugestão" label="Sugestão"></option>
                                    <option value="Reclamação" label="Reclamação"></option>
                                </Form.Select>
                                <p className="span-err-contact">{errors.subject?.message}</p>
                            </Form.Group>
                            <Form.Group className="col-12" controlId="message">
                                <Form.Label className="texto-input-contact">Mensagem *</Form.Label>
                                <Form.Control as="textarea" className="input-padrao input-mensagem " placeholder="Digite sua mensagem"
                                    {...register("message")}
                                />
                                <p className="span-err-contact">{errors.message?.message}</p>
                            </Form.Group>

                            <Col className="col-12 mt-4 d-flex justify-content-between">
                                <button type="reset"  className="btn-apoio botoes-contact ">CANCELAR</button>
                                <ButtonBootstrap as="input" type="submit" className="btn-conversao botoes-contact" value="ENVIAR">
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
                                            "ENVIAR"
                                        )
                                    }
                                </ButtonBootstrap>

                            </Col>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>

    )



}
export default ContactUs


