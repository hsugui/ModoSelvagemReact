import React, { useEffect, useState } from 'react'
import './Products.css'
import { Col, Container, Row, Form } from 'react-bootstrap'
import ProductFilter from '../../components/macro/ProductFilter/ProductFilter'
import axios from 'axios'
import ProductList from '../../components/macro/ProductList/ProductList'
import { useParams } from 'react-router-dom'
import Title from '../../components/micro/Title/Title'




function Products(props) {


    const { id } = useParams()
    const { filter } = useParams()
    const [produtos, setProdutos] = useState([])
    const [filterName, setFilterName] = useState("")
    const [productSort, setProductSort] = useState("")
    const [allProducts, setAllProducts] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/products/${filter}/${id}`)
            .then((response) => {
                response.data.products.sort(sortByProductNameAsc)
                setProdutos(response.data.products)
                setAllProducts(response.data.products)
                if (filter == "subcategory") {
                    setFilterName(response.data.subcategory.subcategoryName)
                } else {
                    setFilterName(response.data.category)
                }
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

        } else if (value == 'maxPrice') {
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

    function handleFilter(preco, marca) {
        let filteredProducts = allProducts
        if (marca != undefined) {
            filteredProducts = (filteredProducts.filter(function (produto) {
                return produto.name.toLowerCase().indexOf(marca.toLowerCase()) > -1
            }))
        }

        if (preco != undefined) {
            filteredProducts = (filteredProducts.filter(function (produto) {
                return produto.price < preco
            }))
        }
        setProdutos(filteredProducts)
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Title className="categoria mt-3" label={filterName} />
                    {produtos.length == 0 ?
                        <h4 className="text-center">Lamentamos, nenhum produto foi encontrado :(</h4>
                        : ""}
                </Row>
                <Row>
                    <Col lg={3}>
                        <ProductFilter filter={handleFilter} />
                    </Col>
                    <Col lg={9}>


                        <Row>
                            <Col className="d-flex justify-content-end align-items-center ">
                                <span className="ordenar me-3">Ordenar por: </span>
                                <Form.Select className="ordenar sort-border w-25" onChange={(event) => sortProducts(event.target.value)} value={productSort} >
                                    {/* <option>Ordenar por </option> */}
                                    <option value="name" label="Nome"></option>
                                    <option value="minorPrice" label="Menores preços"></option>
                                    <option value="maxPrice" label="Maiores preços"></option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row>
                            {produtos.length > 0 ?
                                <ProductList produtos={produtos} />
                                : ""}
                        </Row>
                    </Col>
                </Row>

           
        </Container>

        </>

    )
}

export default Products