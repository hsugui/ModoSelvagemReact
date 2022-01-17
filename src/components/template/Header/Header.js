import { Row, Col } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Form, Navbar, Nav, NavDropdown, FormControl, Button } from 'react-bootstrap';
import './Header.css'
import LogoAtualizado from '../../../assets/imgs/header/logo_atualizado.png'
import FaleConosco from '../../../assets/imgs/header/question-diamond.svg'
import MinhaConta from '../../../assets/imgs/header/person.svg'
import Carrinho from '../../../assets/imgs/header/cart.svg'

import { isAuthenticated, logout } from "../../../services/auth";
import { getUserId } from '../../../services/auth'

function Header(props) {

    const [showDropdown, setShowDropdown] = useState(false);
    const [showDropdown2, setShowDropdown2] = useState(false);
    const [showDropdown3, setShowDropdown3] = useState(false);

    const [qtyCart, setQtyCart] = useState(0)

    useEffect(() => {
        setQtyCart(JSON.parse(localStorage.getItem('qtyCart')))
    }, [])


    return (
        <header>
            <Row className="py-2 header-custom">
                <Col lg={4} className="d-flex justify-content-center">
                    <a href="/home">
                        <img className="logo-img" src={LogoAtualizado} alt="Logotipo Modo Selvagem" />
                    </a>
                </Col>
                <Col lg={5} className="d-flex justify-content-start align-items-center">
                    <Form className="d-flex busca-lg" action="/products/search">
                        <Form.Control className="form-control custom-search custom-placeholder" type="search"
                            placeholder="Busque sua próxima aventura" name="query" aria-label="Search" required />
                        <button type="submit" className="btn-search"></button>
                    </Form>
                </Col>
                <Col lg={1} className="d-flex justify-content-center flex-column icon-header">
                    <a href="/contactus" className="links-header">
                        <div className="d-flex align-self-center justify-content-center">
                            <img src={FaleConosco} alt="Fale conosco" width="30" />
                        </div>
                        <div className="d-flex align-self-center justify-content-center">
                            <p className="legendas-header d-flex align-items-end">Fale conosco</p>
                        </div>
                    </a>
                </Col>
                <Col lg={1} className="d-flex justify-content-center flex-column icon-header">
                    {isAuthenticated() ?
                        <>
                            <div className="d-flex align-self-center justify-content-center">
                                <img src={MinhaConta} alt="Minha conta" width="30" />
                            </div>
                            <div className="d-flex align-self-center justify-content-center">
                                <span className="legendas-header"><a href={`/myProfile/account/${getUserId()}`} className="links-header">Minha conta | </a><span className="logout" onClick={logout}
                               > Sair </span></span>
                            </div>
                        </>
                        :
                        <a href="/login" className="links-header">
                            <div className="d-flex align-self-center justify-content-center">
                                <img src={MinhaConta} alt="Minha conta" width="30" />
                            </div>
                            <div className="d-flex align-self-center justify-content-center">
                                <p className="legendas-header d-flex align-items-end">Fazer login</p>
                            </div>
                        </a>

                    }
                </Col>
                <Col lg={1} className="d-flex justify-content-center flex-column icon-header">
                    <a href="/cart" className="links-header">
                        <div className="d-flex align-self-center justify-content-center cart-icon">
                            <img src={Carrinho} alt="Carrinho" width="30" />
                            <span className="cart-qty">{qtyCart} </span>
                        </div>
                        <div className="d-flex align-self-center justify-content-center">
                            <p className="legendas-header d-flex align-items-end">Carrinho</p>
                        </div>
                    </a>
                </Col>
            </Row>

            <Navbar collapseOnSelect expand="lg" variant="dark" className="nav-custom">
                <Form className="d-flex busca-sm">
                    <FormControl
                        type="search"
                        placeholder="Buscar"
                        className="form-control custom-search custom-placeholder"
                        aria-label="Search"
                    />
                    <Button type="submit" className="btn-search"></Button>
                </Form>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" className="me-3" />
                <Navbar.Collapse id="responsive-navbar-nav" className="alinhamento-menu nav-custom menu-categorias">
                    <Nav className="mx-0 d-flex nav-link-custom align-self-center">
                        <ul className="navbar-nav mx-auto">
                            <Nav.Link className="links-header-burger nav-link-custom" href="../fale-conosco/fale-conosco.html">Fale conosco</Nav.Link>
                            <Nav.Link className="links-header-burger nav-link-custom" href="../MinhaConta/MinhaConta">Minha conta</Nav.Link>
                            <Nav.Link className="links-header-burger nav-link-custom" href="../carrinho/carrinho.html">Carrinho</Nav.Link>

                            <NavDropdown className="nav-link-custom camping-class categorias-width" title="CAMPING" id="collasible-nav-dropdown"
                                onMouseLeave={() => setShowDropdown(false)} onMouseOver={() => setShowDropdown(true)} show={showDropdown} >
                                <NavDropdown.Item href="/products/category/1"><strong>Tudo em CAMPING</strong></NavDropdown.Item>
                                <NavDropdown.Divider />

                                <NavDropdown.Item href="/products/subcategory/1">Barracas</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/2">Colchões</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/3">Infladores</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/4">Isolantes térmicos</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/5">Sacos de dormir</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown className="nav-link-custom vestuario-class categorias-width align-self-center" title="VESTUÁRIO" id="collasible-nav-dropdown2"
                                onMouseLeave={() => setShowDropdown2(false)} onMouseOver={() => setShowDropdown2(true)} show={showDropdown2} >
                                <NavDropdown.Item href="/products/category/2"><strong>Tudo em VESTUÁRIO</strong></NavDropdown.Item>
                                <NavDropdown.Divider />

                                <NavDropdown.Item href="/products/subcategory/6">Bonés</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/7">Chapéus</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/8">Luvas</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/9">Óculos</NavDropdown.Item>


                            </NavDropdown>
                            <NavDropdown className="nav-link-custom acessorios-class categorias-width" title="ACESSÓRIOS" id="collasible-nav-dropdown3"
                                onMouseLeave={() => setShowDropdown3(false)} onMouseOver={() => setShowDropdown3(true)} show={showDropdown3} >
                                <NavDropdown.Item href="/products/category/3"><strong>Tudo em ACESSÓRIOS</strong></NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/products/subcategory/10">Bússolas</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/11">Facas e canivetes</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/12">Lanternas</NavDropdown.Item>
                                <NavDropdown.Item href="/products/subcategory/13">Mochilas</NavDropdown.Item>

                            </NavDropdown>
                        </ul>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </header>
    )
}

export default Header