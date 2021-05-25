import React from 'react'
import './Button.css'

const Button = ({color, text, onClick}) => {
    return (
        <button className="button" onClick={onClick} style={{backgroundColor: color}}>{text}</button>
    )
}

Button.defaultProps = {
    color: 'rgb(162, 147, 245)',
    text: 'Button',
}

export default Button

