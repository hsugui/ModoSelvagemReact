import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'
import { Button as ButtonBootstrap } from 'react-bootstrap'

function Button(props) {

    const typeButton = () => {
        if (props.route) {
            return (
                <Link to={props.route} className={props.className}>
                    {props.children}
                    {props.label}
                </Link>
            )
        } else {

            if (props.onclick) {
                return (
                    <ButtonBootstrap onClick={() => props.onclick()} className={props.className} disabled={props.disabled}>
                        {props.label}
                        {props.children}
                    </ButtonBootstrap>
                )
            } else {
                return (
                    <ButtonBootstrap type="submit" className={props.className} disabled={props.disabled}>
                        {props.label}
                        {props.children}
                    </ButtonBootstrap>
                )
            }
        }

    }

    return (
        <>
            {typeButton()}
        </>
    )
}

export default Button