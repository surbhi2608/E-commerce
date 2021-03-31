import React, { Component } from 'react';
import VendorService from "../../service/VendorService";

class AddVendorBusinessComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            pan_No: '',
            gst_NO: '',
            companyName: '',
            message: null
        }
        this.saveVendorBusiness = this.saveVendorBusiness.bind(this);
        this.loadVendorBusiness = this.loadVendorBusiness.bind(this);
    }

    componentDidMount() {
        this.loadVendorBusiness();
    }

    loadVendorBusiness() {
        if(window.localStorage.getItem("vendorId") === 'undefined') {
            this.props.history.push('/loginVendor');
        }

        let vId =window.localStorage.getItem("vendorId");
        console.log("vendor id : ", vId);

        VendorService.fetchVendorById(vId)
            .then((res) => {
                let vendor = res.data.data;
                let business = res.data.data.businessDetails;
                console.log("testing : ", vendor);

                this.setState({
                    id: vendor.id,
                    pan_No: business.pan_No,
                    gst_NO: business.gst_NO,
                    companyName: business.companyName,
                });
                console.log("check : ", this.state.companyName);
            })
            .catch(error => {
                console.log("Got Error : ", error);
                });
    }

    saveVendorBusiness = (e) => {
        e.preventDefault();
        let vendorId = window.localStorage.getItem("vendorId");
        console.log("Check vendor id again : ", vendorId);
        let business = {id: vendorId, pan_No: this.state.pan_No, gst_NO: this.state.gst_NO, companyName: this.state.companyName};
        
        VendorService.addBusiness(business)
            .then(res => {
                this.setState({message : 'Vendor business added successfully.'});
                alert("Account created successfully!");
                this.props.history.push('/showVendorCatalogue');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value });

    render() {
        return(
            <div className="login_form">
                <h2 className="text-center">Step : 3 Add business Details</h2>
                <form>
                <div className="form-group">
                    <label>PAN No :</label>
                    <input placeholder="10 digits" name="pan_No" className="form-control" value={this.state.pan_No} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>GST No :</label>
                    <input placeholder="15 digits" name="gst_NO" className="form-control" value={this.state.gst_NO} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Company Name :</label>
                    <input name="companyName" className="form-control" value={this.state.companyName} required onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveVendorBusiness}>Next</button>
            </form>
            <p className="form-end"></p>
    </div>
        );
    }
}

export default AddVendorBusinessComponent;