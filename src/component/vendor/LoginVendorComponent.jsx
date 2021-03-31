import React, { Component } from 'react'
import VendorService from "../../service/VendorService";

class LoginVendorComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            message: null
        }
        this.loginNewVendor = this.loginNewVendor.bind(this);
    };

    loginNewVendor = (e) => {
        e.preventDefault();
        let vendor ={email: this.state.email, password: this.state.password};
        console.log("logging in : "+vendor.email);
        
        VendorService.loginVendor(vendor, {withCredentials: true})
           .then(res => {
               this.setState({message : 'Vendor logged in successfully.'});
               console.log("checking : " + res.data.data.id);
               window.localStorage.setItem("vendorId", res.data.data.id);
               alert("You have successfully logged in!");
               this.props.history.push('/showVendorCatalogue');
           })
           .catch(error => {
            console.log("Got Error : ", error);
            alert("Invalid login credentials!!!");
            });
    };

    onChange = (e) => 
    this.setState({ [e.target.name]: e.target.value });

    addNewVendor = (e) => {
        console.log("Redirecting");
        this.props.history.push('/newVendor');
    }

    render() {
        return (
            <div className="login_form">
                    <h2 className="text-center">Sign In as Vendor</h2>
                   
                    <form>
                        <div className="form-group">
                            <label>Email :</label>
                            <input type="text" name="email" className="form-control" value={this.state.email} required onChange={this.onChange}/>
                        </div>
    
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" className="form-control" minLength="6" autoComplete="off" value={this.state.password} required onChange={this.onChange}/>
                        </div>
    
                        <button className="btn btn-success" onClick={this.loginNewVendor}>Login</button>
                    </form>
                    
                    <div className="newAccount">
                        <label>Create New Account </label>
                        <p></p>
                        <button className="btn btn-success" onClick={this.addNewVendor}>Register</button>
                    </div> 
                </div>       
            );
        }
}


export default LoginVendorComponent;