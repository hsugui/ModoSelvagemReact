import React, { useState } from 'react'
import AddressCard from './AddressCard';
import { getUserId } from '../../../../services/auth'
import api from '../../../../services/Api'
import { Row, Col, Form, Modal, Alert, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import CEP from "../../../../assets/imgs/checkout/question-diamond-fill.svg"
import MaskedInput from '../../../../pages/Register/MaskedInput';

function AddressCardList(props) {

    const addresses = props.addresses || []

    const [address, setAddress] = useState({});

    //EXIBIÇÃO MODAL DE DEU CERTO
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);

    function reload() {
        window.location.reload();
    }

    //EXIBIÇÃO MODAL ALTERAR
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (address) => {
        setValue('cep-modal', address.cep);
        setValue('logradouro-modal', address.street);
        setValue('bairro-modal', address.district);
        setValue('cidade-modal', address.city);
        setValue('uf-modal', address.uf);
        setValue('numero-modal', address.number);
        setValue('complemento-modal', address.complement);
        setAddress(address)

        setShow(true)
    };

    const [error, setError] = useState("");

    const { register, setValue, setFocus } = useForm();

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        console.log(cep);
        if (cep.length == 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
                console.log(data);
                // register({ name: 'address', value: data.logradouro });
                setValue('logradouro-modal', data.logradouro);
                setValue('bairro-modal', data.bairro);
                setValue('cidade-modal', data.localidade);
                setValue('uf-modal', data.uf);
                setValue('numero-modal', "");
                setValue('complemento-modal', "");

                setFocus('bairro-modal');

                setAddress({
                    ...address,
                    uf: data.uf,
                    district: data.bairro,
                    street: data.logradouro,
                    city: data.localidade,
                    number: "",
                    complement: ""
                })
            });
        }
    }


    // DELETE
    const deleteAddress = (address) => {
        api.delete(`/dashboard/account/${getUserId()}/addresses/${address.id}`)
            .then((response) => {
                handleShow2();
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }

    // PUT
    const saveAddress = (address) => {
        api.put(`/dashboard/account/${getUserId()}/addresses/${address.id}`, address)
            .then((response) => {
                handleShow3();
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
        saveAddress(address);
        handleClose();
    };

    return (
        <>
            {
                addresses.map(address2 => {

                    return (

                        <>
                            <AddressCard key={address2.id} street={address2.street} number={address2.number} district={address2.district} city={address2.city} uf={address2.uf}
                                cep={address2.cep} complement={address2.complement} onClickDelete={() => deleteAddress(address2)} onClickEdit={() => handleShow(address2)} />

                        </>

                    )
                })
            }

            {/* <!-- MODAL ALTERAR--> */}
            <Modal show={show} onHide={handleClose} >
            <Form name="meuForm" onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Alterar endereço</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        
                        <Form.Label for="cep" className="label-modal">CEP *</Form.Label>
                        <MaskedInput mask="99999-999" type="text" className="input-modal form-control" id="cep" name="cep" placeholder="Digite o CEP" {...register("cep-modal")} onBlur={checkCEP} required={true} onChange={(event) => setAddress({ ...address, cep: event.target.value })} value={address.cep} />
                        <p><a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank" className="cep"><img src={CEP} alt="Interrogação" width="14" /> Não sei meu CEP</a></p>
                        <Form.Label for="estado" className="label-modal">Estado *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="uf" name="uf" {...register("uf-modal")} disabled value={address.uf} onChange={(event) => setAddress({ ...address, uf: event.target.value })} required />
                        <Form.Label for="cidade" className="label-modal">Cidade *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="cidade" name="cidade" {...register("cidade-modal")} disabled value={address.city} onChange={(event) => setAddress({ ...address, city: event.target.value })} required />
                        <Form.Label for="bairro" className="label-modal">Bairro *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="bairro" name="bairro" {...register("bairro-modal")} placeholder="Digite o bairro" value={address.district} onChange={(event) => setAddress({ ...address, district: event.target.value })} required />
                        <Form.Label for="logradouro" className="label-modal">Logradouro *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="logradouro" name="logradouro" {...register("logradouro-modal")} placeholder="Digite o logradouro" value={address.street} onChange={(event) => setAddress({ ...address, street: event.target.value })} required />
                        <Form.Label for="numero" className="label-modal">Número *</Form.Label>
                        <MaskedInput mask="999999" type="text" className="input-modal form-control" id="numero" name="numero" placeholder="Digite o número" {...register("numero-modal")} value={address.number} onChange={(event) => setAddress({ ...address, number: event.target.value })} required={true} />
                        <Form.Label for="complemento" className="label-modal">Complemento</Form.Label>
                        <Form.Control type="text" className="input-modal" id="complemento" name="complemento" placeholder="Digite o complemento" {...register("complemento-modal")} value={address.complement} onChange={(event) => setAddress({ ...address, complement: event.target.value })} />
                        {error &&
                            <Alert variant='danger'>
                                {error}
                            </Alert>
                        }
                        
                    </Modal.Body>

                    <Modal.Footer>
                        <Row className="flex-grow-1">
                            <Col lg={6}>
                                <Button className="btn btn-apoio btn-apoio-endereco" onClick={handleClose}>CANCELAR</Button>
                            </Col>
                            <Col lg={6}>
                                <Button className="btn btn-conversao btn-conversao-endereco" type="submit">SALVAR</Button>
                            </Col>
                        </Row>
                    </Modal.Footer>
                    </Form>
            </Modal>
            {/* <!-- FIM MODAL ADICIONAR --> */}

            {/* <!-- MODAL INDICANDO QUE DEU CERTO --> */}
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Remoção de endereço</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Endereço removido com sucesso!
                </Modal.Body>

                <Modal.Footer>
                    <Row>
                        <Col lg={12}>
                            <button className="btn btn-apoio" onClick={handleClose2, reload}>OK</button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>

            {/* <!-- MODAL INDICANDO QUE DEU CERTO --> */}
            <Modal show={show3} onHide={handleClose3}>
                <Modal.Header closeButton>
                    <Modal.Title>Alteração de endereço</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Endereço alterado com sucesso!
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


export default AddressCardList



