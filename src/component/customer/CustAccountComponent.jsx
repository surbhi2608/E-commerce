import React, { Component } from 'react'
import CustomerService from "../../service/CustomerService";

class CustAccountComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            firstName: '',
            lastName: '',
            mobileNo: '',
            email: '',
            state:'',
            city:'',
            area:'',
            pincode:'',
            description:'',
            message: null
        }
        this.loadCustomer = this.loadCustomer.bind(this);
    }

    componentDidMount() {
        this.loadCustomer();
    }

    loadCustomer() {

        if(window.localStorage.getItem("customerId") === 'undefined') {
            this.props.history.push('/loginCustomer');
        }

        CustomerService.fetchCustomerById(window.localStorage.getItem("customerId"))
            .then((res) => {
                let customer = res.data.data;
                let address = customer.address;
                console.log("testing : ", customer);

                this.setState({
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                mobileNo: customer.mobileNo,
                email: customer.email, 
                state: address.state,
                city: address.city,
                area: address.area,
                pincode: address.pincode,
                description: address.description,
                });
                console.log("check : ", this.state.firstName);
            })
            .catch(error => {
                console.log("Got Error : ", error);
                this.props.history.push('/customerAddress');
                });
            
    }

    editAccount() {
        console.log("Redirecting to Customer catalogue account");
        this.props.history.push('/editCustomer');
    }

    editAddress() {
        console.log("Redirecting to Customer catalogue account");
        this.props.history.push('/customerAddress');
    }

    deleteAccount() {
        console.log("Redirecting to vendor catalogue account");
        CustomerService.deleteCustomer(this.state.id)
        .then(res => {
            this.setState({message : 'Customer deleted successfully.'});
            console.log("Customer deleted successfully! ");
            alert("Account deleted successfully!");
            this.props.history.push('/');
        })
        .catch(error => {
         console.log(error);
         });
    }

    logout() {
        console.log("Redirecting to home : vendor logout");
        window.localStorage.setItem("vendorId", undefined);

        console.log("Redirecting to home : customer logout");
        window.localStorage.setItem("customerId", undefined);

        this.props.history.push('/');
    }

    showOrderHistory() {
        console.log("Redirecting cust Order History");
        this.props.history.push('/custOrderHistory');
    }

    showCart() {
        console.log("Redirecting cust Order History");
        this.props.history.push('/showCart');
    }

    accountAction() {
        console.log("Redirecting cust Order History");
        this.props.history.push('/custAccountDetails');
    }

    render() {
        return (
            <div>
            <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.accountAction()}>My Account</button>
                    <button className="vendorAction" onClick={() =>this.showCart()}>My Cart</button>
                    <button className="vendorAction" onClick={() =>this.showOrderHistory()}>Order History</button>
                    <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
            </div>
                <div className="onlyBook">
                {
                    <div>
                    <div className="card">
                    <h2 className="text-center">Account Details</h2>
                    <p className="bookFormat">Name: {this.state.firstName} {this.state.lastName}</p>
                    <p className="bookFormat">Mobile no: {this.state.mobileNo}</p>
                    <p className="bookFormat">Email Id: {this.state.email}</p>
                    <h2 className="text-center">Address Details</h2>
                    <p className="bookFormat">State: {this.state.state}</p>
                    <p className="bookFormat">City: {this.state.city}</p>
                    <p className="bookFormat">Area: {this.state.area}</p>
                    <p className="bookFormat">Pincode: {this.state.pincode}</p>
                    <p className="bookFormat">Descrption: {this.state.description}</p>

                    <div className="accountActions">
                    <button className="btn btn-success" onClick={() =>this.editAccount()} >Edit Account</button>
                    <p></p>
                    <button className="btn btn-success" onClick={() =>this.editAddress()} >Edit Address</button>
                    <p></p>
                    <button className="btn btn-success" onClick={() =>this.deleteAccount()} >Delete Account</button>
                    </div>
                    </div>
                    <p></p>
                    </div>

                }
                </div>
            </div>
        );
    }

}

export default CustAccountComponent;

