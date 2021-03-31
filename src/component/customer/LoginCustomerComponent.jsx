import React, { Component } from 'react'
import CustomerService from "../../service/CustomerService";

class LoginCustomerComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            email: '',
            password: '',
            message: null
        }
        this.loginNewCustomer = this.loginNewCustomer.bind(this);
    };

    loginNewCustomer = (e) => {
        e.preventDefault();
        let customer ={email: this.state.email, password: this.state.password};
        
        CustomerService.loginCustomer(customer)
           .then(res => {
               this.setState({message : 'customer logged in successfully.'});
               console.log("Check cust data : ", res.data);
               window.localStorage.setItem("customerId", res.data.data.id);
               console.log("cust id : ", res.data.data.id);
               this.createOrderId(res.data.data.id);
           })
           .catch(error => {
            console.log("Got Error : ", error);
            alert("Invalid login credentials!!!");
            });
        }

    //this is to get order Id when customer logs in  
    createOrderId(customerId) {
        let custId=window.localStorage.getItem("customerId");
        console.log("Customer id : "+ custId);

        CustomerService.getOrderId(custId)
                .then(response => {
                    console.log("check order : ", response.data);
                    window.localStorage.setItem("orderId", response.data.data.id);
                    window.localStorage.setItem("vendorId", undefined);
                    console.log("order id : ", response.data.data.id);
                    alert("You have successfully logged in!");
                    this.props.history.push('/');
                })
                .catch(error => {
                    console.log("Got Error : ", error);
                });
        }

    onChange = (e) =>
    this.setState({ [e.target.name]: e.target.value });

    addNewCustomer= (e) => {
        console.log("Redirecting");
        this.props.history.push('/newCustomer');
    }

    render() {
        return (
            <div className="login_form">
                <h2 className="text-center">Sign In</h2>
                    <form>

                        <div className="form-group">
                            <label>Email :</label>
                            <input type="text" name="email" className="form-control" value={this.state.email} required onChange={this.onChange}/>
                        </div>
    
                        <div className="form-group">
                            <label>Password:</label>
                            <input type="password" name="password" minLength="6" autoComplete="off" className="form-control" value={this.state.password} required onChange={this.onChange}/>
                        </div>
    
                        <button className="btn btn-success" onClick={this.loginNewCustomer}>Login</button>
                    </form>

                    <div className="newAccount">
                        <label>Create New Account </label>
                        <p></p>
                        <button className="btn btn-success" onClick={this.addNewCustomer}>Register</button>
                    </div> 
                </div>       
            );
        }
}


export default LoginCustomerComponent;