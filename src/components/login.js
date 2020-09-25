import React from 'react'

export default function Login(props) {
    return (
        <form onSubmit = {props.submitHandle}>
            <input name="userName" onChange={props.handleChange} value = {props.values.userName}/>
            <input name="password" onChange={props.handleChange} value = {props.values.password}/>
            <button>login</button>
        </form>
    )
}
