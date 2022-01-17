import React from 'react';
import Cards from 'react-credit-cards';
import { Form, Row, Col } from 'react-bootstrap'
import InputMask from 'react-input-mask';
import 'react-credit-cards/es/styles-compiled.css';
import Mastercard from "../../../assets/imgs/checkout/mastercard_curved.png"
import Visa from "../../../assets/imgs/checkout/visa_curved.png";
import Diners from "../../../assets/imgs/checkout/diners-club.png";
import Amex from "../../../assets/imgs/checkout/american_express.png";
import './CreditCardStyle.css'

export default class CreditCardStyle extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    placeholders: { name: 'SEU NOME AQUI' },
    locale: { valid: 'válido até' },
    acceptedCards: ['visa', 'mastercard', 'amex', 'dinersclub']
  };

  // charAllowName(e) {
  //   this.setState({inputTxt:e.target.value.replace(/[^a-zA-Z ]/ig, '')});
  // }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }

  handleInputChange = (e) => {
    // this.setState({inputTxt:e.target.value.replace(/[^a-zA-Z ]/ig, '')});
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="mt-4" id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
          placeholders={this.state.placeholders}
          locale={this.state.locale}
          acceptedCards={this.state.acceptedCards}
        />

        <Row className="mt-3">
          <Col sm={6}>
            <Form.Label for="numero-cartao" className="label-cartao">Número do cartão</Form.Label>
            <InputMask name="number" mask="9999 9999 9999 9999" maskChar={null} type="text" className="input-cartao mb-0 form-control" id="numero-cartao" onChange={this.handleInputChange} onFocus={this.handleInputFocus} placeholder="Digite o número do cartão" required />
            <img className="cards" src={Mastercard} alt="Mastercard" width="32" />
            <img className="cards" src={Visa} alt="Mastercard" width="32" />
            <img className="cards" src={Diners} alt="Mastercard" width="32" />
            <img src={Amex} alt="Mastercard" width="32" /><br />
          </Col>
          <Col sm={6}>
            <Form.Label for="nome-cliente" className="label-cartao">Nome impresso no cartão</Form.Label>
            <Form.Control name="name" value={this.state.inputTxt} type="text" className="input-cartao" id="nome-cliente" onChange={this.handleInputChange} onFocus={this.handleInputFocus} placeholder="Digite o nome no cartão" required />
          </Col>
        </Row>

        <Row className="mt-2">
          <Col lg={4}>
            <Form.Label for="validade-cartao" className="label-cartao">Validade</Form.Label><br />
            <InputMask type="text" mask="99/99" placeholder="mm/aa" className="form-custom form-control" id="validade-cartao" onChange={this.handleInputChange} onFocus={this.handleInputFocus} name="expiry" required />
          </Col>
          <Col>
            <Form.Label for="cvv" className="label-cartao">CVV</Form.Label>
            <InputMask type="text" mask="9999" maskChar={null} className="input-cartao form-control" name="cvc" onChange={this.handleInputChange} onFocus={this.handleInputFocus} placeholder="CVV" required />
          </Col>
        </Row>


      </div>
    );
  }
}