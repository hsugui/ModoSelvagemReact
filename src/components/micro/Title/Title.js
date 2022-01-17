import React from 'react'
import './Title.css'

function Title(props) {

    return(
        <>
        <h1 className={props.className}>{props.label}</h1>
        </>
    )
}

export default Title