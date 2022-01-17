import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import ProductFilter from '../../components/macro/ProductFilter/ProductFilter'
import api from '../../services/Api'
import ProductList from '../../components/macro/ProductList/ProductList'
import './Search.css'

function Search() {

    const [produtos, setProdutos] = useState([])
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const params = new URLSearchParams([['query', query]]);
    const [productSort, setProductSort] = useState("")

    useEffect(() => {
        api.get('/products/search', { params })
            .then((response) => {
                console.log(response.data.args)
                setProdutos(response.data)
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])


    const sortProducts = (value) => {
        setProductSort(value)
        if (value == 'name') {
            produtos.sort(sortByProductNameAsc)
        }
        else if (value == 'minorPrice') {
            produtos.sort(sortByProductPriceAsc)
            
        }else if (value == 'maxPrice') {
            produtos.sort(sortByProductPriceDes)
        }
    }

    const sortByProductNameAsc = (product, nextProduct) => {
        if (product.name < nextProduct.name) { return -1; }
        if (product.name > nextProduct.name) { return 1; }
        return 0;
    }

    const sortByProductPriceAsc = (product, nextProduct) => {
        if (product.price < nextProduct.price) { return -1; }
        if (product.price > nextProduct.price) { return 1; }
        return 0;
    }
    
    const sortByProductPriceDes = (product, nextProduct) => {
        if (product.price < nextProduct.price) { return 1; }
        if (product.price > nextProduct.price) { return -1; }
        return 0;
    }

    return (

        <>
        <title>Modo Selvagem | Busca de produto</title>
            <Container className="page-size">
                <Row>
                        <h2 className="mt-4 mb-5 text-center">Resultados para: <span className="query">{query}</span></h2>
                       
                        

                        <Row>
                            {produtos.length > 0 ?  <> 
                            <Row >
                                <Col className="d-flex justify-content-end align-items-center ">
                            <span className="ordenar me-3 text-end">Ordenar por: </span>
                            <Form.Select className="ordenar sort-border w-25" onChange={(event) => sortProducts(event.target.value)} value = {productSort} >
                               
                                <option value="name" label="Nome"></option>
                                <option value="minorPrice" label="Menores preços"></option>
                                <option value="maxPrice" label="Maiores preços"></option>
                            </Form.Select>
                            </Col>
                            </Row>
                            
                            <ProductList produtos={produtos} /> </> :
                                <div className="mt-3">
                                    <h4 className="text-center">Lamentamos, nenhum produto foi encontrado :(</h4>
                                    <p className="text-center">Verifique se a palavra foi digitada corretamente ou tente buscar outra vez utilizando termos menos específicos. 
                                    </p>

                                </div>
                            
                            }
                        </Row>

                       
                 

                    
                </Row>
            </Container>



        </>

    )
}

export default Search