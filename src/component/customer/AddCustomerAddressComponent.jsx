import React, { Component } from 'react';
import CustomerService from "../../service/CustomerService";

class AddCustomerAddressComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            state:'',
            city:'',
            area:'',
            pincode:'',
            description:'',
            message: null
        }
        this.saveCustomerAddress = this.saveCustomerAddress.bind(this);
        this.loadCustomerAddress = this.loadCustomerAddress.bind(this);
    }

    componentDidMount() {
        this.loadCustomerAddress();
    }

    loadCustomerAddress() {
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

    saveCustomerAddress = (e) => {
        e.preventDefault();
        let custId = window.localStorage.getItem("customerId");
        console.log("Check id again : ", custId);
        let address = {id: custId, state: this.state.state, city: this.state.city, area: this.state.area, pincode: this.state.pincode, description: this.state.description};
        
        CustomerService.addAddress(address)
            .then(res => {
                this.setState({message : 'Customer address added successfully.'});
                alert("Account created successfully!");
                this.props.history.push('/');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="login_form">
                <h2 className="text-center">Add Address Details</h2>
                <form>
                <div className="form-group">
                    <label>State :</label>
                    <input name="state" className="form-control" value={this.state.state} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>City :</label>
                    <input placeholder="City" name="city" className="form-control" value={this.state.city} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Area :</label>
                    <input name="area" className="form-control" value={this.state.area} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Pincode :</label>
                    <input name="pincode" className="form-control" value={this.state.pincode} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Description :</label>
                    <input name="description" className="form-control" value={this.state.description} required onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveCustomerAddress}>Next</button>
            </form>
            <p className="form-end"></p>
    </div>
        );
    }
}

export default AddCustomerAddressComponent;