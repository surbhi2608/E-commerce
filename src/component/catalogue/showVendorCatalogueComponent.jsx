import React, { Component } from 'react';
import CatalogueService from "../../service/CatalogueService";

class showVendorCatalogueComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            test: '',
            books: [],
            message: null
        }
        this.reloadBookList = this.reloadBookList.bind(this);
    }

    componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {

        if(window.localStorage.getItem("vendorId") === 'undefined') {
            this.props.history.push('/loginVendor');
        }

        let vendorId = window.localStorage.getItem("vendorId");
        CatalogueService.fetchBookByVendorId(vendorId)
            .then((res) => {
                console.log("check : ", res);
                this.setState({
                    books: res.data.data,
                    test: 0
                });
                console.log('books : ', this.state.books);
            })
            .catch(error => {
                console.log("Got Error : ", error);
            });
    }

    editBook(bId) {
        window.localStorage.setItem("bookId", bId);
        this.props.history.push('/editVendorCatalogue');
    }

    addImage(bId) {
        window.localStorage.setItem("bookId", bId);
        this.props.history.push('/addBookImage');
    }

    showHistory(bId) {
        window.localStorage.setItem("bookId", bId);
        this.props.history.push('/vendorHistory');
    }

    deleteBook(bId) {
        CatalogueService.deleteBook(bId)
           .then(res => {
               this.setState({message : 'Book deleted successfully.'});
               const b=this.state.books.filter(book => book.id !== bId);
               this.setState({books:b });
               console.log("Book deleted successfully! "+bId);
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
        
        return (
            <div>
                <div>{message}</div>

                <h3 className="heading">Vendor Catalogue</h3>
                <div className="arrangeRow">
                <div className="row">
                {
                    this.state.books.map(
                    (book) => {  
                    return(

                    <div className="gapCard" key={book.id}>
                    <div className="card">
                    <p className="bookFormat">Book Id : #0100{book.id}</p>
                    <img className="bookImage" src={`http://localhost:7070/Book/images/${book.id}`} alt="BookImage"/>
                    <p className="bookName">{book.bName}</p>
                    <p className="bookFormat">{book.format}</p>
                    <p className="bookFormat">Mrp : <del>{book.mrp} Rs.</del></p>
                    <p className="price">Selling at : {book.sellingPrice} Rs.</p>
                    <p className="bookFormat">Total Added Qty : {book.quantity + book.soldBooks}</p>
                    <p className="bookFormat">Now Available Qty : {book.quantity}</p>
                    <p className="bookFormat">Total Sold Qty : {book.soldBooks}</p>
                    <p className="bookStatus">{book.status}</p>
                    <p>Uploaded - {book.uploadingDate}</p>
                    <button className="btn btn-success" onClick={() => this.editBook(book.id)}>Edit</button>
                    <p></p>
                    <button className="btn btn-success" onClick={() => this.addImage(book.id)}>Add Image</button>
                    <p></p>
                    <button className="btn btn-success" onClick={() => this.deleteBook(book.id)}>Delete</button>
                    </div>
                    </div>

                    )
                    })
                }
                </div>
                </div>
            </div>
        );
    }

}

export default showVendorCatalogueComponent;