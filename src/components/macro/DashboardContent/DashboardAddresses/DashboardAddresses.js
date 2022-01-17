import './DashboardAddresses.css'
import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Modal, Button, Alert } from 'react-bootstrap';
import CEP from "../../../../assets/imgs/checkout/question-diamond-fill.svg"
import { useForm } from 'react-hook-form';
import { getUserId } from '../../../../services/auth'
import api from '../../../../services/Api'
import AddressCardList from './AddressCardList';
import axios from 'axios';


function DashboardAddresses(props) {
    //EXIBIÇÃO MODAL DE DEU CERTO
    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    //EXIBIÇÃO MODAL ADICIONAR ENDEREÇO
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, setValue, setFocus } = useForm();

    function reload() {
        window.location.reload();
    }

    const [address, setAddress] = useState({
        cep: '',
        street: '',
        number: '',
        complement: '',
        district: '',
        city: '',
        uf: '',

    });

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        if (e.target.value.length == 8) {
        fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
            console.log(data);
            // register({ name: 'address', value: data.logradouro });
            setValue('logradouro', data.logradouro);
            setValue('bairro', data.bairro);
            setValue('cidade', data.localidade);
            setValue('uf', data.uf);
            setFocus('bairro');

            setAddress({
                ...address,
                uf: data.uf,
                district: data.bairro,
                street: data.logradouro,
                city: data.localidade
            })
        });
    }
    }

    const [error, setError] = useState("");


    // POST DE ENDEREÇO
    const saveAddress = (address) => {
        api.post(`/dashboard/account/${getUserId()}/addresses`, address)
            .then((response) => {
                handleShow3();
            }
            )
            .catch((err) => {
                setError("Ops! ocorreu um erro, favor tentar novamente mais tarde!");
            });
    }

    const handleSubmit = (event) => {
        setError("");
        event.preventDefault();
        event.stopPropagation();
        saveAddress(address);
        setShow(false);
    };

    // GET LISTA DE ENDEREÇOS POR CUSTOMER
    const [customerAddresses, setCustomerAddresses] = useState([])

    useEffect(() => {
        api.get(`/dashboard/account/${getUserId()}/addresses`)
            .then((response) => {
                setCustomerAddresses(response.data.addresses)
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    if (customerAddresses) {
        return (
            <>
                <h1 className="my-3">Meus endereços</h1>
                <div className="principal">

                    {/* <h3>Endereço principal</h3>
                    <div className="endereco-dashboard">
                        <div className="descricao-endereco">{customerAddresses[0].street}, {customerAddresses[0].number} – {customerAddresses[0].district}, {customerAddresses[0].city} – SP
                            – CEP: {customerAddresses[0].cep}</div>
                        <div className="opcoes mt-3">
                            <Button className="botao verde">Editar</Button>
                            <Button className="botao apoio">Excluir</Button>
                        </div>
                    </div>

                    <h3 className="mt-4">Endereços secundários</h3> */}

                    <AddressCardList addresses={customerAddresses} />


                    <Row>
                        <Col xs={12} className="d-flex justify-content-center">
                            <Button className="botao verde add-endereco" onClick={handleShow}>Adicionar endereço</Button>
                        </Col>
                    </Row>
                </div>


                {/* <!-- MODAL ADICIONAR --> */}
                <Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar endereço</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form name="meuForm" action="#" onSubmit={handleClose}>
                            <Form.Label for="cep" className="label-modal">CEP</Form.Label>
                            <Form.Control type="text" className="input-modal" id="cep" name="cep" placeholder="Digite o CEP" {...register("cep")} onBlur={checkCEP} required onChange={(event) => setAddress({ ...address, cep: event.target.value })} />
                            <p><a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank" className="cep"><img src={CEP} alt="Interrogação" width="14" /> Não sei meu CEP</a></p>
                            <Form.Label for="estado" className="label-modal">Estado</Form.Label>
                            <Form.Control type="text" className="input-modal" id="uf" name="uf" {...register("uf")} required disabled />
                            <Form.Label for="cidade" className="label-modal">Cidade</Form.Label>
                            <Form.Control type="text" className="input-modal" id="cidade" name="cidade" {...register("cidade")} required disabled />
                            <Form.Label for="bairro" className="label-modal">Bairro</Form.Label>
                            <Form.Control type="text" className="input-modal" id="bairro" name="bairro" {...register("bairro")} onChange={(event) => setAddress({ ...address, district: event.target.value })} required />
                            <Form.Label for="logradouro" className="label-modal">Logradouro</Form.Label>
                            <Form.Control type="text" className="input-modal" id="logradouro" name="logradouro" {...register("logradouro")} onChange={(event) => setAddress({ ...address, street: event.target.value })} required />
                            <Form.Label for="numero" className="label-modal">Número</Form.Label>
                            <Form.Control type="text" className="input-modal" id="numero" name="numero" placeholder="Digite o número" {...register("numero")} required onChange={(event) => setAddress({ ...address, number: event.target.value })} />
                            <Form.Label for="complemento" className="label-modal">Complemento (opcional)</Form.Label>
                            <Form.Control type="text" className="input-modal" id="complemento" name="complemento" placeholder="Digite o complemento" onChange={(event) => setAddress({ ...address, complement: event.target.value })} />
                            {error &&
                                <Alert variant='danger'>
                                    {error}
                                </Alert>
                            }
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Row>
                            <Col lg={6}>
                                <Button className="btn btn-apoio btn-apoio-endereco" onClick={handleClose}>CANCELAR</Button>
                            </Col>
                            <Col lg={6}>
                                <Button className="btn btn-conversao btn-conversao-endereco" onClick={handleSubmit}>SALVAR</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
                {/* <!-- FIM MODAL ADICIONAR --> */}
            </>
        )
    } else {
        return (
            <>
                <h1 className="my-3">Meus endereços</h1>
                <div className="principal">

                    <h2 className="no-address-text text-center mt-3 mb-3">Você ainda não possui nenhum endereço cadastrado.</h2>


                    <Row>
                        <Col xs={12} className="d-flex justify-content-center">
                            <Button className="botao verde add-endereco" onClick={handleShow}>Adicionar endereço</Button>
                        </Col>
                    </Row>
                </div>


                {/* <!-- MODAL ADICIONAR --> */}
                <Modal show={show} onHide={handleClose} >
                    <Modal.Header closeButton>
                        <Modal.Title>Adicionar endereço</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form name="meuForm" action="#" onSubmit={handleClose}>
                            <Form.Label for="cep" className="label-modal">CEP</Form.Label>
                            <Form.Control type="text" className="input-modal" id="cep" name="cep" placeholder="Digite o CEP" {...register("cep")} onBlur={checkCEP} required onChange={(event) => setAddress({ ...address, cep: event.target.value })} />
                            <p><a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank" className="cep"><img src={CEP} alt="Interrogação" width="14" /> Não sei meu CEP</a></p>
                            <Form.Label for="estado" className="label-modal">Estado</Form.Label>
                            <Form.Control type="text" className="input-modal" id="uf" name="uf" {...register("uf")} required disabled />
                            <Form.Label for="cidade" className="label-modal">Cidade</Form.Label>
                            <Form.Control type="text" className="input-modal" id="cidade" name="cidade" {...register("cidade")} required disabled />
                            <Form.Label for="bairro" className="label-modal">Bairro</Form.Label>
                            <Form.Control type="text" className="input-modal" id="bairro" name="bairro" {...register("bairro")} onChange={(event) => setAddress({ ...address, district: event.target.value })} required />
                            <Form.Label for="logradouro" className="label-modal">Logradouro</Form.Label>
                            <Form.Control type="text" className="input-modal" id="logradouro" name="logradouro" {...register("logradouro")} onChange={(event) => setAddress({ ...address, street: event.target.value })} required />
                            <Form.Label for="numero" className="label-modal">Número</Form.Label>
                            <Form.Control type="text" className="input-modal" id="numero" name="numero" placeholder="Digite o número" {...register("numero")} required onChange={(event) => setAddress({ ...address, number: event.target.value })} />
                            <Form.Label for="complemento" className="label-modal">Complemento (opcional)</Form.Label>
                            <Form.Control type="text" className="input-modal" id="complemento" name="complemento" placeholder="Digite o complemento" onChange={(event) => setAddress({ ...address, complement: event.target.value })} />
                            {error &&
                                <Alert variant='danger'>
                                    {error}
                                </Alert>
                            }
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Row>
                            <Col lg={6}>
                                <Button className="btn btn-apoio btn-apoio-endereco" onClick={handleClose}>CANCELAR</Button>
                            </Col>
                            <Col lg={6}>
                                <Button className="btn btn-conversao btn-conversao-endereco" onClick={handleSubmit}>SALVAR</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                </Modal>
                {/* <!-- FIM MODAL ADICIONAR --> */}


            {/* <!-- MODAL INDICANDO QUE DEU CERTO --> */}
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Adição de endereço</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Endereço adicionado com sucesso!
                </Modal.Body>

                <Modal.Footer>
                    <Row>
                        <Col lg={12}>
                            <button className="btn btn-apoio" onClick={handleClose3, reload}>OK</button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
            </>

        )
    }


}

export default DashboardAddresses