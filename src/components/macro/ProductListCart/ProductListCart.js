import React, { useState } from 'react'
import ProductCardCart from '../ProductCardCart/ProductCardCart'
import '../ProductCardCart/ProductCardCart.css'

function ProductListCart(props) {


    const addToCart = (item) => {
        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []

        let taNoCarrinho = false;
        if (cartList != undefined) {
            cartList.forEach(element => {
                if (item.id == element.id) {
                    element.qtd += 1;
                    taNoCarrinho = true;
                }
            });
        }

        if (!taNoCarrinho) {
            item.qtd = 0;
            cartList.push(item)
            
        }

        if (cartList != undefined) {
            let totalcart = 0;
            cartList.forEach(element => {
                totalcart += element.qtd;
            })
            localStorage.setItem('qtyCart', JSON.stringify(totalcart))
        };

        let cartString = JSON.stringify(cartList)
        localStorage.setItem("cart", cartString)


        window.location.reload();
    }

    const subtractFromCart = (item) => {
        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []

        if (cartList != undefined) {
            cartList.forEach(element => {
                if (item.id == element.id) {
                    if (element.qtd > 1) {
                        element.qtd -= 1;
                    } else {
                        const indice = cartList.indexOf(element => element.id == item.id);
                        cartList.splice(indice, 1);
                    }
                }
            });
        }

        if (cartList != undefined) {
            let totalcart = 0;
            cartList.forEach(element => {
                totalcart += element.qtd;
            })
            localStorage.setItem('qtyCart', JSON.stringify(totalcart))
        };

        let cartString = JSON.stringify(cartList)
        localStorage.setItem("cart", cartString)

        window.location.reload();
    }

    const removeFromCart = (item) => {
        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []

        if (cartList != undefined) {
            cartList.forEach(element => {
                if (item.id == element.id) {
                    const indice = cartList.indexOf(element);
                    cartList.splice(indice, 1);
                }
            });
        }

        if (cartList != undefined) {
            let totalcart = 0;
            cartList.forEach(element => {
                totalcart += element.qtd;
            })
            localStorage.setItem('qtyCart', JSON.stringify(totalcart))
        };

        let cartString = JSON.stringify(cartList)
        localStorage.setItem("cart", cartString)

        window.location.reload();
    }


    const productItems = JSON.parse(localStorage.getItem("cart")) || []

    return (
        <>
            {
                productItems.map(product => {

                    return (

                        
                        <>
                            <ProductCardCart path={'/product/' + product.id} img={product.image || product.images[0].path} title={product.name} 
                            precoVista={product.price} qtdSubtotal={product.qtd} qtd={product.qtd} sub={() => subtractFromCart(product)} 
                            add={() => addToCart(product)} 
                            disabled={product.qtd >=5 
                                || product.qtd >= product.storage 
                                &&
                                (true)} 
                            remove={() => removeFromCart(product)}
                            qtdMax={product.qtd >= product.storage || 
                                product.qtd >=5 ?
                            (<span className="qtd-max-cart">Quantidade máxima.</span>)
                            :
                            ""}
                            />

                        </>
                    )
                })

            }
        </>
    )


}

export default ProductListCart