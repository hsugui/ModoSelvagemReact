import React, { useEffect, useState } from 'react'
import './Home.css'
import Banners from '../../components/macro/Banners/Banner'
import FreteGratisImg from '../../assets/imgs/home/delivery.png'
import CreditCardImg from '../../assets/imgs/home/credit-card.png'
import DiscountImg from '../../assets/imgs/home/discount.png'
import { Container, Row } from 'react-bootstrap'
import BenefitsCard from '../../components/macro/BenefitsCard/BenefitsCard'
import api from '../../services/Api'
import CategoryList from '../../components/macro/CategoryList/CategoryList'


function Home(props) {

    const [categories, setCategories] = useState([])
    
    useEffect(() => {
        api.get('/home/products')
            .then((response) => {
                setCategories(response.data)
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    return (
        <>
            <title>Modo Selvagem | Home</title>
            <Banners />
            <Container>
                <Row className="beneficios mt-5">
                    <BenefitsCard img={FreteGratisImg} alt="Ícone de frete grátis" text="Frete grátis" text2="Para compras a partir de R$ 500" />
                    <BenefitsCard img={CreditCardImg} alt="Ícone de cartão de crédito" text="Parcele em até 6x no cartão" text2="Válido para todas as compras" />
                    {/* <BenefitsCard img={DiscountImg} alt="Ícone de desconto" text="15% de desconto à vista" /> */}
                </Row>

                <CategoryList categories={categories} />

            </Container>
        </>
    )
}

export default Home