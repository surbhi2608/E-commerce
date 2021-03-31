import React, { Component } from 'react';
import CatalogueService from "../../service/CatalogueService";

class showCatalogueComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            books: [],
            message: null
        }
        this.reloadBookList = this.reloadBookList.bind(this);
    }

    componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {
        CatalogueService.fetchBookUsingQty()
            .then((res) => {
                console.log("check : ", res);
                this.setState({books: res.data});
                console.log("books : ", this.state.books);
            })
            .catch(error => {
                console.log(error);
            });
    }

    viewBook(bId, bName) {
        window.localStorage.setItem("bookId", bId);
        this.props.history.push('/showBook');
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
            } else if(window.localStorage.getItem("customerId") !== 'undefined') {
                    message = <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.accountAction()}>My Account</button>
                    <button className="vendorAction" onClick={() =>this.showCart()}>My Cart</button>
                    <button className="vendorAction" onClick={() =>this.showOrderHistory()}>Order History</button>
                    <button className="vendorAction" onClick={() => this.logout()}>Logout</button>
                    </div>
            } else {
                message = <div></div>
            }


        return (
            <div>
            <table>
            <tr>
            <div>{message}</div> 
            <div className="offers"> <img className="homeImage" src="/catalogue.jpg"  alt='Books1'></img></div>
            <p className="mainHeading">"Books are a uniquely portable magic."</p>

            <div className="arrangeRow">
                <div className="row">
                {
                    this.state.books.map(
                    (book) => {  
                    return(

                    <div className="gapCard" key={book.id}>
                    <div className="card">
                    <img className="bookImage" src={`http://localhost:7070/Book/images/${book.id}`} alt="BookImage"/>
                    <p className="bookName">{book.bName}</p>
                    <p className="bookFormat">{book.format}</p>
                    <p className="bookAuthor">By {book.author}</p>
                    <p className="price">{book.sellingPrice} Rs.</p>
                    <button className="btn btn-success" onClick={() => this.viewBook(book.id, book.bName)}> View Details</button>
                    </div>
                    </div>

                    )
                    })
                }
                </div>
            </div>

             </tr>

            
            </table>
            </div>
        );
    }

}

export default showCatalogueComponent;