import React, { useState, useEffect } from 'react'
import './DashboardOrders.css'
import OrderCardList from './OrderCardList'
import { getUserId } from '../../../../services/auth'
import api from '../../../../services/Api'

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

                <h1 className="my-3">Pedidos</h1>

                <div className="principal">
                    <OrderCardList orderList={orders} />
                </div>

            </>
        )
    } else {
        return (
            <>
                <h1 className="my-3">Pedidos</h1>

                <div className="principal">
                    <h2 className="no-order-text text-center mt-3 mb-3">Você ainda não fez nenhum pedido.</h2>
                </div>
            </>
        )
    }

}

export default DashboardOrders