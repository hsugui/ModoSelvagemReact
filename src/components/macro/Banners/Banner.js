import React from 'react'
import { Carousel } from 'react-bootstrap'
import Banner1 from '../../../assets/imgs/banners/banner.jpg'
import Banner2 from '../../../assets/imgs/banners/banner-principal.jpg'
import Banner3 from '../../../assets/imgs/banners/banner-3.png'
import Banner4 from '../../../assets/imgs/banners/banner-4.jpg'
import './Banner.css'

function Banner(props) {

    return (
        <>
            <Carousel variant="dark" fade interval={3000}>
                <Carousel.Item>
                    <img
                        className="d-block w-100 responsive img-carousel"
                        src={Banner3}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 responsive img-carousel"
                        src={Banner2}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100 img-carousel"
                        src={Banner4}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Banner