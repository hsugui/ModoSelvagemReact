import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css'
import Facebook from '../../../assets/imgs/footer/facebook.png'
import Instagram from '../../../assets/imgs/footer/instagram.png'
import Twitter from '../../../assets/imgs/footer/twitter.png'
import Visa from '../../../assets/imgs/footer/visa.png'
import Mastercard from '../../../assets/imgs/footer/mastercard.png'
import Diners from '../../../assets/imgs/footer/diners.png'
import Amex from '../../../assets/imgs/footer/amex.png'
import Pix from '../../../assets/imgs/footer/pix (2).png'
import Boleto from '../../../assets/imgs/footer/bar-code.png'
import WhatsApp from '../../../assets/imgs/footer/whatsapp.png'

function Footer() {

    return(
        <footer className="mt-5">

        <Container>
            <Row className="justify-content-around">

                <Col xs={12} md={6} lg={2} className="footer-sobre pt-4 pb-2">

                    <h6 className="footer-title mb-3">Redes sociais</h6>
                    {/* <ul>
                        <li>
                            <Link className="link-footer" to="#link" id="link">
                                Quem somos
                            </Link>
                        </li>
                        <li>
                            <Link className="link-footer" to="#link" id="link">
                                Política de privacidade
                            </Link>
                        </li>
                        <li>
                            <Link className="link-footer" to="#link" id="link">
                                Termos de uso
                            </Link>
                        </li>
                    </ul> */}

                    <div>
                        <div className="fb">
                            <a href="https://www.facebook.com/profile.php?id=100074853738407" id="link" target="_blank"><img src={Facebook} width="25px" height="25px" /></a>
                        </div>

                        <div className="ig">
                            <a href="https://www.instagram.com/selvagem.modo/" id="link" target="_blank"><img src={Instagram} width="25px" height="25px" /></a>
                        </div>

                        <div className="tt">
                            <a href="https://twitter.com/modoselvagem" id="link" target="_blank"><img src={Twitter} width="25px" height="25px" /></a>
                        </div>

                    </div>

                </Col>




                <Col xs={12} md={6} lg={2} className="footer-categorias pt-4 pb-2">
                    <h6 className="footer-title">Categorias</h6>
                    <ul>
                        <li>
                            <a className="link-footer" href="/products/category/1" id="link">
                                Camping
                            </a>
                        </li>
                        <li>
                            <a className="link-footer" href="/products/category/2" id="link">
                                Vestuário
                            </a>
                        </li>
                        <li>
                            <a className="link-footer" href="/products/category/3" id="link">
                                Acessórios
                            </a>
                        </li>
                        {/* <li>
                            <Link className="link-footer" to="#link" id="link">
                                Novidades
                            </Link>
                        </li>
                        <li>
                            <Link className="link-footer" to="#link" id="link">
                                Mais vendidos
                            </Link>
                        </li> */}
                    </ul>
                </Col>

                <Col xs={12} md={6} lg={2} className="footer-ajuda pt-4 pb-2">
                    <h6 className="footer-title">Ajuda e suporte</h6>
                    <ul>
                        {/* <li>
                            <Link className="link-footer" to="#link" id="link">
                                Perguntas frequentes
                            </Link>
                        </li>
                        <li>
                            <Link className="link-footer" to="#link" id="link">
                                Trocas e devoluções
                            </Link>
                        </li>
                        <li>
                            <Link className="link-footer" to="#link" id="link">
                                Entregas
                            </Link>
                        </li> */}
                        <li>
                            <a className="link-footer" href="/contactus" id="link">
                                Fale conosco
                            </a>
                        </li>
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=+5511978357161" target="blank">
                                <p className="link-footer link-whatsapp-footer">Contato via WhatsApp:</p>
                                <img className="wpp-img" src={WhatsApp} alt="Logotipo Whatsapp" />
                            </a>
                        </li>
                    </ul>
                </Col>

                <Col xs={12} md={6} lg={2} className="footer-pagamento pt-4 pb-2 ">
                    <h6 className="footer-title">Formas de pagamento</h6>
                    <ul className="teste">
                        <li className="footer-icon"> <img src={Visa} width="25px" height="25px" /></li>
                        <li className="footer-icon"><img src={Mastercard} width="25px" height="25px" /></li>
                        <li className="footer-icon"><img src={Diners} width="25px" height="25px" /></li>
                        <li className="footer-icon"><img src={Amex} width="25px" height="25px" /></li>
                        <li className="footer-icon"><img src={Pix} width="20px" height="20px" /></li>
                        <li className="footer-icon"><img src={Boleto} width="20px" height="20px" /></li>
                    </ul>
                    {/* <Row>
                        <Col className="col-whatsapp">
                            <h6 className="footer-title">Contato via WhatsApp:</h6>
                            <a href="https://api.whatsapp.com/send?phone=+5511978357161" target="blank">
                                <img className="wpp-img" src={WhatsApp} alt="Logotipo Whatsapp" />
                            </a>
                        </Col>
                    </Row> */}
                </Col>
            </Row>

            <hr/>

            <Row className="row ltda">

                <Col className="col-12 text-center">

                    <span className="linha1">
                        © Modo Selvagem Ltda. | Todos os direitos reservados
                    </span>

                    <span className="linha2">
                        CNPJ: 00.000.000/0001-02 | Desde 2021
                    </span>

                </Col>
            </Row>

        </Container>
    </footer>
    )
}

export default Footer