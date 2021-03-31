import React, { Component } from 'react';
import BookRatingService from "../../service/BookRatingService";
import CatalogueService from "../../service/CatalogueService";

class ShowRatingComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book: '',
            ratings: [],
            bookName: '',
            message: null
        }
        this.reloadBookList = this.reloadBookList.bind(this);
    }

    componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {

        let bId = window.localStorage.getItem("bookId");

        CatalogueService.fetchBookById(bId)
            .then((res) => {
                this.setState({book: res.data.data});
                console.log("book : ", this.state.book);
            })
            .catch(error => {
                console.log("Got Error : ", error);
            });

        BookRatingService.fetchRatingByBookId(bId)
            .then((res) => {
                console.log("check rating : ", res);
                this.setState({ratings: res.data});
                console.log("ratings : ", this.state.ratings);
            })
            .catch(error => {
                console.log(error);
            });
    }

    addRating() {
        console.log("Redirecting add rating");
        this.props.history.push('/rateBook');
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
                    <button className="vendorAction" onClick={() =>this.vendorAccount()}>My Account</button>
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
            
        let hello
        if(window.localStorage.getItem("customerId") !== 'undefined') {
            hello = <button onClick={() => this.addRating()}>Add Review</button>  
        }

        return (
            <div>
            <div>{message}</div> 
            <h2 className="text-center">Book Reviews</h2>
            
            <div className="card">
                <img className="bookImage" src={`http://localhost:7070/Book/images/${this.state.book.id}`} alt="BookImage"/>
                <p className="bookName">For : {this.state.book.bName}</p>
                <p className="bookFormat">By {this.state.book.author}</p>
                <div>{hello}</div> 
            </div>
            <p></p>
            
            <div className="arrangeRow">
                <div className="row">
                {
                    this.state.ratings.map(
                    (rate) => {  
                    return(

                    <div className="gapCard">
                    <div className="card">
                    <p className="bookName">{rate.rating}/10</p>
                    <p className="bookFormat">{rate.review}</p>
                    <p className="bookAuthor"> - {rate.userName}</p>
                    <p>{rate.date}</p>
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

export default ShowRatingComponent;
