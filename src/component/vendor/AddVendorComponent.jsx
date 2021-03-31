import React, { Component } from 'react';
import VendorService from "../../service/VendorService";

class AddVendorComponent extends Component{

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
        this.saveVendor = this.saveVendor.bind(this);
    }

    saveVendor =  async (e) => {
        e.preventDefault();
        let vendor = {firstName: this.state.firstName, lastName: this.state.lastName, mobileNo: this.state.mobileNo, email: this.state.email, password: this.state.password };

        VendorService.addVendor(vendor, {withCredentials: true})
            .then(res => {
                this.setState({message : 'Vendor added successfully.'});
                console.log("check vendor id : ", res.data);
                window.localStorage.setItem("vendorId", res.data.data.id);
                window.localStorage.setItem("customerId", undefined);
                this.props.history.push('/vendorAddress');
            }).catch(error => {
                console.log("Got Error : ", error);
                alert("Invalid login credentials!!!");
                this.props.history.push('/');
                });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="login_form">
                <h2 className="text-center">Step : 1  Register Vendor</h2>

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
                    <input type="password" placeholder="password" name="password" className="form-control" autoComplete="off" minLength="6" value={this.state.password} required onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveVendor}>Next</button>
            </form>
            <p className="form-end"></p>
    </div>
        );
    }
}

export default AddVendorComponent;