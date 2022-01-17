import React, {useState, useEffect}from 'react';
import { useParams, Link } from "react-router-dom";
import api from '../../services/Api'
import { Container, Row, Accordion, Carousel, Col } from 'react-bootstrap';
import './Product.css'
import ProductList from '../../components/macro/ProductList/ProductList'


function Product(props) {
    
    const { id } = useParams()
    const [produto, setProduto] = useState([])
    const [img, setImg] = useState([])
    const [mainImg, setMainImg] = useState({})
    const [count, setCount] = useState(1)
    const [botaoIncremento, setBotaoIncremento]= useState()
    const [botaoDecremento, setBotaoDecremento]= useState()
    const [relacionados, setRelacionados] = useState({})
    const [produtos, setProdutos] = useState([])
    const [estoque, setEstoque] = useState([])
    
    useEffect(() => {
        api.get(`/products/${id}`)
            .then((response) => {
                setProduto(response.data)
                setEstoque(response.data.storage)
                setImg(response.data.images)
                setMainImg(response.data.images[0])
                setRelacionados(response.data.subcategory)
            })
    }, [id])

       useEffect(() => {
        api.get('/products/subcategory/'+relacionados.id)
        .then((response) => {
            setProdutos(response.data.products.slice(0,4))
        })

        },[relacionados])

       
    
   useEffect(()=>{
         if (count >= estoque || count >= 5){
           setBotaoIncremento(true)
         }else{
            setBotaoIncremento(false)
         }
        })

        useEffect(()=>{
            if (count <= 1){
             setBotaoDecremento(true)
            }else{
              setBotaoDecremento(false)
            }
           })

    
        console.log(botaoIncremento)
        console.log(botaoDecremento)
	
    
    let precoParcelado = (parseFloat(produto.price) / 6)
    precoParcelado = precoParcelado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    let preco = (parseFloat(produto.price))
    preco = preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

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
                    if (element.qtd >= estoque){
                        return element.qtd = estoque
                    }else if ( element.qtd >= 5){
                        return element.qtd =5
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


    return (
        <>
        <Container className="container container-produto mt-4">
                    <Row>
                        <Col xs={12}>
                            <a className="indicador-categoria"  href=""></a>
                        </Col>
                    </Row>
                <Row className=" m-0 justify-content-center">
                    <Col className="d-inline" xs={2} lg={1} md={2} sm={2} xs={2}>
                        <ul className="d-inline lista-imagens-pequenas col-2 col-sm-2 col-md-2 col-lg-1 d-flex justify-content-center flex-column">
                            {img.map((vai) => (
                            <li key={vai.id}>
                                <img src={vai.path} className="img-pequenas" onClick={() => setMainImg(vai)}/>
                            </li>
                        ))}
                        </ul>
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={5} className="foto">
                    <img
                                className="main-img"
                                src={mainImg.path}
                                alt={mainImg.title}
                                />
                    </Col>
                <Col xs={12} sm={12} md={12} lg={6} className="info-produto">
                    <h3 className="nome-produto-detalhes">{produto.name}</h3>
                            <p>{produto.shortDescription}</p>
                    {produto.storage >=1 ? (   
                    <Row className="div-qtd">

                        <Col>
                            <div className=" quantidade-product d-flex justify-content-start responsivo">
                            <label className="product-qtd">Quantidade:</label>
                                <div className="btn-group" role="group">
                                <button disabled={botaoDecremento} onClick={() => setCount(count - 1)} type="button" className="btn btn-menos">-</button>
                                <button type="button"  className="btn qtd">{count}</button>
                                <button disabled={botaoIncremento} onClick={() => setCount(count + 1)} type="button" className="btn btn-mais">+</button>
                                    {count >=5  && (<span className="estoque">Quantidade máx.</span>)}
                                    {count >= estoque  && (<span className="estoque">Quantidade máx.</span>)}
                                    <input className="quantidade" type="hidden" id="quantidade" value="1" />
                                </div>
                            </div>
                            
                        </Col>
                        <div className="div-preco ">
                            <p className="preco-product">{preco}</p>
                            <p className="vista">  À VISTA</p>
                            <p className="parcela">ou 6x de {precoParcelado}</p>
                        </div>
                        <Row>
                            <Col xs={12} sm={12} className="d-flex justify-content-center">
                                <a className="botao-comprar btn-conversao" onClick={ () => addToCart(produto)} href="/cart">COMPRAR</a>
                            </Col>
                        </Row>
                    </Row>
                        ):<p className="sem-estoque">Produto sem estoque</p>}
                    </Col>
                </Row>
                <Row className="div-caracteristicas mt-5 justify-content-center">
                    <h2 className="product-h2">Características</h2>
                    <p>{produto.fullDescription}</p>
                    <p>Dimensões: {produto.dimensions}</p>
            </Row>
            <h2 className="product-h2"><Link className="link-relacionados" to={"/products/subcategory/"+relacionados.id}>Produtos Relacionados</Link></h2>
                <div className="row row-col-sm-12 row-cols-md-2 row-cols-xl-4 g-4">
                    <ProductList  produtos={produtos}/>  
                </div>
            </Container>
        </>
    )
    
}

export default Product