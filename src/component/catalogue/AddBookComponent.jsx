import React, { Component } from 'react';
import CatalogueService from "../../service/CatalogueService";

class AddBookComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            bName: '',
            category: '',
            format: '',
            langPublished: '',
            manufacturer: '',
            author:'',
            status:'',
            publicationYear:'',
            mrp:'',
            offer:'',
            quantity:'',
            description:'',
            selectedFile: null,
            image: null, 
            imageContentType: null,
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
    }

    saveBook =  async (e) => {
        e.preventDefault();
        let vendorId = window.localStorage.getItem("vendorId");
        //this.onFileUpload();

        let book = {bName: this.state.bName, category: this.state.category, 
            format: this.state.format, langPublished: this.state.langPublished, 
            manufacturer: this.state.manufacturer, author: this.state.author, 
            status: this.state.status, publicationYear: this.state.publicationYear,
            mrp: this.state.mrp, offer: this.state.offer, quantity: this.state.quantity,
            description: this.state.description, vendor:{id: vendorId}};

        CatalogueService.addBook(book)
            .then(res => {
                this.setState({message : 'Book added successfully.'});
                console.log("check book id : ", res.data);
                alert("You have successfully added a new book!");
                this.props.history.push('/showVendorCatalogue');
            }).catch(error => {
                console.log("Got Error : ", error);
                this.props.history.push('/loginVendor');
            });
    }

    onChange = (e) =>
        this.setState({ [e.target.name]: e.target.value});

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
                <h2 className="text-center">Add New Book</h2>
                <form>
                <div className="form-group">
                    <label>Book name :</label>
                    <input name="bName" className="form-control" value={this.state.bName} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Category :</label>
                    <input placeholder="Fictional, Motivational etc." name="category" className="form-control" value={this.state.category} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Format :</label>
                    <input placeholder="Paperback, HardCover, etc" name="format" className="form-control" value={this.state.format} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Language Published :</label>
                    <input placeholder="English, Hindi, Marathi, etc." name="langPublished" className="form-control" value={this.state.langPublished} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Publisher :</label>
                    <input name="manufacturer" className="form-control" value={this.state.manufacturer} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Author name :</label>
                    <input name="author" className="form-control" value={this.state.author} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Publication year :</label>
                    <input name="publicationYear" className="form-control" value={this.state.publicationYear} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>MRP :</label>
                    <input type="number" placeholder="Maximum retail price" name="mrp" className="form-control" value={this.state.mrp} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Offer :</label>
                    <input type="number" placeholder="10%, 20%, etc" name="offer" className="form-control" value={this.state.offer} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Quantity :</label>
                    <input type="number" name="quantity" className="form-control" value={this.state.quantity} required onChange={this.onChange}/>
                </div>

                <div className="form-group">
                    <label>Descrpition :</label>
                    <input name="description" className="form-control" value={this.state.description} onChange={this.onChange}/>
                </div>

                <button className="btn btn-success" onClick={this.saveBook}>Save</button>
            </form>
            <p className="form-end"></p>
    </div>
    </div>
        );
    }
}

export default AddBookComponent;