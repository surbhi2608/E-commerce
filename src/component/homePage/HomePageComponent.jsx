import React, { Component } from 'react'
import CatalogueService from "../../service/CatalogueService";
import BookRatingService from "../../service/BookRatingService";

class HomePageComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            ratings: [],
            message: null
        }
        this.reloadBookList = this.reloadBookList.bind(this);
    }

    componentDidMount() {
        this.reloadBookList();
    }

    reloadBookList() {
        CatalogueService.fetchBookByOffer()
            .then((res) => {
                console.log('res1 : ',res);
                this.setState({books: res.data});
            })
            .catch(error => {
                console.log("Got Error : ",error);
            });
        
        BookRatingService.fetchHighRatedBook()
            .then((res) => {
                console.log('res2 : ',res);
                this.setState({ratings: res.data});
            })
            .catch(error => {
                console.log(error);
            });
        
    }

    viewBook(bId) {
        window.localStorage.setItem("bookId", bId);
        this.props.history.push('/showBook');
    }

    //addRating(bId) {
      //  console.log("In add rating!!!");
        //window.localStorage.setItem("bookId", bId);
        //this.props.history.push('/rateBook');
    //}

    showCustomers() {
        console.log("Redirecting to home : vendor logout");
        this.props.history.push('/showAllCust');
    }

    showVendors() {
        console.log("Redirecting to home : vendor logout");
        this.props.history.push('/showAllVendor');
    }

    logout() {
        console.log("Redirecting to home : vendor logout");
        window.localStorage.setItem("vendorId", undefined);

        console.log("Redirecting to home : customer logout");
        window.localStorage.setItem("customerId", undefined);

        console.log("Redirecting to home : admin logout");
        window.localStorage.setItem("adminId", undefined);

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

    vendorAccount() {
        console.log("Redirecting to edit account");
        this.props.history.push('/vendorAccountDetails');
    }

    vendorCatalogue() {
        console.log("Redirecting to vendor catalogue account");
        this.props.history.push('/showVendorCatalogue');
    }

    

    render() {
        
        let message
            if(window.localStorage.getItem("vendorId") !== 'undefined') {
                    message = <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.vendorCatalogue()}>My Catalogue</button>
                    <button className="vendorAction" onClick={() =>this.addBook()}>Add New Book</button>
                    <button className="vendorAction" onClick={() =>this.logout()}>Logout</button>
                    </div>
            } else if(window.localStorage.getItem("customerId") !== 'undefined') {
                    message = <div className="vendorAction">
                    <button className="vendorAction" onClick={() =>this.accountAction()}>My Account</button>
                    <button className="vendorAction" onClick={() =>this.showCart()}>My Cart</button>
                    <button className="vendorAction" onClick={() =>this.showOrderHistory()}>Order History</button>
                    <button className="vendorAction" onClick={() =>this.logout()}>Logout</button>
                    </div>
            } else {
                message = <div></div>
            }

            return (
  
            <div>
            <div>{message}</div>  
            <table>
            <tr>
            <div className="offers"> <img className="homeImage" src="/Books1.jpg"  alt='Books1'></img></div>
            <p className="mainHeading">"Reading is dreaming with open eyes"</p>

            <h3 className="offers" style={{backgroundColor: "white"}}>Top Offers : </h3>

            <div className="arrangeRow" >
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
                    <p className="bookAuthor">MRP : <del>{book.mrp} Rs.</del></p>
                    <p className="price">On {book.offer}% Offer</p>
                    <p className="price">{book.sellingPrice} Rs.</p>
                    <button className="btn btn-success" onClick={() => this.viewBook(book.id)}> View Details</button>
                    </div>
                    </div>

                    )
                    })
                }
                </div>
            </div>
            </tr>

            <br></br>

            <tr>
            <h3 className="offers" style={{backgroundColor: "white"}}>Top Rated : </h3>

            <div className="arrangeRow">
                <div className="row">
                {
                    this.state.ratings.map(
                    (rate) => {  
                    return(

                    <div className="gapCard">
                    <div className="card">
                    <img className="bookImage" src={`http://localhost:7070/Book/images/${rate.book.id}`} alt="BookImage"/>
                    <p className="bookName">{rate.book.bName}</p>
                    <p className="bookFormat">{rate.book.format}</p>
                    <p className="bookAuthor">By {rate.book.author}</p>
                    <p className="bookFormat">Ratings : {rate.rating}/10</p>
                    <p className="price">{rate.book.sellingPrice} Rs.</p>
                    <button className="btn btn-success" onClick={() => this.viewBook(rate.id)}> View Details</button>
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

export default HomePageComponent;
