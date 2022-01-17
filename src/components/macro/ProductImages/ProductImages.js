import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import api from '../../../services/Api';
// import Barraca from '../../assets/imgs/product/barraca_mini_pack_azteq.JPG'

function ProductImages(props) {
    const imgs = [props.images]
    const [imgPrincipal, setImgPrincipal] = useState(imgs[0])


    // useEffect(() => {

    // }, [])


    function listarImagens() {
        return imgs.map((img) => {
            return (
                <a href="#">
                    <li ><img src={img.path} alt={img.title} className="img-pequenas" onClick={setImgPrincipal(img)} /></li>
                </a>
            )
        })
    }

    return (
        <>
            <Col className="d-inline" xs={2} lg={1} md={2} sm={2} xs={2}>

                <ul className="d-inline lista-imagens-pequenas col-2 col-sm-2 col-md-2 col-lg-1 d-flex justify-content-center flex-column">
                    {listarImagens()}
                </ul>
            </Col>
            <Col xs={9} sm={9} md={9} lg={5} className="foto mt-4 ">
                <img
                    className="d-block w-100"
                    src={imgPrincipal.path}
                    alt={imgPrincipal.title}
                />
            </Col>
        </>
    )
}

export default ProductImages