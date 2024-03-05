import React from 'react'
import '../App.css'

export function BasicButton({onClick, buttonText="BASIC BUTTON", buttonColor}){
    return(
    <div>
        <button className="button" onClick={onClick}>{buttonText}</button>
    </div>
    )
}