import React, { Component } from 'react'
import CustomerService from "../../service/CustomerService";

class AddCustomerComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            firstName: '',
            lastName: '',
            mobileNo: '',
            email: '',
            password: '',
            message: null
        }
        this.saveCustomer = this.saveCustomer.bind(this);
    }

    saveCustomer = (e) => {
        e.preventDefault();
        let customer = {firstName: this.state.firstName, lastName: this.state.lastName, mobileNo: this.state.mobileNo, email: this.state.email, password: this.state.password };
        
        CustomerService.addCustomer(customer)
            .then(res => {
                this.setState({message : 'Customer added successfully.'});
                console.log("check cust id : ", res.data.data.id);
                window.localStorage.setItem("customerId", res.data.data.id);
                this.createOrderId(res.data.data.id);
            })
            .catch(error => {
                console.log("Got Error : ", error);
                alert("Invalid login credentials!!!");
            });
        }

    //this is to get order Id when customer logs in     
    createOrderId(custId) {

        CustomerService.getOrderId(custId)
                .then(response => {
                    console.log("order : ", response.data);
                    console.log("check order id : ", response.data.data.body.data.id);
                    window.localStorage.setItem("orderId", response.data.data.body.data.id);
                    window.localStorage.setItem("vendorId", undefined);
                    this.props.history.push('/customerAddress');
                })
                .catch(error => {
                    console.log("Got Error : ", error);
                });
        }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="login_form">
                <h2 className="text-center">Sign in</h2>
                <form>
                <div className="form-group">
                    <label>First Name :</label>
                    <input placeholder="firstName" name="firstName" className="form-control" value={this.state.firstName} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Last Name :</label>
                    <input placeholder="lastName" name="lastName" className="form-control" value={this.state.lastName} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Mobile No :</label>
                    <input placeholder="mobileNo" name="mobileNo" className="form-control" value={this.state.mobileNo} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Email :</label>
                    <input placeholder="email" name="email" className="form-control" value={this.state.email} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" placeholder="password" name="password" className="form-control" minLength="6" autoComplete="off" value={this.state.password} required onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveCustomer}>Save</button>
            </form>
            <p className="form-end"></p>
    </div>
        );
    }
}

export default AddCustomerComponent;