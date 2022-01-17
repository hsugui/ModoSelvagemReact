import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from 'react-bootstrap'
import CdBarra from '../../../assets/imgs/payment/codigo-barras.jpg'
import api from '../../../services/Api';
import './Invoice.css'
import { getUserId } from '../../../services/auth'

export const InvoiceToPrint = React.forwardRef((props, ref) => {

  const { id } = useParams()

  const [invoice, setInvoice] = useState({})
  const [items, setItems] = useState([])

  useEffect(() => {
    api.get(`invoices/order/${id}`)
      .then((response) => {
        // localStorage.removeItem("order-id")
        setInvoice(response.data)
        setItems(response.data.items)
      }).catch((err) => {
        console.error("Ops! ocorreu um erro" + err)
      })
  }, [])


  //---------------

  const [customer, setCustomer] = useState({})
  const [address, setAddress] = useState({})
  const [date, setDate] = useState({})
  useEffect(() => {
    api.get(`/success/${id}`)
      .then((response) => {
        // localStorage.removeItem("order-id")
        setCustomer(response.data.customer)
        setAddress(response.data.address)
        setDate(response.data.orderDate)

      }).catch((err) => {
        console.error("Ops! ocorreu um erro" + err)
      })
  }, [])

  //---------------------

  const [customerCell, setCustomerCell] = useState({})

  useEffect(() => {
    api.get(`/dashboard/account/${getUserId()}`)
      .then((response) => {
        setCustomerCell(response.data)
      })
      .catch((err) => {
        console.error("Ops! ocorreu um erro" + err)
      })
  }, [])


  let dataOrder = date.toString().slice(0, 10)

  let pis = parseFloat(invoice.totalPis)
  pis = pis.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let cofins = parseFloat(invoice.totalCofins)
  cofins = cofins.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let icms = parseFloat(invoice.totalIcms)
  icms = icms.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let ipi = parseFloat(invoice.totalIpi)
  ipi = ipi.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let subtotal = parseFloat(invoice.totalProductsValue)
  subtotal = subtotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let frete = parseFloat(invoice.shippingValue)
  frete = frete.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let total = parseFloat(invoice.totalPurchaseValue)
  total = total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  let totalImposto = parseFloat(invoice.totalIpi + invoice.totalIcms)
  totalImposto = totalImposto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


  return (

    <div ref={ref}>
      <Container className="container-boleto mt-2">
        <Container className="container-boleto">
          <Row className="border-bottom-nota">
            <Col xs={4}>
              <p className="fonte-nota">IDENTIFICAÇÃO DO EMITENTE</p>
              <p className="fonte-nota nome-empresa my-2">{invoice.companyName}</p>
              <p className="fonte-nota">AV. VILELA, 18 – TATUAPÉ – CEP: 06800-000</p>
              <p className="fonte-nota">SÃO PAULO – SP</p>
              <p className="fonte-nota">TEL: {invoice.companyPhone}  </p>
            </Col>
            <Col xs={3} className="border-left-nota">
              <p className="fonte-nota nome-empresa danfe-nota">DANFE</p>
              <p className="fonte-nota negrito-maior-nota text-center">DOCUMENTO AUXILIAR DA NOTA FISCAL ELETRÔNICA</p>
              <Row>
                <Col xs={6}>
                  <p className="fonte-nota text-center">0 – ENTRADA</p>
                  <p className="fonte-nota text-center">1 – SAÍDA</p>
                </Col>
                <Col xs={6}>
                  <p className="fonte-nota numero-um-nota">1</p>
                </Col>
              </Row>
              <p className="fonte-nota negrito-maior-nota text-center">Nº 2021{invoice.orderId} FL. 1 / 1</p>
              <p className="fonte-nota negrito-maior-nota text-center">SÉRIE 001</p>
            </Col>
            <Col xs={5} className="border-left-nota">
              <Row className="border-bottom-nota">
                <img className="barras-img codigo-barras-nota" src={CdBarra} alt="Código de barras do boleto"></img>
              </Row>
              <Row className="border-bottom-nota">
                <p className="fonte-nota">CHAVE DE ACESSO</p>
                <p className="fonte-nota text-center">3219 1105 5707 1400 0825 5500 1005 9146 6211 3308 2968</p>
              </Row>
              <Row className="mt-3">
                <p className="fonte-nota text-center">Consulta de autenticidade no portal nacional da NF-e</p>
                <p className="fonte-nota text-center">www.nfe.fazenda.gov.br/portal</p>
                <p className="fonte-nota text-center">ou no site da Sefaz Autorizadora</p>
              </Row>
            </Col>
          </Row>
          <Row className="border-bottom-nota">
            <Col xs={7}>
              <p className="fonte-nota">NATUREZA DE OPERAÇÃO</p>
              <p className="fonte-nota texto-maior-nota">VENDA DE MERCADORIA SUJEITA A ST</p>
            </Col>
            <Col xs={5} className="border-left-nota">
              <p className="fonte-nota">PROTOCOLO DE AUTORIZAÇÃO DE USO</p>
              <p className="fonte-nota texto-maior-nota">1894980489409879</p>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p className="fonte-nota">INSCRIÇÃO ESTADUAL</p>
              <p className="fonte-nota">{invoice.stateRegistration}</p>
            </Col>
            <Col xs={4} className="border-left-nota">
              <p className="fonte-nota">INSCRIÇÃO ESTADUAL DO SUBST. TRIB.</p>
            </Col>
            <Col xs={4} className="border-left-nota"  >
              <p className="fonte-nota">CNPJ / CPF</p>
              <p className="fonte-nota">{invoice.cnpj}</p>
            </Col>
          </Row>
        </Container>
        <p className="fonte-nota negrito-maior-nota">DESTINATÁRIO / REMETENTE</p>
        <Container className="container-nota">
          <Row className="border-bottom-nota">
            <Col xs={7}>
              <p className="fonte-nota">NOME / RAZÃO SOCIAL</p>
              <p className="fonte-nota">{customer.name} {customer.surname} </p>
            </Col>
            <Col xs={3} className="border-left-nota">
              <p className="fonte-nota">CNPJ / CPF</p>
              <p className="fonte-nota">{customer.cpf} </p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">DATA DA EMISSÃO</p>
              <p className="fonte-nota">{dataOrder}</p>
            </Col>
          </Row>
          <Row className="border-bottom-nota">
            <Col xs={6}>
              <p className="fonte-nota">ENDEREÇO</p>
              <p className="fonte-nota">{address.street}, {address.number}{address.complement ? "," : ""} {address.complement} </p>
            </Col>
            <Col xs={3} className="border-left-nota">
              <p className="fonte-nota">BAIRRO / DISTRITO</p>
              <p className="fonte-nota">{address.district} </p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">CEP</p>
              <p className="fonte-nota">{address.cep} </p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">DATA SAÍDA / ENTRADA</p>
              <p className="fonte-nota">{dataOrder}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <p className="fonte-nota">MUNICÍPIO</p>
              <p className="fonte-nota">{address.city} </p>
            </Col>
            <Col xs={3} className="border-left-nota">
              <p className="fonte-nota">FONE / FAX</p>
              <p className="fonte-nota">{customerCell.cellPhone} </p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">UF</p>
              <p className="fonte-nota">{address.uf} </p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">INSCRIÇÃO ESTADUAL</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">HORA DA SAÍDA</p>
            </Col>
          </Row>
        </Container>
        <p className="fonte-nota negrito-maior-nota">CÁLCULO DO IMPOSTO</p>
        <Container className="container-nota">
          <Row className="border-bottom-nota">
            <Col xs={2}>
              <p className="fonte-nota">BASE DE CÁLCULO DO ICMS</p>
              <p className="fonte-nota"></p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR DO ICMS</p>
              <p className="fonte-nota ">{icms}</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">BASE CÁLC. ICMS. SUBST.</p>
              <p className="fonte-nota"></p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR DO ICMS SUBST.</p>
              <p className="fonte-nota"></p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR APROX. DOS TRIBUTOS</p>
              <p className="fonte-nota">{totalImposto} </p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR TOTAL DOS PRODUTOS</p>
              <p className="fonte-nota">{subtotal}</p>
            </Col>
          </Row>
          <Row>
            <Col xs={2}>
              <p className="fonte-nota">VALOR DO FRETE</p>
              <p className="fonte-nota">{frete}</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR DO SEGURO</p>
              <p className="fonte-nota">0,00</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">DESCONTO</p>
              <p className="fonte-nota">0,00</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">OUTRAS DESP. ACESS.</p>
              <p className="fonte-nota">0,00</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR DO IPI</p>
              <p className="fonte-nota">{ipi}</p>
            </Col>
            <Col xs={2} className="border-left-nota">
              <p className="fonte-nota">VALOR TOTAL DA NOTA</p>
              <p className="fonte-nota">{total}</p>
            </Col>
          </Row>
        </Container>
        <p className="fonte-nota negrito-maior-nota">DADOS DO PRODUTO</p>
        <Container className="container-nota">
          <Row className="border-bottom-nota dados-nota-background ">
            <Col xs={1}>
              <p className="fonte-nota">CD. PROD.</p>
            </Col>
            <Col xs={4} className="border-left-nota">
              <p className="fonte-nota">DESCRIÇÃO DO PRODUTO</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">QUANT.</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">VALOR UNITÁRIO</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">VALOR DESCONTO</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">VALOR LÍQUIDO</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">VALOR ICMS</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <p className="fonte-nota">VALOR IPI</p>
            </Col>
            <Col xs={1} className="border-left-nota">
              <Row>
                <p className="fonte-nota text-center border-bottom-nota">ALÍQ.</p>
              </Row>
              <Row>
                <Col xs={6} className="d-flex justify-content-center">
                  <p className="fonte-nota">ICMS</p>
                </Col>
                <Col xs={6} className="border-left-nota">
                  <p className="fonte-nota ">IPI</p>
                </Col>
              </Row>
            </Col>
          </Row>
        
            {items.map(item => {
              let valorProduto = parseFloat(item.grossValue / item.quantity)
              valorProduto = valorProduto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

              let valorTotalProduto = parseFloat(item.grossValue)
              valorTotalProduto = valorTotalProduto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

              let icmsProd = parseFloat(item.icmsAmount)
              icmsProd = icmsProd.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })


              let ipiProd = parseFloat(item.ipiAmount)
              ipiProd = ipiProd.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              return (
                <>
                  <Row>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center ">
                      <span className="fonte-nota"> 00{item.productId}  </span>
                    </Col>
                    <Col xs={4} className=" d-flex justify-content-start align-items-center border-left-nota">
                      <span className="fonte-nota"> {item.productName}  </span>
                    </Col>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center border-left-nota">
                      <span className="fonte-nota"> {item.quantity}  </span>
                    </Col>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center border-left-nota">
                      <span className="fonte-nota"> {valorProduto}  </span>
                    </Col>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center border-left-nota">
                      <span className="fonte-nota"> R$0,00  </span>
                    </Col>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center border-left-nota">
                      <span className="fonte-nota"> {valorProduto}  </span>
                    </Col>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center border-left-nota">
                      <span className="fonte-nota"> {icmsProd}  </span>
                    </Col>
                    <Col xs={1} className=" d-flex justify-content-center align-items-center border-left-nota">
                      <span className="fonte-nota"> {ipiProd}  </span>
                    </Col>
                    <Col xs={1} className="border-left-nota">
                      <Row>
                        <Col xs={6} className=" d-flex justify-content-center align-items-center">
                          <span className="fonte-nota "> {item.pcIcms}%  </span>
                        </Col>
                        <Col xs={6} className="d-flex justify-content-center align-items-center border-left-nota">
                          <span className="fonte-nota"> {item.pcIpi}%  </span>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                </>
              )
            })}
       
        </Container>
        <p className="fonte-nota negrito-maior-nota margem-infos-adicionais">DADOS ADICIONAIS</p>
        <Container className="container-nota mb-3">
          <Row className="altura-infos-adicionais">
            <Col xs={8}>
              <p className="fonte-nota">INFORMAÇÕES COMPLEMENTARES</p>
            </Col>
            <Col xs={4} className="border-left-nota">
              <p className="fonte-nota">RESERVADO AO FISCO</p>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );

});

export default InvoiceToPrint;