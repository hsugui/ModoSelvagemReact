import React, { useState } from 'react'
import api from '../../services/Api'
import Button from '../../components/micro/Button/Button'
import { useHistory } from 'react-router-dom'
import { Col, Form, Row, Spinner, Alert } from 'react-bootstrap'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ResetPassword = (props) => {


    const schema = yup.object().shape({
    password: yup.string().matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!?().,])[0-9a-zA-Z$*&@#!?().,]{8,}$/,"Sua senha deve conter: Ao menos uma letra maiúscula, um número e um caractere especial."),
    passwordConfirm: yup.string().required('O campo confirmação de senha é obrigatório').oneOf([yup.ref('password')], 'As senhas não são iguais.')
    })

    const { control, register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        resolver: yupResolver(schema)
    });
    
    
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const [error, setError] = useState("");

    const newPassword = {
        password: getValues('password')
    }
    

    const onSubmit = (data) => { data = newPassword
        setError("");
        setLoading(true);
        const { token } = props.match.params;
        api.post(`forgotPassword/reset/${token}`,data)
         .then((response) => {
             history.push("/login");
             setLoading(false);
         }
         )
         .catch ((err) => {
                     if (err.response.status === 500) {
                         setError("O link para a redefinição de senha está inválido.");
                     } else {
                         setError("Houve um problema com a alteração de senha, tente novamente mais tarde.");
                     }
                     setLoading(false);
                     console.error("ops! ocorreu um erro", err);
                 });
    }


    // const [loading, setLoading] = useState(false);
    // const history = useHistory();
    // const [error, setError] = useState("");


    // const [form, setForm] = useState({
    //     password: '',
    // });

    // const handleSubmit = (event) => {
    //     setError("");
    //     setLoading(true);
    //     event.preventDefault();
    //     const { token } = props.match.params;
    //     api.post(`forgotPassword/reset/${token}`, form)
    //     .then((response) => {
    //         history.push("/login");
    //         setLoading(false);
    //     }
    //     )
    //     .catch((err) => {
    //         if (err.response.status === 500) {
    //             setError("O link para a redefinição de senha está inválido.");
    //         } else {
    //             setError("Houve um problema com a alteração de senha, tente novamente mais tarde.");
    //         }
    //         setLoading(false);
    //         console.error("ops! ocorreu um erro", err);
    //     });
    // };



    
    return(
        <>
        <title>Modo Selvagem | Redefinição de senha</title>
        <Form onSubmit={handleSubmit(onSubmit)} className=" form-passwordRecovery">
            <h1 className="mt-4 mb-4 text-center">
                Redefinição de senha
            </h1>
            {error &&
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                }
            <p className="mt-5 mb-4 text-center custom-paragrafo">
                Digite uma nova senha:
            </p>
            <Row>
            <Form.Group className="input-group-lg">
                <Form.Label className="text-input-senhas">Senha *</Form.Label>
                <Form.Control {...register("password")} type="password" className=" reset-input-senhas form-control input-padrao mb-4" placeholder="Digite uma nova senha"/>
                <p className="span-err-reset">{errors.password?.message}</p>
            </Form.Group>
            <Form.Group className="input-group-lg">
                <Form.Label className="text-input-senhas mt-3">Confirme sua senha *</Form.Label>
                <Form.Control {...register("passwordConfirm")} type="password" className="reset-input-senhas form-control input-padrao" placeholder="Confirme a nova senha"/>
                <p className="span-err-reset">{errors.passwordConfirm?.message}</p>
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
                                    "ALTERAR SENHA"
                                )
                        }
                    </Button>
                </Col>
            </Row>
        </Form>
        </>
    )
}

export default ResetPassword;