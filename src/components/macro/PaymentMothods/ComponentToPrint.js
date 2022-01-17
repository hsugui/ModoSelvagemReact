import React, { useEffect, useState } from "react";
import { Col, Container, Row } from 'react-bootstrap'
import './Boleto.css'
import CdBarra from '../../../assets/imgs/payment/codigo-barras.jpg'
import Itau from '../../../assets/imgs/itau-icon.svg'
import api from '../../../services/Api';
import { useParams } from "react-router-dom";

export const ComponentToPrint = React.forwardRef((props, ref) => {

  const { id } = useParams()

  const [order, setOrder] = useState({})
  const [customer, setCustomer] = useState({})
  const [address, setAddress] = useState({})
  const [date, setDate] = useState({})
  useEffect(() => {
    api.get(`/success/${id}`)
      .then((response) => {
        // localStorage.removeItem("order-id")
        setOrder(response.data)
        setCustomer(response.data.customer)
        setAddress(response.data.address)
        setDate(response.data.orderDate)

      }).catch((err) => {
        console.error("Ops! ocorreu um erro" + err)
      })
  }, [])

  let dataOrder = date.toString().slice(0, 10)
  let dataArray = dataOrder.split("/")
  let dataVenc = new Date(dataArray[2] + "-" + dataArray[1] + "-" + dataArray[0])
  dataVenc.setDate(dataVenc.getDate() + 4)

  let valorOrder = parseFloat(order.totalPrice)
  valorOrder = valorOrder.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  
  return (
    <div ref={ref}>
      <Container className="container-boleto mt-2">
        <Row >
          <Col xs={4} className="borda-direita d-flex align-items-center">
            <span className="titulos-boleto textos-boleto"> <img src={Itau} width="35px" height="35px" /> <span className="ms-1">Banco Itaú S.A.</span></span>
          </Col>
          <Col xs={1} className="borda-direita d-flex align-items-center justify-content-center">
            <span className=" textos-boleto">341-7</span>
          </Col>
          <Col xs={7} className="d-flex align-items-center justify-content-center">
            <span className="textos-boleto">45823.99654 56523.854210 00235.96523 0 85404112552314</span>
          </Col>
        </Row>
        <Row className="borda-cima">
          <Col xs={9}>
            <span><span className=""><strong>Local de pagamento</strong><br></br> Pagável em qualquer banco até a data do vencimento.</span></span>
          </Col>
          <Col xs={3} className="borda-esquerda">
            <span className="titulos-boleto">Vencimento</span><br></br>
            <span className="">{dataVenc.toLocaleDateString("pt-BR")}</span>

          </Col>
        </Row>
        <Row className="borda-cima">
          <Col xs={9}>
            <span className="titulos-boleto">Beneficiário</span><br></br>
            <span className="">Loja Modo Selvagem</span>
          </Col>
          <Col xs={3} className="borda-esquerda">
            <span className="titulos-boleto">Agência/Código do Beneficiário</span><br></br>
            <span className="">2475-1 / 854236-8</span>
          </Col>
        </Row>
        <Row className="borda-cima">
          <Col xs={2}>
            <span className="titulos-boleto">Data Documento</span><br></br>
            <span >{dataOrder}</span>
          </Col>
          <Col xs={2} className="borda-esquerda">
            <span className="titulos-boleto">Número Documento</span><br></br>
            <span>2021{order.id}</span>
          </Col>
          <Col xs={2} className="borda-esquerda">
            <span className="titulos-boleto">Espécie Doc.</span><br></br>
            <span>DOC</span>
          </Col>
          <Col xs={1} className="borda-esquerda">
            <span className="titulos-boleto">Aceite</span><br></br>
            <span>N</span>
          </Col>
          <Col xs={2} className="borda-esquerda">
            <span className="titulos-boleto">Data Processamento</span><br></br>
            <span>{dataOrder}</span>
          </Col>
          <Col xs={3} className="borda-esquerda">
            <span className="titulos-boleto">Nosso número</span><br></br>
            <span>175/147856523789-2</span>
          </Col>
        </Row>
        <Row className="borda-cima">
          <Col xs={2}>
            <span className="titulos-boleto">Uso do Banco</span>
          </Col>
          <Col xs={2} className="borda-esquerda">
            <span className="titulos-boleto">Carteira</span><br></br>
            <span>000</span>
          </Col>
          <Col xs={1} className="borda-esquerda">
            <span className="titulos-boleto">Espécie</span><br></br>
            <span>R$</span>
          </Col>
          <Col xs={2} className="borda-esquerda">
            <span className="titulos-boleto">Quantidade</span><br></br>
          </Col>
          <Col xs={2} className="borda-esquerda">
            <span className="titulos-boleto">(x) Valor</span><br></br>
          </Col>
          <Col xs={3} className="borda-esquerda">
            <span className="titulos-boleto">(=) Valor do Documento</span><br></br>
            <span>{valorOrder} </span>
          </Col>
        </Row>
        <Row className="borda-cima">
          <Col xs={9}>
            <span className="titulos-boleto">Instruções</span><br></br>
            <span>Não receber o pagamento após o vencimento.</span>
          </Col>
          <Col xs={3}>
            <Row className="borda-esquerda"><p>(-) Desconto</p></Row>
            <Row className="borda-esquerda"><p>(+) Mora/Multa</p></Row>
            <Row className="borda-esquerda"><p>(+) Outros Acréscimos</p></Row>
            <Row className="borda-esquerda"><p>(=) Valor Cobrado</p></Row>
          </Col>
        </Row>
        <Row className="borda-cima">
          <p className="titulos-boleto">Pagador</p>
          <p>{customer.name} {customer.surname}</p>
          <span className="box-info">{address.street}, {address.number}{address.complement ? ", " + address.complement : ""} </span>
          <span className="box-info">{address.district}, {address.city} – {address.uf}</span>
          <span className="box-info">CEP: {address.cep}</span>

        </Row>
        <Row className="borda-cima">
          <Col xs={9} className="img-boleto">
            <img className="barras-img" src={CdBarra} alt="Código de barras do boleto"></img>

          </Col>
          <Col xs={3}>
            <p className="titulos-boleto">Autenticação Mecânica / FICHA DE COMPENSAÇÃO</p>
          </Col>
        </Row>
      </Container>

    </div>
  );

});

export default ComponentToPrint;