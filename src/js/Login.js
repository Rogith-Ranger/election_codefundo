import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
const QuickEncrypt = require('quick-encrypt')
class Login extends Component {
    state = {
        otp:0,
        aadhar:0,
        account:""
    }
    handleOTP = () => {
        document.getElementById("otp").disabled = false
    }

    handleOTPChange = (e)=>{
        this.setState({otp:e.target.value})
    }

    handleAadharChange=(e)=>{
        this.setState({aadhar:e.target.value})
    }

    handleAccountChange=(e)=>{
        this.setState({account:e.target.value})
    }

    handleSubmit = () => {
        let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
        let publicKey = keys.public
        let privateKey = keys.private
        let encryptedText = QuickEncrypt.encrypt(this.state.otp+this.state.account, publicKey )
        console.log("Encrypted data: "+encryptedText)
        alert("Login Successful")
        this.props.isLoggedIn();
        // let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey)
        // console.log(decryptedText) 
    }

    render() {
        return (
            <div>
                <div class="container-fluid py-3" style={{marginLeft:"50%",marginTop:"20%"}}>
    <div class="row">
        <div class="col-md-6 mx-auto">
                <div class="card card-body">
                    <h3 class="text-center mb-4">Login</h3>
                    <fieldset>
                        <div class="form-group has-error">
                            <input class="form-control input-lg" placeholder="Account Address" name="account" type="text" onChange={this.handleAccountChange}/>
                        </div>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" placeholder="Aadhar Number" name="aadhar"  type="text" onChange={this.handleAadharChange}/>
                        </div>
                        <input class="btn btn-outline-warning" value="Send OTP" type="submit" onClick={this.handleOTP}/><br/><br/>
                        <div class="form-group has-success">
                            <input class="form-control input-lg" id = "otp" placeholder="Enter OTP" name="otp"  type="password" disabled onChange={this.handleOTPChange}/>
                        </div>
                        <input class="btn btn-lg btn-outline-primary btn-block" value="Login" type="submit" onClick={this.handleSubmit}/>
                    </fieldset>
                </div>
        </div>
    </div>
</div>

            </div>
        )
    }
}

export default Login
