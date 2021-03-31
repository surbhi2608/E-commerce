import React, { Component } from 'react';
import VendorService from "../../service/VendorService";

class AddVendorAddressComponent extends Component{

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
        this.saveVendorAddress = this.saveVendorAddress.bind(this);
        this.loadVendorAddress = this.loadVendorAddress.bind(this);
    }

    componentDidMount() {
        this.loadVendorAddress();
    }

    loadVendorAddress() {

        if(window.localStorage.getItem("vendorId") === 'undefined') {
            this.props.history.push('/loginVendor');
        }

        let vId =window.localStorage.getItem("vendorId");
        console.log("vendor id : ", vId);

        VendorService.fetchVendorById(vId)
            .then((res) => {
                let vendor = res.data.data;
                let address = res.data.data.vendorAddress;
                console.log("testing : ", vendor);

                this.setState({
                id: vendor.id,
                state: address.state,
                city: address.city,
                area: address.area,
                pincode: address.pincode,
                description: address.description,
                });
                console.log("check : ", this.state.state);
            })
            .catch(error => {
                console.log("Got Error : ", error);
                });
    }

    saveVendorAddress = (e) => {
        e.preventDefault();
        let vendorId = window.localStorage.getItem("vendorId");
        console.log("Check vendor id again : ", vendorId);
        let address = {id: vendorId, state: this.state.state, city: this.state.city, area: this.state.area, pincode: this.state.pincode, description: this.state.description};
        
        VendorService.addAddress(address)
            .then(res => {
                this.setState({message : 'Vendor address added successfully.'});
                this.props.history.push('/vendorBusiness');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="login_form">
                <h2 className="text-center">Add Address Details</h2>
                <p>Step : 2</p>
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

                <button className="btn btn-success" onClick={this.saveVendorAddress}>Next</button>
            </form>
            <p className="form-end"></p>
    </div>
        );
    }
}

export default AddVendorAddressComponent;