import React from 'react'
import { Link } from 'react-router-dom';
import ProductList from '../ProductList/ProductList'
import './CategoryList.css'

function CategoryList(props) {


    const categories = props.categories || []

    return (
        <>
            {

                categories.map(categoryProducts => {

                    return (
                        <>
                            <h2 className="titulo-categoria"><Link to={"/products/category/" + categoryProducts.category.id}>{categoryProducts.category.categoryName}</Link></h2>

                            <div className="row row-col-sm-12 row-cols-md-2 row-cols-xl-4 g-4">
                                <ProductList produtos={categoryProducts.products} />
                            </div>

                        </>
                    )
                })
            }
        </>
    )
}

export default CategoryList