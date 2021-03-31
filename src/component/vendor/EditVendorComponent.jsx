import React, { Component } from 'react';
import VendorService from "../../service/VendorService";

class EditVendorComponent extends Component {

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
        this.saveVendor = this.saveVendor.bind(this);
        this.loadVendor = this.loadVendor.bind(this);
    }

    componentDidMount() {
        this.loadVendor();
    }

    loadVendor() {

        if(window.localStorage.getItem("vendorId") === 'undefined') {
            this.props.history.push('/loginVendor');
        }

        let vId =window.localStorage.getItem("vendorId");
        console.log("vendor id : ", vId);

        VendorService.fetchVendorById(vId)
            .then((res) => {
                let vendor = res.data.data;
                console.log("testing : ", vendor);

                this.setState({
                id: vendor.id,
                firstName: vendor.firstName,
                lastName: vendor.lastName,
                mobileNo: vendor.mobileNo,
                password: vendor.password,
                });
                console.log("check : ", this.state.firstName);
            })
            .catch(error => {
                console.log("Got Error : ", error);
                });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    saveVendor = (e) => {
        e.preventDefault();
        let vendor = {id: this.state.id, password: this.state.password, firstName: this.state.firstName, 
            lastName: this.state.lastName, mobileNo: this.state.mobileNo};
    
            VendorService.editVendor(vendor)
            .then(res => {
                this.setState({message : 'Vendor saved successfully.'});
                this.props.history.push('/showVendorCatalogue');
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

                    <button className="btn btn-success" onClick={this.saveVendor}>Save</button>
                </form>
                <p className="form-end"></p>
            </div>
        );
    }
}

export default EditVendorComponent;