import React, { Component } from 'react'
import CustomerService from "../../service/CustomerService";

class EditCustomerComponent extends Component {

    constructor(props){
        super(props);
        this.state ={
            id: '',
            firstName: '',
            lastName: '',
            mobileNo: '',
            password: '',
            message: null
        }
        this.saveCustomer = this.saveCustomer.bind(this);
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
                console.log("testing : ", customer);

                this.setState({
                id: customer.id,
                firstName: customer.firstName,
                lastName: customer.lastName,
                mobileNo: customer.mobileNo,
                password: customer.password
                });
                console.log("check : ", this.state.firstName);
            })
            .catch(error => {
                console.log("Got Error : ", error);
                this.props.history.push('/customerAddress');
                });
            
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveCustomer = (e) => {
        e.preventDefault();
        let customer = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, lastName: this.state.lastName, mobileNo: this.state.mobileNo};
        
        CustomerService.editCustomer(customer)
            .then(res => {
                this.setState({message : 'Customer saved successfully.'});
                alert("Account updated successfully!");
                this.props.history.push('/');
            })
            .catch(error => {
                console.log("Got Error : ", error);
                });
    }

    render() {
        return (
            <div className="login_form">
                <h2 className="text-center">Edit Account</h2>
                <form>

                    <div className="form-group">
                        <label>First Name:</label>
                        <input name="firstName" className="form-control" value={this.state.firstName} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Last Name:</label>
                        <input name="lastName" className="form-control" value={this.state.lastName} onChange={this.onChange}/>
                    </div>

                    <div className="form-group">
                        <label>Mobile No :</label>
                        <input name="mobileNo" className="form-control" value={this.state.mobileNo} onChange={this.onChange}/>
                     </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange}/>
                    </div>

                    <button className="btn btn-success" onClick={this.saveCustomer}>Save</button>
                </form>
                <p className="form-end"></p>
            </div>
        );
    }
}

export default EditCustomerComponent;