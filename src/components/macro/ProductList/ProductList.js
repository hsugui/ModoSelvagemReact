import React, {useState, useEffect}from 'react';
import { useParams, Link } from "react-router-dom";
import ProductCard from '../ProductCard/ProductCard'
import BarracaImg from '../../../assets/imgs/home/barraca.webp'
import api from '../../../services/Api'

function ProductList(props) {

    const { id } = useParams()

    const [count, setCount] = useState(1)
    const [estoque, setEstoque] = useState([])
    

    useEffect(() => {
        api.get(`/products/${id}`)
            .then((response) => {
              setEstoque(response.data.storage)
            })
    }, [id])


    const addToCart = (item) => {
        let cartList = localStorage.getItem("cart")
            ? JSON.parse(localStorage.getItem("cart"))
            : []

        let taNoCarrinho = false;
        if (cartList != undefined) {
            cartList.forEach(element => {
                if (item.id == element.id) {
                    element.qtd += count;
                    taNoCarrinho = true;
                    if (element.qtd >= 5){
                        return element.qtd =5
                    }else if (element.qtd >= estoque){
                        return element.qtd = estoque
                    }
                }
            });
        }

        if (!taNoCarrinho) {
            item.qtd = count;
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


        window.location.href = '/cart';
    }

    const produtos = props.produtos || []
    return (
        <>
        <title>Modo Selvagem | Produtos</title>
            {
                produtos.map(item => {
                    return (
                        <ProductCard key={item.id} path={'/product/' + item.id} img={item.image ? item.image : BarracaImg}
                            nomeProd={item.name} precoVista={item.price} path={'/product/' + item.id} onclick={() => addToCart(item)}/>
                    )
                })
            }
        </>
    )

}

export default ProductList