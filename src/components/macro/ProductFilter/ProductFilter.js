import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './ProductFilter.css'

function ProductFilter(props) {
    const [filter, setFilter] = useState({
        price: undefined,
        name: undefined
    })

    useEffect(() => {

        props.filter(filter.price, filter.name)
    }, [filter])
    return (
        <>
            <div className="menu-lateral">
                <div className="filtrar-por d-flex justify-content-between">
                    <span className="text-filtrar-por">Filtrar por</span>
                    <button className="btn-limpar-filtros" onClick={() => window.location.reload()}>Limpar filtros</button>
                </div>
                <div className="filtro">
                    <h4 className="nome-filtro">Marca</h4>
                    {['radio'].map((type) => (
                        <div key={`default-${type}`} className="ms-2">
                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                id="nautika"
                                label="Nautika"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Nautika"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Guepardo"
                                id="guepardo"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Guepardo"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Trilhas e Rumos"
                                id="trilhas-rumos"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Trilhas e Rumos"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Azteq"
                                id="azteq"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Azteq"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Forhonor"
                                id="forhonor"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Forhonor"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Coleman"
                                id="coleman"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Coleman"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Albatroz"
                                id="albatroz"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Albatroz"
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                name={`default-${type}`}
                                label="Mor"
                                id="mor"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        name: "Mor"
                                    })
                                }}
                            />
                        </div>
                    ))}
                </div>
                <div className="filtro">
                    <h4 className="nome-filtro">Preço</h4>
                    {['radio'].map((type) => (
                        <div key={`default-${type}`} className="ms-2">

                            <Form.Check
                                type={type}
                                id={`preco-400`}
                                label="Até R$ 400,00"
                                name="radio-preco"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        price: 400
                                    })
                                }
                                }
                            />

                            <Form.Check
                                type={type}
                                id={`preco-600`}
                                label="Até R$ 600,00"
                                name="radio-preco"
                                onChange={() => {
                                    setFilter({
                                        ...filter,
                                        price: 600
                                    })
                                }}
                            />

                            <Form.Check
                                type={type}
                                id={`preco-800`}
                                label="Até R$ 800,00"
                                name="radio-preco" onChange={() => {
                                    setFilter({
                                        ...filter,
                                        price: 800
                                    })
                                }}
                            />
                            <Form.Check
                                type={type}
                                id={`preco-1000`}
                                label="Até R$ 1000,00"
                                name="radio-preco" onChange={() => {
                                    setFilter({
                                        ...filter,
                                        price: 1000
                                    })
                                }}
                            />
                            <Form.Check
                                type={type}
                                id={`preco-2000`}
                                label="Até R$ 2000,00"
                                name="radio-preco" onChange={() => {
                                    setFilter({
                                        ...filter,
                                        price: 2000
                                    })
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ProductFilter
