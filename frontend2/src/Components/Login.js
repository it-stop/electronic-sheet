import React from 'react'
class Login extends React.Component {

    constructor(props){
        super(props)
        this.loginRef = React.createRef()
        this.passwordRef = React.createRef()
        this.login = this.login.bind(this)
        console.log(this.props)
    }

    login() {
        const login = this.loginRef.current.value
        const password = this.passwordRef.current.value
        if (login.length > 0 && password.length > 0)
            this.props.onLogin(login, password)
    }
    
    render() {
        return <div>
            email:
            <input type="email" ref={this.loginRef}></input>
            <br/>
            password:
            <input type="password" ref={this.passwordRef}></input>
            <br/>
            <button onClick={this.login}>login</button>
        </div>
    }
}

export default Login;