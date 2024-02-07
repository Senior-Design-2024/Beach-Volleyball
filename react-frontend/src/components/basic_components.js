import React from 'react'
import { Component } from 'react'

export function BasicButton({onClick, buttonText="BASIC BUTTON"}){
    return(
    <div>
        <button onClick={onClick}>{buttonText}</button>
    </div>
    )
}