import React, { useState } from 'react'
import './Login.css'
import { Alert, Form } from 'react-bootstrap';
import api from '../../services/Api';
import { saveToken } from "../../services/auth";
import Button from '../../components/micro/Button/Button';

export default function Login({ history }) {
    const [validated, setValidated] = useState(false);
    const [error, setError] = useState("");
    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    const authenticate = async (email, password) => {
        try {
            const response = await api
                .post("/login", { email, password })
            saveToken(response.data.token);
            if (localStorage.getItem("cart") != null) {
                history.push("/checkout");
            } else {
                history.push("/home");
            }
            
            window.location.reload();
        } catch (err) {
            if (err.response.status === 403) {
                setError("E-mail e/ou senha inválido(s)!");
            } else {
                setError("Houve um problema com o login, favor tentar novamente mais tarde!");
            }
        }
    }

    const handleLogin = async (e) => {
        setError("");
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        
        if (form.checkValidity()) {
            const { email, password } = login;
            authenticate(email, password);
        }
        setValidated(true);
    };

    return (
        <main className="form-login">
            <title>Modo Selvagem | Login</title>
            <Form noValidate validated={validated} onSubmit={handleLogin}>
                <h1 className="my-3 text-center">
                    Identificação
                </h1>
                {error &&
                    <Alert variant='danger'>
                        {error}
                    </Alert>
                }
                <Form.Group controlId="email" className="input-group-lg">
                    <Form.Label className="texto-input">E-mail</Form.Label>
                    <Form.Control type="email" className="form-control input-padrao-login" placeholder="Digite seu e-mail" required
                        onChange={e => setLogin({ ...login, email: e.target.value })} />
                    <Form.Control.Feedback type="invalid">Favor informar seu email</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="password" className="input-group-lg">
                    <Form.Label className="texto-input">Senha</Form.Label>
                    <Form.Control type="password" className="form-control input-padrao-login" placeholder="Digite sua senha" required onChange={e => setLogin({ ...login, password: e.target.value })} />
                    <Form.Control.Feedback type="invalid">Favor informar sua senha </Form.Control.Feedback>
                </Form.Group>
                <div className=" my-3 text-center">
                    <small className="font-weight-bold"><a href="/passwordRecovery" className="ml-auto mb-0 text-sm">Esqueci minha senha</a></small>
                </div>
                <div className="text-center">
                    <Button label="ENTRAR" className="btn-conversao btn-conversao-login">
                    </Button>
                </div>
                <div className="my-3 text-center">
                    <small className="font-weight-bold">Não possui conta?</small>
                </div>
                <div className="text-center mb-5">
                    <a className="link-login btn-conversao btn-conversao-login" href="/register">CRIAR CONTA</a>
                </div>

            </Form>
        </main>
    )
}