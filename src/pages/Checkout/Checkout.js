import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Container, Form, Row, Col, Modal, Card, Spinner, Alert } from 'react-bootstrap';
import './Checkout.css';
import CEP from "../../assets/imgs/checkout/question-diamond-fill.svg";
import OrderItemList from '../../components/macro/OrderItemList/OrderItemList';
import BankSlip from './BankSlip';
import Pix from './Pix';
import CreditCard from './CreditCard';
import { getUserId } from '../../services/auth';
import api from '../../services/Api';
import InputMask from 'react-input-mask';
import MaskedInput from '../Register/MaskedInput';

function Checkout(props) {

    const orderCart = JSON.parse(localStorage.getItem("cart"))
    const orderItems = []
    orderCart.forEach(element => {
        orderItems.push({
            productId: element.id,
            quantity: element.qtd,
            discount: 0,
            grossValue: element.price * element.qtd,
            netValue: element.price * element.qtd
        })
    });

    const [user, setUser] = useState({})
    const [addresses, setAddresses] = useState([])
    const [content, setContent] = useState(<BankSlip />)

    function calcularSubtotal() {
        let total = 0
        orderItems.forEach(element => {
            total += element.netValue
        });

        return total
    }

    function ehFreteGratis() {
        return calcularSubtotal() >= 500
    }


    const [order, setOrder] = useState({
        deliveryType: ehFreteGratis() ? 'Grátis' : 'Normal',
        deliveryTime: 5,
        shippingValue: ehFreteGratis() ? 0 : 11.40,
        status: {
            id: 2
        },
        customer: {
            id: getUserId()
        },
        paymentMethod: {
            id: 1
        },
        items: orderItems,
        totalPrice: ehFreteGratis() ? calcularSubtotal() : calcularSubtotal() + 11.40,
        address: {
            id: undefined
        },
        installmentsNumber: null,
        installmentsValue: null
    })

    let faltamParaFreteGratis = 511.40 - order.totalPrice;

    function handleInstallments(number) {
        setOrder({
            ...order,
            paymentMethod: {
                id: 3
            },
            installmentsNumber: number,
            installmentsValue: (order.totalPrice / number)
        })
    }

    useEffect(() => {
        api.get(`/dashboard/account/${getUserId()}`)
            .then((response) => {
                setAddresses(response.data.addresses)
                setUser(response.data)
                setOrder({
                    ...order,
                    address: {
                        id: response.data.addresses[response.data.addresses.length - 1].id
                    }
                })

            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    const [loading, setLoading] = useState(false);

    function handleFrete(type, time, value) {
        setOrder({
            ...order,
            deliveryType: type,
            deliveryTime: time,
            shippingValue: value,
            totalPrice: calcularSubtotal() + value
        })
    }

    function handleClickBankSlip() {
        setContent(<BankSlip />)
        setOrder({
            ...order,
            installmentsNumber: null,
            installmentsValue: null
        })
    }

    function handleClickPix() {
        setOrder({
            ...order,
            installmentsNumber: null,
            installmentsValue: null
        })
        setContent(<Pix />)
    }

    function handleClickCreditCard() {
        setContent(<CreditCard total={order.totalPrice} installmentsFunction={handleInstallments} />)
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show2, setShow2] = useState(false);

    const addNewAddress = () => {
        setLoading(true)
        setOrder({
            ...order,
            address: {
                id: selectedAddress
            }
        })
        setLoading(false)
        handleClose2()
    }


    const handleClose2 = () => {
        setShow2(false)
    };



    const handleShow2 = () => setShow2(true);

    const { register, setValue, setFocus, getValues } = useForm();

    const checkCEP = (e) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length == 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
                console.log(data);
                // register({ name: 'address', value: data.logradouro });
                setValue('logradouro', data.logradouro);
                setValue('bairro', data.bairro);
                setValue('cidade', data.localidade);
                setValue('uf', data.uf);
                setFocus('numero');
            });
        }
    }

    const history = useHistory();
    const [selectedAddress, setSelectedAddress] = useState(order.address.id)
    const handleSubmitAddress = (event) => {
        event.preventDefault();
        setLoading(true);
        const address2 = {
            cep: getValues("cep"),
            street: getValues("logradouro"),
            number: getValues("numero"),
            complement: getValues("complemento"),
            district: getValues("bairro"),
            city: getValues("cidade"),
            uf: getValues("uf")
        }

        api.post(`/dashboard/account/${order.customer.id}/addresses`, address2)
            .then((response) => {
                // console.log(response.data.id)
                setOrder({
                    ...order,
                    address: {
                        id: response.data.id
                    }
                })
                setSelectedAddress(response.data.id)
            })

            .catch((err) => {
                console.log("ops! ocorreu um erro, favor tentar novamente mais tarde!");
            });

        window.location.reload()
    };

    const saveOrder = (event) => {
        event.preventDefault()
        setLoading(true);
        api.post("/checkout", order)
            .then((response) => {
                // alert("Pedido realizado com sucesso!");
                localStorage.setItem("order-id", response.data.id)
                localStorage.removeItem("cart")
                localStorage.setItem("qtyCart", 0)
                history.push(`/success`);
                window.location.reload()

            }
            )
            .catch((err) => {
                console.log("ops! ocorreu um erro, favor tentar novamente mais tarde!");

            });
    }


    function checkAddressIndex() {
        for (let i = 0; i < addresses.length; i++) {
            if (order.address.id == addresses[i].id) {
                return i;
            }
        }
        return undefined;
    }
    return (
        <>
            <title>Modo Selvagem | Pagamento</title>
            <Container className="mt-4">
                <Row className="mt-4">
                    <Col lg={12}>
                        <Row>
                            <Row>
                                <h1>Pagamento</h1>
                            </Row>
                            <Row className="mt-3">
                                <Col lg={12}>

                                    <Row className="identificacao" id="identificacao">
                                        <p className="header-box-checkout d-flex">Identificação do usuário</p>
                                        <span className="paragrafo-nome">Nome completo: <span className="dado-cliente">{user.name + " " + user.surname}</span></span>
                                        <span>E-mail: <span className="dado-cliente">{user.email}</span></span>
                                    </Row>
                                </Col>
                                <Col lg={12}>
                                    <Row className="endereco-checkout my-4">
                                        <p className="header-box-checkout d-flex justify-content-between"><span>Endereço</span> {order.address.id ? <span><button type="button" className="btn-editar" onClick={handleShow}>Adicionar</button><button type="button" className="btn-editar btn-alterar-endereco" onClick={handleShow2}>Alterar</button></span> : ""}</p>
                                        {order.address.id != undefined ?
                                            <>

                                                <span className="address-p">{addresses[checkAddressIndex()].street}, {addresses[checkAddressIndex()].number}{addresses[checkAddressIndex()].complement ? ", " + addresses[checkAddressIndex()].complement : ""} </span>

                                                <span className="address-p">{addresses[checkAddressIndex()].district}, {addresses[checkAddressIndex()].city} – {addresses[checkAddressIndex()].uf}</span>
                                                <span className="address-p">CEP: {addresses[checkAddressIndex()].cep}</span>
                                            </>
                                            :
                                            <form onSubmit={handleSubmitAddress}>
                                                <div className="novo-endereco-checkout row" id="endereco-entrega">

                                                    <Col md={3}>
                                                        <Form.Label for="cep" className="label-modal">CEP *</Form.Label>
                                                        <Form.Control type="text" className="input-modal form-control" id="cep" name="cep" placeholder="Digite o CEP" {...register("cep")} onBlur={checkCEP} required />
                                                        <p><a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank" className="cep"><img src={CEP} alt="Interrogação" width="14" /> Não sei meu CEP</a></p>
                                                    </Col>
                                                    <Col md={1}>
                                                        <Form.Label for="estado" className="label-modal">Estado *</Form.Label>
                                                        <Form.Control type="text" className="input-modal" id="uf" name="uf" {...register("uf")} disabled />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label for="cidade" className="label-modal">Cidade *</Form.Label>
                                                        <Form.Control type="text" className="input-modal" id="cidade" name="cidade" {...register("cidade")} disabled />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label for="bairro" className="label-modal">Bairro *</Form.Label>
                                                        <Form.Control type="text" className="input-modal" id="bairro" name="bairro" {...register("bairro")} required />
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Label for="logradouro" className="label-modal">Logradouro *</Form.Label>
                                                        <Form.Control type="text" className="input-modal" id="logradouro" name="logradouro" {...register("logradouro")} required />
                                                    </Col>
                                                    <Col md={2}>
                                                        <Form.Label for="numero" className="label-modal">Número *</Form.Label>
                                                        <Form.Control type="text" className="input-modal" id="numero" name="numero" placeholder="Digite o número" {...register("numero")} required />
                                                    </Col>
                                                    <Col md={4}>
                                                        <Form.Label for="complemento" className="label-modal">Complemento </Form.Label>
                                                        <Form.Control type="text" className="input-modal" id="complemento" name="complemento" placeholder="Digite o complemento" {...register("complemento")} />
                                                    </Col>
                                                    <Col sm={12} className="d-flex justify-content-end">
                                                        <button className="btn-conversao btn-salvar-endereco mt-2" type="submit">  {loading
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
                                                                "Salvar endereço"
                                                            )
                                                        }</button>
                                                    </Col>

                                                </div>
                                            </form>}
                                    </Row>
                                </Col>
                            </Row>
                        </Row>

                        <Row>
                            <Col lg={12}>
                                <Row className="mt-2 mb-5 itens-envio">
                                    <p className="header-box-checkout">Produtos</p>
                                    <div className="itens-overflow">
                                        {/* <!-- ITENS ENVIO --> */}
                                        <OrderItemList items={orderCart} />
                                        {/* <!-- FIM ITENS ENVIO --> */}
                                    </div>
                                </Row>
                            </Col>
                            <Col xs={12}>
                                <Row className="mt-2 frete">
                                    <p className="header-box-checkout d-flex">Frete</p>
                                    <div>

                                        <Form>
                                            <Row className="mt-2">
                                                <Col xs={4} className="d-flex justify-content-center">
                                                    {['radio'].map((type) => (
                                                        <div key={`entrega-padrao`} className="mb-3">
                                                            <Form.Check
                                                                type={type}
                                                                id={`entrega-padrao`}
                                                                label={`Entrega ${order.deliveryType}`}
                                                                className="texto-entrega"
                                                                name="radio-frete"
                                                                checked={true}
                                                            />
                                                        </div>
                                                    ))}
                                                </Col>
                                                <Col xs={4} className="d-flex justify-content-center">
                                                    <p className="texto-entrega">Em até {order.deliveryTime} dias úteis</p>
                                                </Col>
                                                <Col xs={4} className="d-flex justify-content-center">
                                                    <p className="texto-entrega">{order.shippingValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={4}>
                                                </Col>
                                                <Col xs={4}>
                                                </Col>
                                                <Col xs={4} className="d-flex justify-content-center">
                                                    {faltamParaFreteGratis > 0 ? <span className="falta-frete-gratis">Faltam <strong>{faltamParaFreteGratis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong> para você ganhar<br/><strong>FRETE GRÁTIS</strong></span> : ""}
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>
                                </Row>
                            </Col>
                        </Row>

                    </Col>


                </Row>

                <Row className="mt-2">
                    <Form onSubmit={saveOrder}>
                        <Col lg={12}>
                            <Row className="mt-2 forma-pagamento">
                                <p className="header-box-checkout">Forma de pagamento</p>
                                <Row className="ms-4 mt-3 radio-pagementos">

                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3 d-flex justify-content-around">
                                            <Form.Check
                                                inline
                                                label="Boleto à vista."
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-1`}
                                                className="texto-pagamento"
                                                onClick={handleClickBankSlip} onChange={() => setOrder({ ...order, paymentMethod: { id: 1 } })}
                                                checked={order.paymentMethod.id == 1}

                                            />
                                            <Form.Check
                                                inline
                                                label="Pix à vista."
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                                className="texto-pagamento"
                                                onClick={handleClickPix} onChange={() => setOrder({ ...order, paymentMethod: { id: 2 } })}
                                                checked={order.paymentMethod.id == 2}
                                            />
                                            <Form.Check
                                                inline
                                                label="Cartão de crédito."
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-3`}
                                                className="texto-pagamento"
                                                onClick={handleClickCreditCard} onChange={() => setOrder({ ...order, paymentMethod: { id: 3 }, installmentsNumber: 1, installmentsValue: order.totalPrice })}
                                                checked={order.paymentMethod.id == 3}
                                            />
                                        </div>
                                    ))}

                                </Row>

                                <div>
                                    {content}
                                </div>

                                {/* END TEST ACCORDEON */}
                            </Row>
                        </Col>


                        <Col lg={12}>
                            <Row className="mt-2 align-items-center">
                                <Row className="mt-4 mb-2">
                                    <span className="valores">Valor dos itens: <span className="valor-pedido">{calcularSubtotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
                                </Row>
                                <Row className="mb-2">
                                    <span className="valores">Valor do frete: <span className="valor-pedido">{order.shippingValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
                                </Row>
                                <Row className="mb-4">
                                    <span className="total-pedido-checkout">Total do pedido: <span className="valor-pedido">{order.totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span></span>
                                </Row>
                                <Row className="justify-content-end">

                                    <Link to="/cart" className="btn-apoio btn-checkout me-3">VOLTAR AO CARRINHO</Link>

                                    <button className="btn-conversao btn-checkout" type="submit" disabled={order.address.id == undefined}>  {loading
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
                                            "FINALIZAR PEDIDO"
                                        )
                                    }</button>
                                </Row>

                                {order.address.id == undefined ? <Alert variant={"danger"} className="mt-3">
                                    Por favor, preeencha e salve um endereço de entrega. <Alert.Link href="#identificacao">Clique aqui</Alert.Link> para preencher.
                                </Alert> : ""}
                            </Row>
                        </Col>
                    </Form>
                </Row>
            </Container>


            {/* <!-- MODAL ADICIONAR --> */}
            <Modal show={show} onHide={handleClose}>
                <Form name="meuForm" action="#">
                <Modal.Header closeButton>
                    <Modal.Title>Adicionar endereço</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    
                        <Form.Label for="cep" className="label-modal">CEP *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="cep" name="cep" placeholder="Digite o CEP" {...register("cep")} onBlur={checkCEP} required />
                        <p><a href="https://buscacepinter.correios.com.br/app/endereco/index.php?t" target="_blank" className="cep"><img src={CEP} alt="Interrogação" width="14" /> Não sei meu CEP</a></p>
                        <Form.Label for="estado" className="label-modal">Estado *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="uf" name="uf" {...register("uf")} disabled />
                        <Form.Label for="cidade" className="label-modal">Cidade *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="cidade" name="cidade" {...register("cidade")} disabled />
                        <Form.Label for="bairro" className="label-modal">Bairro *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="bairro" name="bairro" {...register("bairro")} />
                        <Form.Label for="logradouro" className="label-modal">Logradouro *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="logradouro" name="logradouro" {...register("logradouro")} />
                        <Form.Label for="numero" className="label-modal">Número *</Form.Label>
                        <Form.Control type="text" className="input-modal" id="numero" name="numero" placeholder="Digite o número" {...register("numero")} required />
                        <Form.Label for="complemento" className="label-modal">Complemento </Form.Label>
                        <Form.Control type="text" className="input-modal" id="complemento" name="complemento" placeholder="Digite o complemento" {...register("complemento")} />
                   
                </Modal.Body>
                <Modal.Footer>
                    <Row className="flex-grow-1">
                        <Col lg={6}>
                            <button className="btn btn-apoio btn-apoio-endereco" onClick={handleClose}>CANCELAR</button>
                        </Col>
                        <Col lg={6}>
                            <button className="btn btn-conversao btn-conversao-endereco" onClick={handleSubmitAddress}>SALVAR</button>
                        </Col>

                    </Row>
                </Modal.Footer>
                </Form>
            </Modal>
            {/* <!-- FIM MODAL ADICIONAR --> */}

            {/* <!-- MODAL ALTERAR --> */}
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                    <Modal.Title>Alterar endereço</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {
                        addresses.map(element => {
                            return (
                                <Card style={{ width: '100%' }} className="card-endereco">
                                    <Card.Body>
                                        <Card.Text>
                                            <p className="card-text">{element.street}, {element.number} – {element.district}, {element.city} – {element.uf} – CEP: {element.cep}.</p>
                                            {['radio'].map((type) => (
                                                <div key={`default-${type}`} className="mb-3">
                                                    <Form.Check
                                                        type={type}
                                                        id={`default-${element.id}`}
                                                        label="Selecionar este endereço."
                                                        name="radio-endereco"
                                                        onChange={() => {
                                                            setSelectedAddress(element.id)
                                                        }}
                                                        checked={selectedAddress == element.id}
                                                    />
                                                </div>
                                            ))}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })}
                </Modal.Body>

                <Modal.Footer>
                    <Row>
                        <Col lg={12}>
                            <button className="btn btn-conversao" onClick={addNewAddress}>{loading
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
                                    "Salvar endereço"
                                )
                            }</button>
                        </Col>
                    </Row>
                </Modal.Footer>
            </Modal>
            {/* <!-- FIM MODAL ALTERAR --> */}
        </>
    )
}

export default Checkout