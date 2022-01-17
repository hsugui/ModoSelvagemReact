import React from 'react'
import OrderItem from '../OrderItem/OrderItem'


function OrderItemList(props) {


    const items = props.items

    const itemsOrder = props.itemsOrder || []

    if (itemsOrder.length > 0) {
        return (

            <>
                {
                    itemsOrder.map(item => {
                        return (
                            <OrderItem path={'/product/' + item.id} img={item.productImage.path} title={item.productName}
                                quantity={item.quantity} totalPrice={item.grossValue} />

                        )
                    })
                }
            </>
        )
    } else {

        return (
            items.map(item => {
                return (
                    <OrderItem key={item.id} path={'/product/' + item.id} img={item.image || item.images[0].path}
                        nomeProd={item.name} title={item.name}  quantity={item.qtd} totalPrice={item.price * item.qtd} />
                )
            })
        )
    }
}

export default OrderItemList