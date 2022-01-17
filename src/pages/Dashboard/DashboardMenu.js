import React, { useEffect, useState } from 'react'
import { Col, Container, Form } from 'react-bootstrap'
import './Dashboard.css'
import { getUserId, logout} from '../../services/auth'
import api from '../../services/Api'
import { Link } from 'react-router-dom'

function DashboardMenu(props) {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        api.get(`/dashboard/account/${getUserId()}`)
            .then((response) => {
                setUserData(response.data)
            })
            .catch((err) => {
                console.error("Ops! ocorreu um erro" + err)
            })
    }, [])

    return (
        <>

                <Col sm={4} lg={2}>

                    <div className="perfil my-3">
                        <div className="icone-perfil mb-2"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"
                            fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            <path fill-rule="evenodd"
                                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
                        </svg></div>
                        <div className="nome">{userData.name + " " + userData.surname}</div>
                    </div>
                    <ul className="menu-lateral">
                        <Link className="link-dash" to={`/myProfile/account/${getUserId()}`}><li className="item">Dados pessoais</li></Link>
                        <Link className="link-dash" to={`/myProfile/account/${getUserId()}/addresses`}><li className="item">Endereços</li></Link>
                        <Link className="link-dash" to={`/myProfile/account/${getUserId()}/orders`}><li className="item">Pedidos</li></Link>
                        <li onClick={logout} className="item">Sair</li>
                    </ul>
                </Col>

        </>
    )
}

export default DashboardMenu