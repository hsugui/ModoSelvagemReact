import React from 'react'
import OrderCard from './OrderCard'
import { getUserId } from '../../../../services/auth'

function OrderCardList(props) {

    const orderList = props.orderList || []

    return (
        <>
            {
                orderList.map(order => {
                    return (
                        <>
                            <OrderCard key={order.id} numero={order.id} data={order.orderDate} status={order.status.description} valor={order.totalPrice} path={`/myProfile/account/${getUserId()}/orders/${order.id}`} />
                        </>
                    )
                })
            }



        </>
    )
}

export default OrderCardList