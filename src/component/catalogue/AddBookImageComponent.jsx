import React, { Component } from 'react';
import CatalogueService from "../../service/CatalogueService";

class AddBookImageComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            id: '',
            selectedFile: '',
            image: null,
            message: null
        }
        this.saveBook = this.saveBook.bind(this);
    }

    componentDidMount() {
        this.checkLogin();
    }

    checkLogin() {
        if(window.localStorage.getItem("vendorId") === 'undefined') {
            this.props.history.push('/loginVendor');
        }
        this.setState({id: window.localStorage.getItem("bookId")});
    }

    saveBook =  async (e) => {
        e.preventDefault();
        let bookId = window.localStorage.getItem("bookId");
        //this.onFileUpload();

        const fd = new FormData();
        fd.append("myFile", this.state.selectedFile);

        console.log("1 formData : ", fd);
        console.log("2 selectedFile : ", this.state.selectedFile);

        CatalogueService.addImageToBook(bookId, fd)
            .then(res => {

                console.log("3. check res : ", res);
                this.setState({
                    message : 'Image added successfully.',
                    image: res.data,
                    id: window.localStorage.getItem("bookId"),
                });
                this.props.history.push('/showVendorCatalogue');
            }).catch(error => {
                console.log("Got Error : ", error);
            });
    }

    onFileChange = (event) => {
        // Update the state
        console.log("event : ", event);
        this.setState({selectedFile: event.target.files[0]});
        console.log("0 selectedFile : ", this.state.selectedFile);
      };

      logout() {
        console.log("Redirecting to home : vendor logout");
        window.localStorage.setItem("vendorId", undefined);

        console.log("Redirecting to home : customer logout");
        window.localStorage.setItem("customerId", undefined);

        this.props.history.push('/');
    }

    addBook() {
        console.log("Redirecting to add new book");
        this.props.history.push('/addNewBook');
    }

    vendorCatalogue() {
        console.log("Redirecting to edit account");
        this.props.history.push('/showVendorCatalogue');
    }

    vendorAccount() {
        console.log("Redirecting to edit account");
        this.props.history.push('/vendorAccountDetails');
    }


    render() {

        let message
        if(window.localStorage.getItem("vendorId") !== 'undefined') {
                message = <div className="vendorAction">
                <button className="vendorAction" onClick={() =>this.vendorCatalogue()}>My Catalogue</button>
                <button className="vendorAction" onClick={() =>this.addBook()}>Add New Book</button>
                <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
                </div>
        } else {
            message = <div></div>
        }

        return(
            
            <div>
            <div>{message}</div>
            <div className="login_form">
                <h2 className="text-center">Add Image</h2>
                <h2 className="text-center">Book Id : {this.state.id}</h2>
                <form>

                <div className="form-group">
                    <label>Upload Image :</label>
                    <input type="file" onChange={this.onFileChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveBook}>Save</button>
            </form>
            <p></p>
            <img className="bookImage" src={`http://localhost:7070/Book/images/${this.state.id}`} alt="bookImage"/>
            <p className="form-end"></p>
    </div>
    </div>
        );
    }
}

export default AddBookImageComponent;