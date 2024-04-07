import React, { Component } from 'react'

export default class Landing extends Component {
    render() {
        function check(){
            console.log(this.props.history)
            console.log(localStorage.getItem("userData") === null)
            if (localStorage.getItem("userData") === null)
              return this.props.history.push('/Myevents')
            else 
                return this.props.history.push('/login')
          }
        var login = localStorage.getItem('userData')
        console.log(login)
        const loginLink = () =>{
            this.props.history.push('/Login')
            console.log("this is login")
        }
        const eventLink = () =>{
            this.props.history.push('/MyEvents')
        }
        return (
            <div>
                {localStorage.userData ? eventLink : loginLink}
                <h1>Welcome</h1>
                {check}
            </div>
        )
    }
}
