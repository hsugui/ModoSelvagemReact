import React, { useState, useEffect } from 'react'
import './DashboardOrders.css'
import { Col, Container } from 'react-bootstrap'
import OrderCardList from '../../../components/macro/DashboardContent/DashboardOrders/OrderCardList'
import { getUserId } from '../../../services/auth'
import api from '../../../services/Api'
import { Link } from 'react-router-dom'
import DashboardMenu from '../DashboardMenu';

function DashboardOrders(props) {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        api.get(`/dashboard/account/${getUserId()}/orders`)
            .then((response) => {
                setOrders(response.data)
                console.log(response.data)
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    if (orders.length > 0) {
        return (
            <>

                <title>Modo Selvagem | Minha conta</title>
                <Container fluid className="row my-3 page-size">
                    <DashboardMenu />
                    <Col sm={8} lg={10}>
                        <h1 className="my-3">Pedidos</h1>

                        <div className="principal">
                            <OrderCardList orderList={orders} />
                        </div>
                    </Col>
                </Container>


            </>
        )
    } else {
        return (
            <>

                <title>Modo Selvagem | Minha conta</title>
                <Container fluid className="row my-3 page-size">
                    <DashboardMenu />
                    <Col sm={8} lg={10}>
                        <h1 className="my-3">Pedidos</h1>

                        <div className="principal">
                            <h2 className="no-order-text text-center mt-3 mb-3">Você ainda não fez nenhum pedido.</h2>
                        </div>
                    </Col>
                </Container>



            </>
        )
    }

}

export default DashboardOrders